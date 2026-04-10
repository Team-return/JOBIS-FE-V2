import {
  Container,
  DetailHeader,
  Flex,
  DetailTable
} from "@jobis/design-system";

export const CompanyDetail = () => {
  return (
    <Container $maxWidth={960}>
      <Flex $direction="column" $gap={56}>
        <Flex $direction="row" $justify="space-between" $align="center">
          <DetailHeader
            type="company"
            title="기업명"
            logoUrl="/path/to/logo.png"
            businessNumber="123-45-6789"
          />
        </Flex>
        <DetailTable
          items={[
            { label: "대표", value: "김하온", itemType: "text" },
            { label: "서비스 이름", value: "하이티비", itemType: "text" },
            { label: "회사 소개", value: "하이", itemType: "text" },
            {
              label: "회사 주소(본사)",
              value: "(60202) 서울특별시 강남구 테헤란로 142 12층 (역삼동, 캐",
              itemType: "text"
            },
            { label: "설립일", value: "2006.10.21", itemType: "text" },
            { label: "직원수", value: "10억명", itemType: "text" },
            { label: "연매출", value: "10원", itemType: "text" },
            { label: "사업분야", value: "없음", itemType: "text" },
            {
              label: "첨부파일",
              value: "2023 사업계획서",
              itemType: "file",
              fileUrl: "/path/to/file.pdf"
            }
          ]}
        />
      </Flex>
    </Container>
  );
};
