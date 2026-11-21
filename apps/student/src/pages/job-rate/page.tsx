import { useEmployment, useEmploymentCount } from "@jobis/api";
import { Container, Flex, Grid, Text, useTheme } from "@jobis/design-system";
import { toFileUrl } from "../../utils";

// 서버는 반을 번호로만 내려 준다
const CLASS_NAMES: Record<number, string> = {
  1: "소프트웨어 개발 1반",
  2: "소프트웨어 개발 2반",
  3: "임베디드 소프트웨어과",
  4: "인공지능 소프트웨어과"
};

const DONUT_SIZE = 140;
const DONUT_THICKNESS = 28;
const CARD_SHADOW = "0px 4px 20px rgba(112, 144, 176, 0.12)";

// 데이터가 어긋나 합격자가 전체보다 많아도 100%를 넘지 않게 한다
const toRate = (passed: number, total: number) =>
  total > 0 ? Math.min(100, Math.round((passed / total) * 100)) : 0;

const LegendItem = ({ color, label }: { color?: string; label: string }) => (
  <Flex $align="center" $gap={4} $fit>
    <span
      style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: color
      }}
    />
    <Text $span $size="caption" $weight="medium" $color={color}>
      {label}
    </Text>
  </Flex>
);

const Donut = ({ rate, label }: { rate: number; label: string }) => {
  const { currentTheme: theme } = useTheme();
  const passedColor = theme.color.subColor.blue[30];
  const restColor = theme.color.subColor.blue[20];

  return (
    <div
      role="img"
      aria-label={`취업률 ${label}`}
      style={{
        position: "relative",
        width: `${DONUT_SIZE}px`,
        height: `${DONUT_SIZE}px`,
        borderRadius: "50%",
        background: `conic-gradient(${passedColor} 0 ${rate}%, ${restColor} ${rate}% 100%)`
      }}
    >
      <Flex
        $align="center"
        $justify="center"
        style={{
          position: "absolute",
          inset: `${DONUT_THICKNESS}px`,
          width: "auto",
          borderRadius: "50%",
          background: theme.color.grayScale[10]
        }}
      >
        <Text
          $span
          $size="body1"
          $weight="bold"
          $color={theme.color.subColor.blue[40]}
        >
          {label}
        </Text>
      </Flex>
    </div>
  );
};

