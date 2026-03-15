import {
  Container,
  Flex,
  Search,
  Text,
  Grid,
  CompanyCard,
  Dropdown,
  Pagination,
  Spacer,
  Box,
  Skeleton
} from "@jobis/design-system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryParams, useDebounce } from "../../utils";
import {
  useCompanyStudentList,
  useCompanyStudentCount,
  type ListSortType
} from "@jobis/api";
import type { LoaderData } from "../../utils";
import type { CompanyQuery } from "./loader";

// 스켈레톤
const CompanyCardSkeleton = () => {
  return (
    <Flex $direction="column" $gap={10} $align="flex-start">
      <Skeleton width={304} height={168} $radius={12} />
      <Skeleton width={304} height={28} $radius={12} />
      <Skeleton width={100} height={20} $radius={12} />
    </Flex>
  );
};

export const CompanyList = () => {
  const { params: initialParams } = useLoaderData() as LoaderData<CompanyQuery>;
  const { updateParams, getParam, getParamAsNumber } = useQueryParams();
  const navigate = useNavigate();

  const currentPage = getParamAsNumber("page", initialParams.page);
  const currentName = getParam("name") ?? initialParams.name ?? "";
  const currentSort = (getParam("sort-type") ??
    initialParams.sortType ??
    "") as ListSortType | "";

  const [keyword, setKeyword] = useState<string>(currentName);
  const debouncedKeyword = useDebounce(keyword, 300);

  const { data: companyCountData } = useCompanyStudentCount({
    name: currentName
  });
  const { data: companyListData, isLoading } = useCompanyStudentList({
    page: currentPage,
    name: currentName,
    sort_type: currentSort as ListSortType
  });

  const companies = companyListData?.companies || [];

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

  return (
    <Container $maxWidth={960} $padding={[68, 0, 192, 0]}>
      <Flex $direction="column" $gap={32} $align="center">
        <Flex $justify="space-between">
          <Text $size="h4" $weight="bold">
            🏢 기업체
          </Text>
          <Flex $direction="column" $align="flex-end" $gap={20} $fit>
            <Search
              placeholder="검색어를 입력해 주세요."
              $width={359}
              value={keyword}
              onChange={setKeyword}
            />
            <Dropdown
              $width={70}
              type={undefined}
              $isNoneBorder={true}
              $defaultValue={currentSort || ""}
              onChange={value =>
                updateParams({ "sort-type": value || undefined, "page": 1 })
              }
              options={sortType}
            />
          </Flex>
        </Flex>
        <Grid $columns="repeat(3, 1fr)" $gap={[32, 24]}>
          {isLoading &&
            Array.from({ length: 12 }, (_, index) => (
              <CompanyCardSkeleton key={index} />
            ))}
          {!isLoading && companies.length === 0 ? (
            <>
              <Spacer />
              <Box $margin={[50, 76.8]}>
                <Text $size="body2">검색된 기업이 없습니다.</Text>
              </Box>
            </>
          ) : (
            companies.map(company => (
              <CompanyCard
                key={company.id}
                companyName={company.name}
                imgUrl={company.logo_url}
                annualSales={`연매출 ${company.take}억`}
                bookmark={company.has_recruitment}
                onClick={() => navigate(`/company/detail/${company.id}`)}
              />
            ))
          )}
        </Grid>
        <Box $margin={[4, 0]}></Box>
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
