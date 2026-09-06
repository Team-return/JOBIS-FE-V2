import {
  noticesKeys,
  query,
  useCreateNotice,
  useUploadFiles
} from "@jobis/api";
import {
  Box,
  Button,
  Container,
  FileDownload,
  Flex,
  Icon,
  Input,
  Text,
  TextArea,
  useTheme,
  useToast
} from "@jobis/design-system";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const FORM_WIDTH = 821;
const FIELD_WIDTH = 716;
const CONTENT_HEIGHT = 280;
const CARD_WIDTH = FORM_WIDTH + 200;
const LABEL_WIDTH = 70;

interface UploadedFile {
  id: number;
  name: string;
  url: string;
}

const SectionTitle = ({ title }: { title: string }) => {
  const { currentTheme: theme } = useTheme();

  return (
    <Flex $direction="column" $gap={12}>
      <Text $size="h5" $weight="bold" $color={theme.color.grayScale[80]}>
        {title}
      </Text>
      <Box width={FORM_WIDTH} height="1px" $bg={theme.color.grayScale[90]} />
    </Flex>
  );
};

const FieldLabel = ({
  label,
  alignTop = false
}: {
  label: string;
  alignTop?: boolean;
}) => {
  const { currentTheme: theme } = useTheme();

  return (
    <div style={{ minWidth: LABEL_WIDTH, paddingTop: alignTop ? 12 : 0 }}>
      <Text $size="body2" $weight="regular" $color={theme.color.grayScale[90]}>
        {label}
      </Text>
    </div>
  );
};

export const NoticeWrite = () => {
  const { currentTheme: theme } = useTheme();
  const navigate = useNavigate();
  const toast = useToast();

  const inputRef = useRef<HTMLInputElement>(null);
  const lastIdRef = useRef(0);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

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

  const { mutate: createNotice, isPending: isCreating } = useCreateNotice();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);

    if (selected.length > 0) {
      uploadFiles(selected);
    }

    // 같은 파일을 연속으로 선택해도 change 이벤트가 발생하도록 초기화
    event.target.value = "";
  };

  const validate = () => {
    const nextTitleError = title.trim() ? "" : "제목을 입력해주세요.";
    const nextContentError = content.trim() ? "" : "내용을 입력해주세요.";

    setTitleError(nextTitleError);
    setContentError(nextContentError);

    return !nextTitleError && !nextContentError;
  };

  const handleSubmit = () => {
    if (isCreating || !validate()) return;

    if (isUploading) {
      toast.warning("첨부파일 업로드가 끝난 뒤에 등록해주세요.");
      return;
    }

    createNotice(
      {
        title: title.trim(),
        content: content.trim(),
        attachments: files.map(file => ({ url: file.url, type: "FILE" }))
      },
      {
        onSuccess: async () => {
          toast.success("공지사항이 등록되었습니다.");
          await query.invalidate(noticesKeys.noticeList());
          navigate("/notice");
        },
        onError: () => {
          toast.error("공지사항 등록에 실패했습니다.");
        }
      }
    );
  };

  return (
    <Container $padding={[68, 0, 112]} $maxWidth={CARD_WIDTH}>
      <Flex $justify="center">
        <Box
          width={CARD_WIDTH}
          $bg={theme.color.grayScale[10]}
          $radius={8}
          $padding={[80, 100]}
        >
          <Flex $direction="column" $gap={80} $align="center">
            <Text
              $size="h2"
              $weight="bold"
              $align="center"
              $color={theme.color.grayScale[90]}
            >
              공지 사항 등록
            </Text>

            <Flex $direction="column" $gap={120}>
              <Flex $direction="column" $gap={24}>
                <SectionTitle title="공지 사항 내용" />

                <Flex $direction="column" $gap={40}>
                  <Flex $gap={49} $align="center">
                    <FieldLabel label="제목" />
                    <Input
                      $width={FIELD_WIDTH}
                      placeholder="직접입력"
                      value={title}
                      onChange={setTitle}
                      $errorMessage={titleError}
                    />
                  </Flex>

                  <Flex $gap={48} $align="flex-start">
                    <FieldLabel label="내용" alignTop />
                    <TextArea
                      $width={FIELD_WIDTH}
                      $height={CONTENT_HEIGHT}
                      placeholder="직접입력"
                      value={content}
                      onChange={setContent}
                      $errorMessage={contentError}
                    />
                  </Flex>
                </Flex>
              </Flex>

              <Flex $direction="column" $gap={24}>
                <SectionTitle title="첨부 파일" />

                <Flex $gap={42} $align="flex-start">
                  <FieldLabel label="첨부 파일" alignTop />
                  <Flex $direction="column" $gap={12}>
                    <input
                      ref={inputRef}
                      type="file"
                      multiple
                      hidden
                      aria-label="첨부 파일 추가"
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      onClick={() => !isUploading && inputRef.current?.click()}
                      style={{
                        width: FIELD_WIDTH,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 8,
                        padding: "12px 16px 12px 12px",
                        borderRadius: 8,
                        border: `1px solid ${theme.color.primary[20]}`,
                        backgroundColor: theme.color.grayScale[10],
                        cursor: isUploading ? "wait" : "pointer",
                        fontFamily: "inherit"
                      }}
                    >
                      <Text
                        $span
                        $size="body2"
                        $weight="regular"
                        $color={theme.color.primary[20]}
                      >
                        {isUploading ? "업로드 중..." : "파일 추가하기"}
                      </Text>
                      <Icon
                        icon="Plus"
                        size={24}
                        color={theme.color.primary[20]}
                      />
                    </button>

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

            <Box width={FORM_WIDTH}>
              <Flex $justify="space-between" $align="center">
                <Button
                  $variant="outline"
                  $size="md"
                  $padding={[12, 40]}
                  onClick={() => navigate("/notice")}
                >
                  취소
                </Button>
                <Button
                  $size="md"
                  $padding={[12, 40]}
                  $progressing={isCreating}
                  onClick={handleSubmit}
                >
                  등록
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};
