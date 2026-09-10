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
import {
  RECRUITMENT_SORT_OPTIONS,
  RECRUITMENT_STATE_OPTIONS,
  YEAR_OPTIONS,
  useDebounce,
  useQueryParams
} from "../../utils";
import { useNavigate } from "react-router-dom";
import {
  ListSortType,
  StudentRecruitmentStatus,
  useCodeList,
  useRecruitmentList,
  useStudentRecruitmentCount
} from "@jobis/api";

export const RecruitmentList = () => {
  const { updateParams, getParam, getParamAsNumber } = useQueryParams();
  const navigate = useNavigate();

  const currentPage = getParamAsNumber("page", 1);
  const currentName = getParam("name") || "";
  const currentSort = getParam("sort-type") || "";
  const state = getParam("status") || "";
  const year = getParam("year") || "";
  const field = getParam("field") || "";
  const techStack = getParam("tech-stack") || "";

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
    name: currentName || undefined,
    years: year ? parseInt(year, 10) : undefined,
    status: (state as StudentRecruitmentStatus) || undefined,
    job_code: field ? parseInt(field, 10) : undefined,
    tech_code: techStack || undefined
  });

  const { data: RecruitmentListData, isLoading } = useRecruitmentList({
    page: currentPage,
    name: currentName || undefined,
    years: year ? parseInt(year, 10) : undefined,
    status: (state as StudentRecruitmentStatus) || undefined,
    sort_type: (currentSort as ListSortType) || undefined,
    job_code: field ? parseInt(field, 10) : undefined,
    tech_code: techStack || undefined
  });

  const recruitments = RecruitmentListData?.recruitments || [];

  useEffect(() => {
    if (debouncedKeyword === currentName) return;

    updateParams({
      name: debouncedKeyword || undefined,
      page: 1
    });
  }, [debouncedKeyword, currentName, updateParams]);

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
              options={RECRUITMENT_STATE_OPTIONS}
              $defaultValue={state}
              onChange={value =>
                updateParams({ status: value || undefined, page: 1 })
              }
            />
            <Dropdown
              $placeholder="연도"
              $width={96}
              type={undefined}
              options={YEAR_OPTIONS}
              $defaultValue={year}
              onChange={value =>
                updateParams({ year: value || undefined, page: 1 })
              }
            />
            <Dropdown
              $placeholder="분야"
              $width={96}
              type={undefined}
              options={jobOptions}
              $defaultValue={field}
              onChange={value =>
                updateParams({
                  "field": value || undefined,
                  "tech-stack": undefined,
                  "page": 1
                })
              }
            />
            <Dropdown
              $placeholder="기술스택"
              $width={120}
              options={techOptions}
              type="supportJob"
              value={techStack}
              onChange={value =>
                updateParams({ "tech-stack": value || undefined, "page": 1 })
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
            $defaultValue={currentSort}
            onChange={value =>
              updateParams({ "sort-type": value || undefined, "page": 1 })
            }
            options={RECRUITMENT_SORT_OPTIONS}
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
                bookmarked={recruitment.bookmarked}
                onClick={() =>
                  navigate(`/recruitment/detail/${recruitment.id}`)
                }
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
