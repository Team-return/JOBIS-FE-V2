import {
  Box,
  Container,
  Dropdown,
  Flex,
  Grid,
  Pagination,
  RecrutementCard,
  Search,
  Skeleton,
  Spacer,
  Text
} from "@jobis/design-system";
import { useEffect, useState } from "react";
import { useDebounce, useQueryParams } from "../../utils";
import {
  ListSortType,
  StudentRecruitmentStatus,
  useCodeList,
  useRecruitmentList,
  useStudentRecruitmentCount
} from "@jobis/api";

export const RecruitmentList = () => {
  const { updateParams, getParam, getParamAsNumber } = useQueryParams();

  const currentPage = getParamAsNumber("page", 1);
  const currentName = getParam("name") || "";
  const currentSort = getParam("sort-type") || "";
  const state = getParam("status") || "";
  const year = getParam("year") || "";
  const field = getParam("field") || "";
  const techStack = getParam("techStack") || "";

  const [keyword, setKeyword] = useState<string>(currentName);
  const debouncedKeyword = useDebounce(keyword, 300);

  const { data: jobCodes } = useCodeList({ type: "JOB" });
  const { data: techCodes } = useCodeList({
    type: "TECH",
    parent_code: field ? parseInt(field, 10) : undefined
  });

  const jobOptions =
    jobCodes?.codes.map(item => ({
      label: item.keyword,
      value: item.code.toString()
    })) || [];

  const techOptions =
    techCodes?.codes.map(item => ({
      label: item.keyword,
      value: item.code.toString()
    })) || [];

  const { data: companyCountData } = useStudentRecruitmentCount({
    name: currentName,
    years: year ? parseInt(year, 10) : undefined,
    status: state as StudentRecruitmentStatus,
    job_code: field ? parseInt(field, 10) : undefined,
    tech_code: techStack || undefined
  });

  const { data: RecruitmentListData, isLoading } = useRecruitmentList({
    page: currentPage,
    name: currentName,
    years: year ? parseInt(year, 10) : undefined,
    status: state as StudentRecruitmentStatus,
    sort_type: currentSort as ListSortType,
    job_code: field ? parseInt(field, 10) : undefined,
    tech_code: techStack || undefined
  });

  const recruitments = RecruitmentListData?.recruitments || [];

  const sortType = [
    { label: "기본순", value: "" },
    { label: "매출", value: "TAKE" },
    { label: "직원 ↓", value: "WORKERS_COUNT_DESC" },
    { label: "직원 ↑", value: "WORKERS_COUNT_ASC" },
    { label: "설립일 ↓", value: "FOUNDED_AT_DESC" },
    { label: "설립일 ↑", value: "FOUNDED_AT_ASC" }
  ];

  useEffect(() => {
    if (debouncedKeyword === currentName) return;

    updateParams({
      name: debouncedKeyword || undefined,
      page: 1
    });
  }, [debouncedKeyword, currentName, updateParams]);

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

  return (
    <Container $maxWidth={960} $padding={[68, 0, 180, 0]}>
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
              type={undefined}
              options={recruitmentState}
              $defaultValue={state || ""}
              onChange={value => updateParams({ state: value || undefined })}
            />
            <Dropdown
              $placeholder="연도"
              $width={96}
              type={undefined}
              options={recruitmentyear}
              $defaultValue={year || ""}
              onChange={value => updateParams({ year: value || undefined })}
            />
            <Dropdown
              $placeholder="분야"
              $width={96}
              type={undefined}
              options={jobOptions}
              $defaultValue={field || ""}
              onChange={value => updateParams({ field: value || undefined })}
            />
            <Dropdown
              $placeholder="기술스택"
              $width={120}
              options={techOptions}
              type="supportJob"
              $defaultValue={techStack}
              onChange={value =>
                updateParams({ techStack: value || undefined, page: 1 })
              }
            />
            <Search
              placeholder="검색어를 입력해 주세요."
              $width={291}
              value={keyword}
              onChange={setKeyword}
            />
          </Flex>
        </Flex>
        <Flex $justify="flex-end">
          <Dropdown
            $width={70}
            type={undefined}
            $isNoneBorder={true}
            $defaultValue={currentSort || ""}
            onChange={value =>
              updateParams({ "sort-type": value || undefined })
            }
            options={sortType}
          />
        </Flex>
      </Flex>
      <Box $margin={[4, 0]}></Box>

      <Grid $columns="repeat(4, 1fr)" $gap={24}>
        {isLoading &&
          Array.from({ length: 12 }, (_, index) => (
            <Flex key={index} $direction="column" $gap={12} $align="flex-start">
              <Skeleton width={222} height={144} $radius={12} />
              <Skeleton width={222} height={24} $radius={12} />
              <Skeleton width={130} height={24} $radius={12} />
              <Skeleton width={150} height={24} $radius={12} />
            </Flex>
          ))}
        {!isLoading && recruitments.length === 0 ? (
          <>
            <Spacer />
            <Box $margin={[50, 76.8]}>
              <Text $size="body2">검색된 기업이 없습니다.</Text>
            </Box>
          </>
        ) : (
          recruitments.map(recruitment => {
            return (
              <RecrutementCard
                key={recruitment.id}
                companyName={recruitment.company_name}
                companyProfileUrl={recruitment.company_profile_url}
                hiringJobs={recruitment.hiring_jobs}
                militarySupport={recruitment.military_support}
                recruitmentStatus={recruitment.status}
                bookmarked={recruitment.bookmarked}
              />
            );
          })
        )}
      </Grid>
      <Flex $justify="center">
        <Pagination
          start={1}
          end={companyCountData?.total_page_count || 1}
          current={currentPage}
          onChange={page => updateParams({ page: page })}
        />
      </Flex>
    </Container>
  );
};