/** 피그마 "취업률 상세조회 페이지" — 올해 전체 취업률과 반별 취업 기업 */
export const JobRate = () => {
  const { currentTheme: theme } = useTheme();
  const year = new Date().getFullYear();

  const { data: countData, isError: isCountError } = useEmploymentCount(year);
  const { data: employmentData, isError: isEmploymentError } =
    useEmployment(year);

  // 조회에 실패하면 "-"와 빈 반 목록 대신 실패했다고 알린다
  if ((isCountError && !countData) || (isEmploymentError && !employmentData)) {
    return (
      <Container $maxWidth={960} $padding={[160, 0, 232, 0]}>
        <Flex $justify="center">
          <Text $size="h6" $color={theme.color.grayScale[70]}>
            취업률 정보를 불러오지 못했습니다.
          </Text>
        </Flex>
      </Container>
    );
  }

  const passed = countData?.passed_count ?? 0;
  const total = countData?.total_student_count ?? 0;
  const rate = toRate(passed, total);
  // 응답 전에 0%·0/0명이 잠깐 보이지 않도록 값 대신 "-"를 둔다
  const rateText = countData ? `${rate}%` : "-";
  const countText = countData ? `${passed}/${total}명` : "-";
  const classes = [...(employmentData?.classes ?? [])].sort(
    (a, b) => a.class_id - b.class_id
  );

  return (
    <div style={{ background: theme.color.grayScale[20] }}>
      <Container $maxWidth={960} $padding={[60, 0, 100, 0]}>
        <Flex $direction="column" $gap={60}>
          <Flex
            $direction="column"
            $align="center"
            style={{
              position: "relative",
              padding: "64px 0 28px",
              borderRadius: "12px",
              background: theme.color.grayScale[10]
            }}
          >
            <Flex
              $direction="column"
              $align="flex-start"
              $gap={2}
              $fit
              style={{ position: "absolute", top: "28px", right: "34px" }}
            >
              <LegendItem
                color={theme.color.subColor.blue[30]}
                label="취업완료"
              />
              <LegendItem color={theme.color.grayScale[50]} label="취업 전" />
            </Flex>
            <Donut rate={rate} label={rateText} />
            <Flex
              $align="center"
              $justify="center"
              $gap={34}
              style={{ marginTop: "40px" }}
            >
              <Flex $direction="column" $align="center" $gap={12} $fit>
                {/* 피그마처럼 "취업률"에만 형광펜 강조. Text는 문자열만 받아 span으로 나눈다 */}
                <Flex $align="center" $gap={2} $fit>
                  <Text
                    $span
                    $size="caption"
                    $color={theme.color.grayScale[80]}
                  >
                    전체
                  </Text>
                  <span
                    style={{
                      padding: "0 2px",
                      background: theme.color.subColor.yellow[20]
                    }}
                  >
                    <Text
                      $span
                      $size="caption"
                      $color={theme.color.grayScale[80]}
                    >
                      취업률
                    </Text>
                  </span>
                </Flex>
                <Text
                  $size="h6"
                  $weight="medium"
                  $color={theme.color.subColor.blue[40]}
                >
                  {rateText}
                </Text>
              </Flex>
              <span
                style={{
                  width: "1px",
                  height: "26px",
                  background: theme.color.grayScale[40]
                }}
              />
              <Flex $direction="column" $align="center" $gap={12} $fit>
                <Text $size="caption" $color={theme.color.grayScale[80]}>
                  전체 통계
                </Text>
                <Text
                  $size="h6"
                  $weight="medium"
                  $color={theme.color.subColor.blue[40]}
                >
                  {countText}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Grid $columns="repeat(2, 1fr)" $gap={[32, 40]}>
            {classes.map(classItem => (
              <Flex
                key={classItem.class_id}
                $direction="column"
                $gap={16}
                style={{ minWidth: 0 }}
              >
                <Flex $justify="space-between" $align="center">
                  <Text $size="h6" $weight="bold">
                    {CLASS_NAMES[classItem.class_id] ??
                      `${classItem.class_id}반`}
                  </Text>
                  <Text
                    $size="body3"
                    $weight="medium"
                    $color={theme.color.subColor.blue[30]}
                  >
                    {`${classItem.passed_students}/${classItem.total_students}`}
                  </Text>
                </Flex>
                <div
                  style={{
                    padding: "12px 20px 16px",
                    border: `1px solid ${theme.color.grayScale[40]}`,
                    borderRadius: "12px",
                    background: theme.color.grayScale[10]
                  }}
                >
                  {classItem.employment_rate_response_list.length === 0 ? (
                    <Flex $justify="center" style={{ padding: "24px 0" }}>
                      <Text $size="body3" $color={theme.color.grayScale[60]}>
                        아직 취업한 학생이 없어요.
                      </Text>
                    </Flex>
                  ) : (
                    <Grid $columns="repeat(4, 1fr)" $gap={[12, 12]}>
                      {classItem.employment_rate_response_list.map(company => (
                        <Flex
                          key={company.id}
                          $direction="column"
                          $align="center"
                          $gap={4}
                          style={{ minWidth: 0 }}
                        >
                          <img
                            src={toFileUrl(company.logo_url)}
                            alt={`${company.company_name} 로고`}
                            style={{
                              width: "100%",
                              height: "40px",
                              objectFit: "contain",
                              borderRadius: "6px",
                              background: theme.color.grayScale[10],
                              boxShadow: CARD_SHADOW
                            }}
                          />
                          <span
                            title={company.company_name}
                            style={{
                              maxWidth: "100%",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              color: theme.color.grayScale[60],
                              fontSize: theme.font.caption.fontSize,
                              lineHeight: theme.font.caption.lineHeight
                            }}
                          >
                            {company.company_name}
                          </span>
                        </Flex>
                      ))}
                    </Grid>
                  )}
                </div>
              </Flex>
            ))}
          </Grid>
        </Flex>
      </Container>
    </div>
  );
};
