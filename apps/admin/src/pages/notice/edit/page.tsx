import {
  noticesKeys,
  query,
  useNoticeDetail,
  useUpdateNotice
} from "@jobis/api";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Text,
  TextArea,
  useTheme,
  useToast
} from "@jobis/design-system";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { LoaderData } from "apps/admin/src/utils";

const FORM_WIDTH = 821;
const FIELD_WIDTH = 716;
const CONTENT_HEIGHT = 280;
const CARD_WIDTH = FORM_WIDTH + 200;
const LABEL_WIDTH = 56;

export const NoticeEdit = () => {
  const { params: noticeId } = useLoaderData() as LoaderData<number>;
  const { currentTheme: theme } = useTheme();
  const navigate = useNavigate();
  const toast = useToast();

  const { data, isLoading, isError } = useNoticeDetail(noticeId);
  const { mutate: updateNotice, isPending } = useUpdateNotice(noticeId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  useEffect(() => {
    if (!data) return;
    setTitle(data.title);
    setContent(data.content);
  }, [data]);

  const validate = () => {
    const nextTitleError = title.trim() ? "" : "제목을 입력해주세요.";
    const nextContentError = content.trim() ? "" : "내용을 입력해주세요.";

    setTitleError(nextTitleError);
    setContentError(nextContentError);

    return !nextTitleError && !nextContentError;
  };

  const handleSubmit = () => {
    if (isPending || !data || !validate()) return;

    updateNotice(
      { title: title.trim(), content: content.trim() },
      {
        onSuccess: async () => {
          toast.success("공지사항이 수정되었습니다.");
          await Promise.all([
            query.invalidate(noticesKeys.noticeList()),
            query.invalidate(noticesKeys.noticeDetail(noticeId))
          ]);
          navigate(`/notice/detail/${noticeId}`);
        },
        onError: () => {
          toast.error("공지사항 수정에 실패했습니다.");
        }
      }
    );
  };

  if (isError) {
    return (
      <Container $padding={[68, 0, 112]} $maxWidth={CARD_WIDTH}>
        <Flex $justify="center">
          <Box
            width={CARD_WIDTH}
            $bg={theme.color.grayScale[10]}
            $radius={8}
            $padding={[80, 100]}
          >
            <Flex $direction="column" $gap={40} $align="center">
              <Text
                $size="h5"
                $weight="medium"
                $align="center"
                $color={theme.color.grayScale[60]}
              >
                공지사항을 불러오지 못했습니다.
              </Text>
              <Button
                $variant="outline"
                $size="md"
                $padding={[12, 40]}
                onClick={() => navigate(`/notice/detail/${noticeId}`)}
              >
                돌아가기
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
    );
  }

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
              공지 사항 수정
            </Text>

            <Flex $direction="column" $gap={24}>
              <Flex $direction="column" $gap={12}>
                <Text
                  $size="h5"
                  $weight="bold"
                  $color={theme.color.grayScale[80]}
                >
                  공지 사항 내용
                </Text>
                <Box
                  width={FORM_WIDTH}
                  height="1px"
                  $bg={theme.color.grayScale[90]}
                />
              </Flex>

              <Flex $direction="column" $gap={40}>
                <Flex $gap={49} $align="center">
                  <div style={{ minWidth: LABEL_WIDTH }}>
                    <Text
                      $size="body2"
                      $weight="regular"
                      $color={theme.color.grayScale[90]}
                    >
                      제목
                    </Text>
                  </div>
                  <Input
                    $width={FIELD_WIDTH}
                    placeholder="직접입력"
                    value={title}
                    onChange={setTitle}
                    disabled={isLoading}
                    $errorMessage={titleError}
                  />
                </Flex>

                <Flex $gap={48} $align="flex-start">
                  <div style={{ minWidth: LABEL_WIDTH, paddingTop: 12 }}>
                    <Text
                      $size="body2"
                      $weight="regular"
                      $color={theme.color.grayScale[90]}
                    >
                      내용
                    </Text>
                  </div>
                  <TextArea
                    $width={FIELD_WIDTH}
                    $height={CONTENT_HEIGHT}
                    placeholder="직접입력"
                    value={content}
                    onChange={setContent}
                    disabled={isLoading}
                    $errorMessage={contentError}
                  />
                </Flex>
              </Flex>
            </Flex>

            <Box width={FORM_WIDTH} $margin={[40, 0, 0, 0]}>
              <Flex $justify="space-between" $align="center">
                <Button
                  $variant="outline"
                  $size="md"
                  $padding={[12, 40]}
                  onClick={() => navigate(`/notice/detail/${noticeId}`)}
                >
                  취소
                </Button>
                <Button
                  $size="md"
                  $padding={[12, 40]}
                  disabled={isLoading || !data}
                  $progressing={isPending}
                  onClick={handleSubmit}
                >
                  수정
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};
