import { useNoticeDetail } from "@jobis/api";
import {
  Box,
  Container,
  Flex,
  Icon,
  Text,
  useTheme
} from "@jobis/design-system";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../utils";

const formatDate = (createdAt: string) => {
  if (!createdAt) return "-";
  return createdAt.split("T")[0];
};

const getFileName = (url: string) => {
  try {
    const pathname = new URL(url).pathname;
    const decodedPath = decodeURIComponent(pathname);
    // 경로가 없는 URL이면 빈 문자열이 나오므로 || 로 원본을 남깁니다
    return decodedPath.split("/").pop() || url;
  } catch {
    return url.split("?")[0].split("/").pop() || url;
  }
};

export const NoticeDetail = () => {
  const { params: noticeId } = useLoaderData() as LoaderData<number>;
  const { currentTheme: theme } = useTheme();

  const { data, isLoading, isError } = useNoticeDetail(noticeId);

  if (isError) {
    return (
      <div style={{ minWidth: 960 }}>
        <Container $maxWidth={960} $padding={[90, 0, 232, 0]}>
          <Text $size="h6" $weight="regular" $color={theme.color.grayScale[60]}>
            공지사항을 불러오지 못했습니다.
          </Text>
        </Container>
      </div>
    );
  }

  const hasAttachments =
    !isLoading && data?.attachments && data.attachments.length > 0;

  return (
    <div style={{ minWidth: 960 }}>
      <Container $maxWidth={960} $padding={[90, 0, 232, 0]}>
        <Flex $direction="column" $gap={48}>
          <Flex $justify="space-between" $align="flex-end">
            <Text $size="h1" $weight="bold" $color={theme.color.grayScale[80]}>
              공지사항
            </Text>
          </Flex>

          <Flex
            $direction="column"
            style={{
              minHeight: 480,
              backgroundColor: theme.color.grayScale[10],
              borderRadius: 12
            }}
          >
            <Box $padding={[48, 48]}>
              <Flex $direction="column" $gap={16}>
                <Text
                  $size="h3"
                  $weight="bold"
                  $color={theme.color.grayScale[90]}
                >
                  {isLoading ? "불러오는 중..." : (data?.title ?? "-")}
                </Text>
                <Text
                  $size="h5"
                  $weight="regular"
                  $color={theme.color.grayScale[60]}
                >
                  {isLoading ? "" : formatDate(data?.created_at ?? "")}
                </Text>
              </Flex>
            </Box>

            <Box $padding={[0, 48, 0, 48]}>
              <div style={{ whiteSpace: "pre-wrap" }}>
                <Text
                  $size="body2"
                  $weight="regular"
                  $color={theme.color.grayScale[90]}
                >
                  {isLoading ? "" : (data?.content ?? "")}
                </Text>
              </div>
            </Box>

            {hasAttachments && (
              <>
                <Box $padding={[32, 48]}>
                  <Box
                    height="2px"
                    width="100%"
                    $bg={theme.color.primary[20]}
                  />
                  <Box $padding={16}>
                    <Flex $gap={48} $align="flex-start">
                      <div style={{ whiteSpace: "nowrap", minWidth: 60 }}>
                        <Text
                          $size="body1"
                          $weight="regular"
                          $color={theme.color.grayScale[70]}
                        >
                          첨부파일
                        </Text>
                      </div>
                      <Flex $direction="column" $gap={12}>
                        {data?.attachments.map((attachment, index) => (
                          <a
                            key={index}
                            href={attachment.url}
                            download
                            style={{
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              alignSelf: "flex-start",
                              gap: 8
                            }}
                          >
                            <Text
                              $size="body1"
                              $weight="regular"
                              $color={theme.color.primary[20]}
                            >
                              {getFileName(attachment.url)}
                            </Text>
                            <Icon
                              icon="Download"
                              size={20}
                              color={theme.color.primary[20]}
                            />
                          </a>
                        ))}
                      </Flex>
                    </Flex>
                  </Box>
                  <Box
                    height="1px"
                    width="100%"
                    $bg={theme.color.primary[20]}
                  />
                </Box>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </div>
  );
};
