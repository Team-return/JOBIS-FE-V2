import {
  Box,
  Container,
  Flex,
  Icon,
  Table,
  Text,
  useTheme
} from "@jobis/design-system";

export const NoticesList = () => {
  const { currentTheme: theme } = useTheme();

  const mockNotices = [
    {
      id: 12,
      title: "[중요] 오리엔테이션날 일정 안내",
      date: "2024-01-16"
    },
    {
      id: 11,
      title: "2024학년도 신입생 건강검진 안내",
      date: "2024-01-07"
    },
    {
      id: 10,
      title: "[중요] 2024학년도 신입생 합격자 발표",
      date: "2023-12-31"
    },
    {
      id: 9,
      title: "2차 전형 보호자 차량 대덕대학교 주차 안내",
      date: "2023-12-20"
    },
    {
      id: 8,
      title: "2024학년도 수시모집 원서접수 안내",
      date: "2023-12-15"
    },
    {
      id: 7,
      title: "[중요] 면접 일정 및 유의사항 안내",
      date: "2023-12-10"
    },
    { id: 6, title: "겨울방학 기숙사 운영 안내", date: "2023-12-05" },
    { id: 5, title: "2024년도 교과서 구입 안내", date: "2023-11-28" },
    {
      id: 4,
      title: "[중요] 등록금 납부 기간 안내",
      date: "2023-11-20"
    },
    { id: 3, title: "장학금 신청 안내", date: "2023-11-15" },
    { id: 2, title: "추가 모집 일정 변경 안내", date: "2023-11-01" },
    { id: 1, title: "입학 전 준비사항 안내", date: "2023-10-25" }
  ];

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
              rows={mockNotices.map(row => [
                <Text
                  key={`id-${row.id}`}
                  $size="h6"
                  $weight="regular"
                  $align="center"
                  $color={theme.color.primary[20]}
                >
                  {String(row.id)}
                </Text>,
                <Text
                  key={`title-${row.id}`}
                  $size="h6"
                  $weight="regular"
                  $align="center"
                  $color={theme.color.grayScale[90]}
                >
                  {row.title}
                </Text>,
                <Text
                  key={`date-${row.id}`}
                  $size="h6"
                  $weight="regular"
                  $align="center"
                  $color={theme.color.grayScale[90]}
                >
                  {row.date}
                </Text>
              ])}
            />
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
};
