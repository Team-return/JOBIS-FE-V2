import { useNoticeList } from "@jobis/api";
import {
  Box,
  Container,
  Flex,
  Icon,
  Skeleton,
  Table,
  Text,
  useTheme
} from "@jobis/design-system";
import { useNavigate } from "react-router-dom";

const formatNoticeDate = (createdAt: string) => {
  if (!createdAt) return "-";
  return createdAt.split("T")[0];
};

export const NoticesList = () => {
  const navigate = useNavigate();
  const { currentTheme: theme } = useTheme();
  const { data, isPending, isError } = useNoticeList();

  const notices = data?.notices ?? [];

  const skeletonRows = Array.from({ length: 10 }).map((_, rowIndex) => [
    <Skeleton key={`sk-${rowIndex}-id`} width={30} height={28} $radius={8} />,
    <Skeleton
      key={`sk-${rowIndex}-title`}
      width={420}
      height={28}
      $radius={8}
    />,
    <Skeleton key={`sk-${rowIndex}-date`} width={108} height={28} $radius={8} />
  ]);

  const tableRows = notices.map(row => [
    <Text
      key={`id-${row.id}`}
      $size="h6"
      $weight="regular"
      $align="center"
      $color={theme.color.primary[20]}
    >
      {String(row.id)}
    </Text>,
    <div
      key={`title-${row.id}`}
      onClick={() => navigate(`/notice/detail/${row.id}`)}
      style={{
        cursor: "pointer",
        width: "100%",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Text
        $size="h6"
        $weight="regular"
        $align="center"
        $color={theme.color.grayScale[90]}
      >
        {row.title}
      </Text>
    </div>,
    <Text
      key={`date-${row.id}`}
      $size="h6"
      $weight="regular"
      $align="center"
      $color={theme.color.grayScale[90]}
    >
      {formatNoticeDate(row.created_at)}
    </Text>
  ]);

  return (
    <Container $maxWidth={960} $padding={[90, 0, 232, 0]}>
      <Flex $direction="column" $gap={48}>
        <Flex $justify="space-between" $align="flex-end">
          <Flex $direction="column" $gap={20}>
            <Text $size="h1" $weight="bold" $color={theme.color.grayScale[80]}>
              공지사항
            </Text>
            <Text
              $size="h6"
              $weight="regular"
              $color={theme.color.grayScale[80]}
            >
              자비스의 새로운 소식을 보실 수 있어요.
            </Text>
          </Flex>
          <Icon icon="LogoWordmark" width={98} height={46} />
        </Flex>

        <Flex $direction="column">
          <Box $bg={theme.color.grayScale[10]} width="100%">
            <Box height="2px" width="100%" $bg={theme.color.grayScale[60]} />
            {isError && !isPending ? (
              <Box $padding={[48, 24]}>
                <Flex $justify="center" $align="center">
                  <Text
                    $size="h6"
                    $weight="regular"
                    $color={theme.color.grayScale[70]}
                  >
                    공지 목록을 불러오지 못했습니다.
                  </Text>
                </Flex>
              </Box>
            ) : !isPending && notices.length === 0 ? (
              <Box $padding={[48, 24]}>
                <Flex $justify="center" $align="center">
                  <Text
                    $size="h6"
                    $weight="regular"
                    $color={theme.color.grayScale[70]}
                  >
                    등록된 공지사항이 없습니다.
                  </Text>
                </Flex>
              </Box>
            ) : (
              <Table
                headers={["번호", "제목", "작성일"]}
                columnWidths={[212, 537, 211]}
                headerBg={theme.color.grayScale[30]}
                headerHeight={70}
                headerTextProps={{
                  $size: "h6",
                  $weight: "regular",
                  $color: theme.color.grayScale[90]
                }}
                rowHeight={70}
                rows={isPending ? skeletonRows : tableRows}
              />
            )}
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
};
