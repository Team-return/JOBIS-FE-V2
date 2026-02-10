import {
  Container,
  Flex,
  Search,
  Text,
  Grid,
  CompanyCard,
  Dropdown,
  Pagination
} from "@jobis/design-system";
import { useState } from "react";

// 더미 데이터
const companyData = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  name: `기업 이름 ${index + 1}`,
  description: "여기에 기업 설명이 들어갑니다."
}));

export const CompanyList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <Container $maxWidth={960} $padding={[68, 0, 120, 0]}>
      <Flex $direction="column" $gap={32} $align="center">
        <Flex $justify="space-between">
          <Text $size="h4" $weight="bold">
            🏢 기업체
          </Text>
          <Flex $direction="column" $align="flex-end" $gap={20} $fit>
            <Search placeholder="검색어를 입력해 주세요." $width={359} />
            <Dropdown
              $width={70}
              types="supportJob"
              options={[{ label: "이름", value: "값" }]}
            />
          </Flex>
        </Flex>
        <Grid $columns="repeat(3, 1fr)" $gap={24}>
          {companyData.map(company => (
            <CompanyCard
              key={company.id}
              companyName={company.name}
              imgUrl="."
              annualSales="연매출 500억"
              bookmark={false}
            />
          ))}
        </Grid>
        <Pagination
          start={1}
          end={3}
          current={currentPage}
          onChange={setCurrentPage}
        />
      </Flex>
    </Container>
  );
};
