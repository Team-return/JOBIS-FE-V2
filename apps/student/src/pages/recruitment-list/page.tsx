import {
  Box,
  Container,
  Dropdown,
  Flex,
  Pagination,
  RecrutementCard,
  Search,
  Text
} from "@jobis/design-system";
import { useState } from "react";

export const RecruitmentList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recruitmentState = [
    { label: "모집전", value: "모집전" },
    { label: "모집중", value: "모집중" },
    { label: "모집 종료", value: "모집 종료" }
  ];
  const recruitmentyear = [
    { label: "2026", value: "2026" },
    { label: "2025", value: "2025" },
    { label: "2024", value: "2024" }
  ];
  const sortType = [
    { label: "기본순", value: "기본순" },
    { label: "매출순", value: "매출순" },
    { label: "직원", value: "직원-desc", suffixIcon: "SortDesc" } as const,
    { label: "직원", value: "직원-asc", suffixIcon: "SortAsc" } as const,
    {
      label: "공고마감",
      value: "공고마감-desc",
      suffixIcon: "SortDesc"
    } as const,
    { label: "공고마감", value: "공고마감-asc", suffixIcon: "SortAsc" } as const
  ];

  /* 더미 데이터 */
  const jobTypeCode = [
    { label: "프론트엔드", value: "frontend" },
    { label: "백엔드", value: "backend" },
    { label: "디자이너", value: "designer" }
  ];
  const keywordCode = [
    { label: "SpringBoot", value: "SpringBoot" },
    { label: "SpringSecurity", value: "SpringSecurity" },
    { label: "SpringBatch", value: "SpringBatch" },
    { label: "SpringDataJpa", value: "SpringDataJpa" }
  ];

  const companyData = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    name: `기업 이름 ${index + 1}`,
    description: "여기에 기업 설명이 들어갑니다.",
    hiringJobs: "프론트엔드 엔지니어",
    militarySupport: true,
    recruitmentState: "모집중" as const,
    bookmarked: false
  }));

  const companyGrid = [];
  for (let i = 0; i < companyData.length; i += 4) {
    companyGrid.push(companyData.slice(i, i + 4));
  }

  return (
    <Container $padding={[68, 0, 180, 0]}>
      <Flex $direction="column" $gap={20}>
        <Flex $justify="space-between">
          <Flex>
            <Text $size="h4" $weight="bold" $align="justify">
              📄 모집의뢰서
            </Text>
          </Flex>
          <Flex $justify="flex-end" $gap={8}>
            <Dropdown
              $placeholder="상태"
              $width={96}
              types={undefined}
              options={recruitmentState}
            />
            <Dropdown
              $placeholder="연도"
              $width={96}
              types={undefined}
              options={recruitmentyear}
            />
            <Dropdown
              $placeholder="분야"
              $width={96}
              types={undefined}
              options={jobTypeCode}
            />
            <Dropdown
              $placeholder="기술스택"
              $width={120}
              types="supportJob"
              options={keywordCode}
            />
            <Search placeholder="검색어를 입력해 주세요." $width={291} />
          </Flex>
        </Flex>
        <Flex $justify="flex-end">
          <Dropdown
            $width={70}
            types={undefined}
            $isNoneBorder={true}
            $defaultValue="기본순"
            options={sortType}
          />
        </Flex>
      </Flex>

      <Box $padding={[12, 0, 72, 0]}>
        <Flex $direction="column" $gap={32}>
          {companyGrid.map((companyRow, index) => {
            return (
              <Flex $gap={24} key={index}>
                {companyRow.map(company => {
                  return (
                    <RecrutementCard
                      key={company.id}
                      companyName={company.name}
                      companyProfileUrl="."
                      hiringJobs={company.hiringJobs}
                      militarySupport={company.militarySupport}
                      recruitmentStatus={company.recruitmentState}
                      bookmarked={company.bookmarked}
                    />
                  );
                })}
              </Flex>
            );
          })}
        </Flex>
      </Box>
      <Flex $justify="center">
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
