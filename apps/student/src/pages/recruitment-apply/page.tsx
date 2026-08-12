import {
  useCreateApplication,
  useRecruitmentDetail,
  useUploadFiles
} from "@jobis/api";
import {
  Box,
  Button,
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
  useRef,
  useState
} from "react";
import { useLoaderData } from "react-router-dom";
import type { LoaderData } from "../../utils";

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
  onUploaded
}: {
  label: FileFieldName;
  files: UploadedFile[];
  onUploaded: (uploaded: UploadedFile[]) => void;
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
    <Flex $direction="row" $align="center" $gap={16}>
      {isPending ? (
        <Skeleton width={48} height={48} $radius={8} />
      ) : (
        <Image
          src={data?.company_profile_url || "/logo.svg"}
          alt={companyName}
          width={48}
          height={48}
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

const APPLY_ERROR_MESSAGE: Record<number, string> = {
  400: "지원 정보가 올바르지 않습니다.",
  401: "3학년 계정만 지원할 수 있습니다.",
  403: "지원 권한이 없습니다.",
  404: "존재하지 않는 모집의뢰서입니다.",
  409: "이미 지원한 모집의뢰서입니다."
};

export const RecruitmentApply = () => {
  const { currentTheme: theme } = useTheme();
  const { params: recruitmentId } = useLoaderData() as LoaderData<number>;
  const toast = useToast();

  const [files, setFiles] = useState<Record<FileFieldName, UploadedFile[]>>({
    포트폴리오: [],
    자소서: [],
    첨부파일: []
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

  const { mutate: apply, isPending: isApplying } = useCreateApplication(
    recruitmentId,
    {
      onSuccess: () => toast.success("지원이 완료되었습니다."),
      onError: status =>
        toast.error(
          APPLY_ERROR_MESSAGE[status] ?? "지원하는 중에 오류가 발생했습니다."
        )
    }
  );

  const addFiles = (field: FileFieldName) => (uploaded: UploadedFile[]) =>
    setFiles(prev => ({ ...prev, [field]: [...prev[field], ...uploaded] }));

  const handleSubmit = () => {
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

    apply({ attachments });
  };

  return (
    <Box width={780} $padding={[56, 0, 120, 0]}>
      <Flex $direction="column" $gap={4}>
        <Surface
          $bg={theme.color.grayScale[10]}
          $radius={8}
          $padding={[48, 60, 60, 60]}
        >
          <Flex $direction="column" $gap={72}>
            <CompanyHeader recruitmentId={recruitmentId} />
            <Section title="제출서류">
              <FileField
                label="포트폴리오"
                files={files.포트폴리오}
                onUploaded={addFiles("포트폴리오")}
              />
              <FileField
                label="자소서"
                files={files.자소서}
                onUploaded={addFiles("자소서")}
              />
            </Section>
          </Flex>
        </Surface>

        <Surface
          $bg={theme.color.grayScale[10]}
          $radius={8}
          $padding={[48, 60, 40, 60]}
        >
          <Flex $direction="column" $gap={120}>
            <Section title="입력요소">
              <FileField
                label="첨부파일"
                files={files.첨부파일}
                onUploaded={addFiles("첨부파일")}
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
              disabled={isApplying}
              $progressing={isApplying}
              style={{ width: "100%" }}
            >
              지원하기
            </Button>
          </Flex>
        </Surface>
      </Flex>
    </Box>
  );
};
