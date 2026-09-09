import { useCreateBugReport, useUploadFiles } from "@jobis/api";
import {
  Box,
  Button,
  Dropdown,
  FileDownload,
  FileUpload,
  Flex,
  Input,
  Text,
  TextArea,
  useTheme,
  useToast
} from "@jobis/design-system";
import { useRef, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { BUG_REPORT_AREA_OPTIONS } from "../../utils/constants";

const CARD_WIDTH = 780;
const FIELD_WIDTH = 562;
const LABEL_WIDTH = 77;

interface UploadedFile {
  id: number;
  name: string;
  url: string;
}

const FieldRow = ({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) => {
  const { currentTheme: theme } = useTheme();

  return (
    <Flex $gap={24} $align="center" style={{ width: "100%" }}>
      <Box width={LABEL_WIDTH}>
        <Text
          $size="body3"
          $weight="regular"
          $color={theme.color.grayScale[90]}
        >
          {label}
        </Text>
      </Box>
      {children}
    </Flex>
  );
};

export const BugReport = () => {
  const { currentTheme: theme } = useTheme();
  const navigate = useNavigate();
  const toast = useToast();

  const inputRef = useRef<HTMLInputElement>(null);
  const lastIdRef = useRef(0);

  const [area, setArea] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const { mutate: uploadFiles, isPending: isUploading } = useUploadFiles(
    "EXTENSION_FILE",
    {
      onSuccess: (urls, selected) => {
        setFiles(prev => [
          ...prev,
          ...urls.map((url, index) => {
            lastIdRef.current += 1;

            return {
              id: lastIdRef.current,
              name: selected[index]?.name || url.split("/").pop() || url,
              url
            };
          })
        ]);
      },
      onError: status =>
        toast.error(
          status === 400
            ? "지원하지 않는 파일 형식입니다."
            : "첨부파일 업로드에 실패했습니다."
        )
    }
  );

  const { mutate: createBugReport, isPending: isReporting } =
    useCreateBugReport();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);

    if (selected.length > 0) {
      uploadFiles(selected);
    }

    // 같은 파일을 연속으로 선택해도 change 이벤트가 발생하도록 초기화
    event.target.value = "";
  };

  const handleSubmit = () => {
    if (isReporting) return;

    if (!area) {
      toast.error("발생 위치를 선택해주세요.");
      return;
    }
    if (!title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      toast.error("제보내용을 입력해주세요.");
      return;
    }
    if (isUploading) {
      toast.warning("첨부파일 업로드가 끝난 뒤에 제보해주세요.");
      return;
    }

    createBugReport(
      {
        title: title.trim(),
        content: content.trim(),
        development_area: area as "SERVER" | "WEB" | "IOS" | "ANDROID",
        attachment_urls: files.map(file => file.url)
      },
      {
        onSuccess: () => {
          toast.success("버그가 제보되었습니다.");
          navigate("/mypage", { replace: true });
        },
        onError: () => toast.error("버그 제보에 실패했습니다.")
      }
    );
  };

  return (
    <Flex
      $justify="center"
      style={{
        padding: "56px 0 126px",
        backgroundColor: theme.color.grayScale[20]
      }}
    >
      <Box
        width={CARD_WIDTH}
        $bg={theme.color.grayScale[10]}
        $radius={8}
        $padding={[36, 59]}
      >
        <Flex $direction="column" $gap={118} $align="center">
          <Flex $direction="column" $gap={52} style={{ width: "100%" }}>
            <Flex $direction="column" $gap={16} $align="center">
              <Text
                $size="h4"
                $weight="bold"
                $align="center"
                $color={theme.color.grayScale[90]}
              >
                버그 제보하기
              </Text>
              <Text $size="h6" $color={theme.color.grayScale[80]}>
                자비스를 이용하며 생긴 버그를 제보해주세요
              </Text>
            </Flex>

            <Flex $direction="column" $gap={52} style={{ width: "100%" }}>
              <FieldRow label="발생 위치">
                <Dropdown
                  $placeholder="분야"
                  $width={96}
                  type={undefined}
                  options={BUG_REPORT_AREA_OPTIONS}
                  $defaultValue={area}
                  onChange={setArea}
                />
              </FieldRow>

              <FieldRow label="제목">
                <Input
                  $variant="underline"
                  $width={FIELD_WIDTH}
                  placeholder="제목 입력"
                  value={title}
                  onChange={setTitle}
                />
              </FieldRow>

              <FieldRow label="제보내용">
                <TextArea
                  $variant="underline"
                  $width={FIELD_WIDTH}
                  $height={52}
                  rows={1}
                  placeholder="제보할 버그에 대해 알려주세요!"
                  value={content}
                  onChange={setContent}
                />
              </FieldRow>

              <Flex $gap={24} $align="flex-start" style={{ width: "100%" }}>
                <Box width={LABEL_WIDTH}>
                  <Text
                    $size="body3"
                    $weight="regular"
                    $color={theme.color.grayScale[90]}
                  >
                    첨부파일
                  </Text>
                </Box>
                <Flex $direction="column" $gap={16} style={{ width: "100%" }}>
                  <input
                    ref={inputRef}
                    type="file"
                    multiple
                    hidden
                    aria-label="첨부파일 추가"
                    onChange={handleFileChange}
                  />
                  <FileUpload
                    $iconName="Upload"
                    label={isUploading ? "업로드 중..." : "파일 첨부하기"}
                    $width={149}
                    disabled={isUploading}
                    onClick={() => inputRef.current?.click()}
                  />

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
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Button
            $variant="contained"
            $size="md"
            onClick={handleSubmit}
            disabled={isUploading || isReporting}
            $progressing={isReporting}
            style={{ width: "100%" }}
          >
            제보하기
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
