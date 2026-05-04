import {
  Container,
  DetailHeader,
  DetailTable,
  Flex,
  Box
} from "@jobis/design-system";

export const RecruitmentDetail = () => {
  return (
    <Container $maxWidth={960}>
      <Box height={56} />
      <Flex $direction="column" $gap={56}>
        <Flex $direction="row" $justify="space-between" $align="center">
          <DetailHeader type="recruitment" title="기업명" logoUrl="/logo.svg" />
        </Flex>
        <DetailTable
          items={[
            {
              label: "모집 분야",
              value: "펼쳐서 확인하기",
              itemType: "text",
              expandableContent: [
                {
                  label: "주요 업무",
                  value: "웹 애플리케이션 개발 및 유지보수",
                  itemType: "text"
                }
              ]
            },
            {
              label: "형태",
              value: "체험형",
              itemType: "text"
            },
            {
              label: "필수 자격증",
              value: "정보처리 기능사",
              itemType: "text"
            }
          ]}
        />
        <Box height={516} />
      </Flex>
    </Container>
  );
};
