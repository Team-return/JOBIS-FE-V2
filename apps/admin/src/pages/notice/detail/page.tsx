import {
  noticesKeys,
  query,
  useDeleteNotice,
  useNoticeDetail
} from "@jobis/api";
import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Modal,
  Search,
  Skeleton,
  Text,
  useTheme,
  useToast
} from "@jobis/design-system";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { LoaderData } from "apps/admin/src/utils";

const NOTICE_CARD_WIDTH = 1200;
const NOTICE_CARD_PADDING = 48;
const ICON_BUTTON_STYLE = {
  display: "flex",
  border: 0,
  background: "none",
  padding: 0,
  cursor: "pointer"
} as const;

const formatNoticeDate = (createdAt?: string) => {
  if (!createdAt) return "-";
  return createdAt.split("T")[0];
};

const getFileName = (url: string) => {
  try {
    const pathname = new URL(url).pathname;
    return decodeURIComponent(pathname).split("/").pop() || url;
  } catch {
    return url.split("?")[0].split("/").pop() || url;
  }
};

export const NoticeDetail = () => {
  const { params: noticeId } = useLoaderData() as LoaderData<number>;
  const { currentTheme: theme } = useTheme();
  const navigate = useNavigate();
  const toast = useToast();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, isError } = useNoticeDetail(noticeId);
  const { mutate: deleteNotice } = useDeleteNotice(noticeId);

  const attachments = data?.attachments ?? [];

  const handleSearch = () => {
    navigate(
      searchKeyword
        ? `/notice?title=${encodeURIComponent(searchKeyword)}`
        : "/notice"
    );
  };

  const handleDelete = () => {
    deleteNotice(undefined, {
      onSuccess: async () => {
        toast.success("공지사항이 삭제되었습니다.");
        await query.invalidate(noticesKeys.noticeList());
        setShowDeleteModal(false);
        navigate("/notice");
      },
      onError: () => {
        toast.error("공지사항 삭제에 실패했습니다.");
        setShowDeleteModal(false);
      }
    });
  };

  return (
    <Container $padding={[68, 0, 112]} $maxWidth={NOTICE_CARD_WIDTH}>
      <Flex $gap={46} $direction="column" $justify="center" $align="center">
        <Flex $direction="column" $gap={16}>
          <Text $size="h4" $weight="bold" $color={theme.color.grayScale[90]}>
            공지 사항
          </Text>

          <Flex $align="center" $justify="space-between">
            <Flex $align="center" $fit>
              <Search
                placeholder="공지사항을 검색해주세요."
                $width={359}
                value={searchKeyword}
                onChange={setSearchKeyword}
                onIconClick={handleSearch}
              />
            </Flex>
            <Flex $align="center" $fit>
              <Button
                $variant="outline"
                $size="sm"
                onClick={() => navigate("/notice/write")}
              >
                공지 추가 +
              </Button>
            </Flex>
          </Flex>
        </Flex>

        {isError ? (
          <Box width={NOTICE_CARD_WIDTH} $margin={[200, 0]}>
            <Text
              $size="h5"
              $weight="medium"
              $align="center"
              $color={theme.color.grayScale[60]}
            >
              공지사항을 불러오지 못했습니다.
            </Text>
          </Box>
        ) : (
          <Box
            width={NOTICE_CARD_WIDTH}
            $bg={theme.color.grayScale[10]}
            $radius={12}
            $padding={NOTICE_CARD_PADDING}
          >
            <Flex $direction="column" $gap={24}>
              <Flex $justify="space-between" $align="flex-start">
                {isLoading ? (
                  <Skeleton width={520} height={48} $radius={8} />
                ) : (
                  <Text
                    $size="h3"
                    $weight="bold"
                    $color={theme.color.grayScale[80]}
                  >
                    {data?.title || "-"}
                  </Text>
                )}
                <Flex $gap={12} $align="center" $fit>
                  <button
                    type="button"
                    aria-label="편집"
                    style={ICON_BUTTON_STYLE}
                    onClick={() => navigate(`/notice/detail/edit/${noticeId}`)}
                  >
                    <Icon
                      icon="Edit"
                      size={28}
                      color={theme.color.grayScale[60]}
                    />
                  </button>
                  <button
                    type="button"
                    aria-label="삭제"
                    style={ICON_BUTTON_STYLE}
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <Icon
                      icon="DeleteEmpty"
                      size={28}
                      color={theme.color.grayScale[60]}
                    />
                  </button>
                </Flex>
              </Flex>

              {isLoading ? (
                <Skeleton width={200} height={36} $radius={8} />
              ) : (
                <Text
                  $size="h5"
                  $weight="regular"
                  $color={theme.color.grayScale[90]}
                >
                  {formatNoticeDate(data?.created_at)}
                </Text>
              )}

              <Box $margin={[16, 0, 0, 0]}>
                {isLoading ? (
                  <Flex $direction="column" $gap={8}>
                    <Skeleton width="100%" height={24} $radius={8} />
                    <Skeleton width="100%" height={24} $radius={8} />
                    <Skeleton width="60%" height={24} $radius={8} />
                  </Flex>
                ) : (
                  <div style={{ whiteSpace: "pre-wrap" }}>
                    <Text
                      $size="body2"
                      $weight="regular"
                      $color={theme.color.grayScale[90]}
                    >
                      {data?.content || ""}
                    </Text>
                  </div>
                )}
              </Box>

              {attachments.length > 0 && (
                <Box $margin={[24, 0, 0, 0]}>
                  <Box
                    height="2px"
                    width="100%"
                    $bg={theme.color.primary[20]}
                  />
                  <Box $padding={[14, 16]}>
                    <Flex $gap={48} $align="flex-start">
                      <div style={{ whiteSpace: "nowrap", minWidth: 60 }}>
                        <Text
                          $size="body1"
                          $weight="regular"
                          $color={theme.color.grayScale[90]}
                        >
                          첨부파일
                        </Text>
                      </div>
                      <Flex $direction="column" $gap={4}>
                        {attachments.map((attachment, index) => (
                          <a
                            key={`${attachment.url}-${index}`}
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
                              $color={theme.color.grayScale[80]}
                            >
                              {getFileName(attachment.url)}
                            </Text>
                            <Icon
                              icon="Download"
                              size={20}
                              color={theme.color.grayScale[80]}
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
              )}
            </Flex>
          </Box>
        )}
      </Flex>

      {showDeleteModal && (
        <Modal
          title="공지 삭제"
          content="이 공지를 삭제하시겠습니까?"
          onConfirm={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </Container>
  );
};
