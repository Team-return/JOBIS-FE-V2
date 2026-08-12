import { useRecruitmentDetail } from "@jobis/api";
import {
  Box,
  FileDownload,
  Flex,
  IconButton,
  Image,
  Input,
  Skeleton,
  Surface,
  Text,
  useTheme
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

interface AttachedFile {
  id: number;
  name: string;
  url: string;
}

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

const FileField = ({ label }: { label: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlsRef = useRef<string[]>([]);
  const lastIdRef = useRef(0);
  const [files, setFiles] = useState<AttachedFile[]>([]);

  useEffect(
    () => () => {
      objectUrlsRef.current.forEach(URL.revokeObjectURL);
      objectUrlsRef.current = [];
    },
    []
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);

    const attached = selected.map(file => {
      const url = URL.createObjectURL(file);
      objectUrlsRef.current.push(url);
      lastIdRef.current += 1;

      return { id: lastIdRef.current, name: file.name, url };
    });

    if (attached.length > 0) {
      setFiles(prev => [...prev, ...attached]);
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
      <IconButton icon="Upload" onClick={() => inputRef.current?.click()}>
        파일 첨부하기
      </IconButton>
      {files.length > 0 && (
        <Flex $direction="row" $gap={8} $wrap>
          {files.map(file => (
            <FileDownload key={file.id} label={file.name} fileUrl={file.url} />
          ))}
        </Flex>
      )}
    </FieldRow>
  );
};

const CompanyHeader = () => {
  const { currentTheme: theme } = useTheme();
  const { params: recruitmentId } = useLoaderData() as LoaderData<number>;
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

export const RecruitmentApply = () => {
  const { currentTheme: theme } = useTheme();
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

  return (
    <Box width={780} $padding={[56, 0, 120, 0]}>
      <Flex $direction="column" $gap={4}>
        <Surface
          $bg={theme.color.grayScale[10]}
          $radius={8}
          $padding={[48, 60, 60, 60]}
        >
          <Flex $direction="column" $gap={72}>
            <CompanyHeader />
            <Section title="제출서류">
              <FileField label="포트폴리오" />
              <FileField label="자소서" />
            </Section>
          </Flex>
        </Surface>

        <Surface
          $bg={theme.color.grayScale[10]}
          $radius={8}
          $padding={[48, 60, 212, 60]}
        >
          <Section title="입력요소">
            <FileField label="첨부파일" />
            <FieldRow label="링크" $gap={8}>
              <Input
                value={link}
                onChange={setLink}
                placeholder="링크를 입력해주세요"
              />
              <Input value={extraLink} onChange={setExtraLink} placeholder="" />
            </FieldRow>
          </Section>
        </Surface>
      </Flex>
    </Box>
  );
};
