import {
  query,
  recruitmentsKeys,
  useCreateApplication,
  useReapply,
  useRecruitmentDetail,
  useStudentApplications,
  useUploadFiles
} from "@jobis/api";
import {
  Box,
  Button,
  Container,
  FileDownload,
  Flex,
  IconButton,
  Image,
  Input,
  Skeleton,
  Surface,
  Text,
  useTheme,
  useToast
} from "@jobis/design-system";
import {
  type ChangeEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toFileUrl, useQueryParams, type LoaderData } from "../../utils";
import { getUnapplicableMessage } from "../recruitment-detail/constants";

interface UploadedFile {
  id: number;
  name: string;
  url: string;
}

type FileFieldName = "포트폴리오" | "자소서" | "첨부파일";

const Section = ({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) => {
  const { currentTheme: theme } = useTheme();

  return (
    <Flex $direction="column" $gap={24}>
      <Flex $direction="column" $gap={18}>
        <Text $size="body1" $weight="bold" $color={theme.color.grayScale[90]}>
          {title}
        </Text>
        <Box width="100%" height="1px" $bg={theme.color.grayScale[50]} />
      </Flex>
      <Flex $direction="column" $gap={60}>
        {children}
      </Flex>
    </Flex>
  );
};

const FieldRow = ({
  label,
  $gap = 16,
  children
}: {
  label: string;
  $gap?: number;
  children: ReactNode;
}) => {
  const { currentTheme: theme } = useTheme();

  return (
    <Flex $direction="row" $align="flex-start" $gap={24}>
      <Box width={64} $padding={[10, 0, 0, 0]}>
        <Text
          $size="body3"
          $weight="regular"
          $color={theme.color.grayScale[90]}
        >
          {label}
        </Text>
      </Box>
      <Flex $direction="column" $gap={$gap} style={{ flex: 1, minWidth: 0 }}>
        {children}
      </Flex>
    </Flex>
  );
};

const FileField = ({
  label,
  files,
  onUploaded,
  onUploadingChange
}: {
  label: FileFieldName;
  files: UploadedFile[];
  onUploaded: (uploaded: UploadedFile[]) => void;
  onUploadingChange: (isUploading: boolean) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastIdRef = useRef(0);
  const toast = useToast();

  const { mutate: uploadFiles, isPending } = useUploadFiles("EXTENSION_FILE", {
    onSuccess: (urls, selected) => {
      onUploaded(
        urls.map((url, index) => {
          lastIdRef.current += 1;

          return {
            id: lastIdRef.current,
            name: selected[index]?.name ?? url.split("/").pop() ?? url,
            url
          };
        })
      );
    },
    onError: status =>
      toast.error(
        status === 400
          ? "지원하지 않는 파일 형식입니다."
          : `${label} 업로드에 실패했습니다.`
      )
  });

  // 업로드 진행 상태를 부모로 올려 업로드 중에는 지원서를 제출하지 못하게 한다
  useEffect(() => {
    onUploadingChange(isPending);
  }, [isPending, onUploadingChange]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);

    if (selected.length > 0) {
      uploadFiles(selected);
    }

    // 같은 파일을 연속으로 선택해도 change 이벤트가 발생하도록 초기화
    event.target.value = "";
  };

  return (
    <FieldRow label={label}>
      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        aria-label={`${label} 파일 첨부`}
        onChange={handleChange}
      />
      <IconButton
        icon="Upload"
        onClick={() => !isPending && inputRef.current?.click()}
      >
        {isPending ? "업로드 중..." : "파일 첨부하기"}
      </IconButton>
      {files.length > 0 && (
        <Flex $direction="row" $gap={8} $wrap>
          {files.map(file => (
            <FileDownload
              key={file.id}
              label={file.name}
              fileUrl={`${import.meta.env.FILE_URL}/${file.url}`}
            />
          ))}
        </Flex>
      )}
    </FieldRow>
  );
};

const CompanyHeader = ({ recruitmentId }: { recruitmentId: number }) => {
  const { currentTheme: theme } = useTheme();
  const { data, isPending } = useRecruitmentDetail(recruitmentId);

  const companyName = data?.company_name ?? "-";

  return (
    <Flex $direction="row" $align="center" $gap={21}>
      {isPending ? (
        <Skeleton width={44} height={44} $radius={8} />
      ) : (
        <Image
          src={
            data?.company_profile_url
              ? toFileUrl(data.company_profile_url)
              : "/logo.svg"
          }
          alt={companyName}
          width={44}
          height={44}
          $fit="contain"
        />
      )}
      {isPending ? (
        <Skeleton width={220} height={36} $radius={8} />
      ) : (
        <Text $size="h5" $weight="bold" $color={theme.color.grayScale[90]}>
          {companyName}
        </Text>
      )}
    </Flex>
  );
};

// 서버가 원인이 여러 개인 오류를 같은 코드·메시지로 보내서 원인을 모두 아우르는 문구로 안내한다
const APPLY_ERROR_MESSAGE: Record<number, string> = {
  400: "모집 중이 아니거나 지원 정보가 올바르지 않습니다.",
  401: "지원할 수 있는 학년이 아닙니다.",
  403: "지원 권한이 없습니다.",
  404: "존재하지 않는 모집의뢰서입니다.",
  409: "이미 지원했거나 진행 중인 다른 지원이 있습니다."
};

const REAPPLY_ERROR_MESSAGE: Record<number, string> = {
  400: "재지원할 수 없는 상태이거나 지원 정보가 올바르지 않습니다.",
  403: "재지원 권한이 없습니다.",
  404: "지원 내역을 찾을 수 없습니다."
};

// 서버가 재지원을 받아 주는 지원 상태
const REAPPLICABLE_STATUSES = ["REQUESTED", "REJECTED"];

export const RecruitmentApply = () => {
  const { currentTheme: theme } = useTheme();
  const { params: recruitmentId } = useLoaderData() as LoaderData<number>;
  const toast = useToast();
  const navigate = useNavigate();
  const { getParam } = useQueryParams();

  // 마이페이지 재지원은 같은 지원 폼을 쓰고 지원서 id를 쿼리로 넘긴다
  const reapplyId = Number(getParam("application-id"));
  const isReapply = Number.isInteger(reapplyId) && reapplyId > 0;

  const { data: detail } = useRecruitmentDetail(recruitmentId);
  const { data: applicationList, isSuccess: isApplicationsLoaded } =
    useStudentApplications(undefined, { enabled: isReapply });
  const reapplyTarget = applicationList?.applications.find(
    application =>
      application.application_id === reapplyId &&
      application.recruitment_id === recruitmentId
  );

  const getBlockedReason = () => {
    if (isReapply) {
      const canReapply =
        !isApplicationsLoaded ||
        (reapplyTarget &&
          REAPPLICABLE_STATUSES.includes(reapplyTarget.application_status));

      return canReapply ? undefined : "재지원할 수 없는 지원서입니다";
    }

    return detail && !detail.is_applicable
      ? getUnapplicableMessage(detail.unapplicable_reason)
      : undefined;
  };

  // 주소로 바로 들어와도 지원할 수 없는 공고는 제출 전에 막는다
  const blockedReason = getBlockedReason();

  const [files, setFiles] = useState<Record<FileFieldName, UploadedFile[]>>({
    포트폴리오: [],
    자소서: [],
    첨부파일: []
  });
  const [uploading, setUploading] = useState<Record<FileFieldName, boolean>>({
    포트폴리오: false,
    자소서: false,
    첨부파일: false
  });
  const [link, setLink] = useState("");
  const [extraLink, setExtraLink] = useState("");

  const pageBg = theme.color.grayScale[20];

  useEffect(() => {
    const { body } = document;
    const previousBg = body.style.backgroundColor;

    body.style.backgroundColor = pageBg ?? "";

    return () => {
      body.style.backgroundColor = previousBg;
    };
  }, [pageBg]);

  const { mutate: apply, isPending: isCreating } = useCreateApplication(
    recruitmentId,
    {
      onSuccess: async () => {
        // 상세의 지원하기 버튼이 바로 막히도록 지원 가능 여부를 다시 받는다
        await query.invalidate(
          recruitmentsKeys.recruitmentDetail(recruitmentId)
        );
        toast.success("지원이 완료되었습니다.");
        navigate(`/recruitment/detail/${recruitmentId}`, { replace: true });
      },
      onError: status =>
        toast.error(
          APPLY_ERROR_MESSAGE[status] ?? "지원하는 중에 오류가 발생했습니다."
        )
    }
  );

  const { mutate: reapply, isPending: isReapplying } = useReapply(reapplyId, {
    onSuccess: () => {
      toast.success("재지원이 완료되었습니다.");
      navigate("/mypage", { replace: true });
    },
    onError: status =>
      toast.error(
        REAPPLY_ERROR_MESSAGE[status] ?? "재지원하는 중에 오류가 발생했습니다."
      )
  });

  const isApplying = isCreating || isReapplying;

  const addFiles = (field: FileFieldName) => (uploaded: UploadedFile[]) =>
    setFiles(prev => ({ ...prev, [field]: [...prev[field], ...uploaded] }));

  // FileField의 useEffect 의존성이므로 렌더마다 새 함수가 되지 않게 고정한다
  const setFieldUploading = useMemo(() => {
    const make = (field: FileFieldName) => (isUploading: boolean) =>
      setUploading(prev =>
        prev[field] === isUploading ? prev : { ...prev, [field]: isUploading }
      );

    return {
      포트폴리오: make("포트폴리오"),
      자소서: make("자소서"),
      첨부파일: make("첨부파일")
    };
  }, []);

  const isUploading = Object.values(uploading).some(Boolean);

  const handleSubmit = () => {
    // 업로드가 끝나기 전에 제출하면 진행 중인 파일이 지원서에서 빠진다
    if (isUploading) {
      toast.error("파일 업로드가 끝난 뒤 지원해주세요.");
      return;
    }

    const attachments = [
      ...Object.values(files)
        .flat()
        .map(file => ({ url: file.url, type: "FILE" as const })),
      ...[link, extraLink]
        .map(value => value.trim())
        .filter(Boolean)
        .map(url => ({ url, type: "URL" as const }))
    ];

    if (attachments.length === 0) {
      toast.error("첨부파일이나 링크를 하나 이상 등록해주세요.");
      return;
    }

    if (isReapply) {
      reapply({ attachments });
    } else {
      apply({ attachments });
    }
  };

  return (
    <Container $maxWidth={780} $padding={[56, 0, 120, 0]}>
      <Flex $direction="column" $gap={4}>
        <Surface
          $bg={theme.color.grayScale[10]}
          $radius={[8, 8, 0, 0]}
          $padding={[48, 60, 60, 60]}
        >
          <Flex $direction="column" $gap={80}>
            <CompanyHeader recruitmentId={recruitmentId} />
            <Section title="제출서류">
              <FileField
                label="포트폴리오"
                files={files.포트폴리오}
                onUploaded={addFiles("포트폴리오")}
                onUploadingChange={setFieldUploading.포트폴리오}
              />
              <FileField
                label="자소서"
                files={files.자소서}
                onUploaded={addFiles("자소서")}
                onUploadingChange={setFieldUploading.자소서}
              />
            </Section>
          </Flex>
        </Surface>

        <Surface
          $bg={theme.color.grayScale[10]}
          $radius={[0, 0, 8, 8]}
          $padding={[48, 60, 32, 60]}
        >
          <Flex $direction="column" $gap={132}>
            <Section title="입력요소">
              <FileField
                label="첨부파일"
                files={files.첨부파일}
                onUploaded={addFiles("첨부파일")}
                onUploadingChange={setFieldUploading.첨부파일}
              />
              <FieldRow label="링크" $gap={8}>
                <Input
                  value={link}
                  onChange={setLink}
                  placeholder="링크를 입력해주세요"
                />
                <Input
                  value={extraLink}
                  onChange={setExtraLink}
                  placeholder="링크를 입력해주세요"
                />
              </FieldRow>
            </Section>
            <Button
              $variant="contained"
              $size="md"
              onClick={handleSubmit}
              disabled={isUploading || isApplying || !!blockedReason}
              $progressing={isApplying}
              style={{ width: "100%" }}
            >
              {blockedReason ?? (isReapply ? "재지원하기" : "지원하기")}
            </Button>
          </Flex>
        </Surface>
      </Flex>
    </Container>
  );
};
