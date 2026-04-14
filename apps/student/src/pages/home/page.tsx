import {
  ListSortType,
  useCompanyStudentList,
  useCompanyStudentRecentList
} from "@jobis/api";
import {
  Box,
  Container,
  Text,
  Flex,
  CompanyCard,
  Spacer,
  Skeleton,
  RecrutementCard,
  ListSection,
  EmploymentRateBanner
} from "@jobis/design-system";
import { LoaderData, useQueryParams } from "../../utils";
import { useBookmarks } from "@jobis/api";
import { useLoaderData } from "react-router-dom";
import type { HomeQuery } from "./loader";

export const Home = () => {
  const { params: initialParams } = useLoaderData() as LoaderData<HomeQuery>;
  const { getParam, getParamAsNumber } = useQueryParams();

  const currentPage = getParamAsNumber("page", initialParams.page);
  const currentName = getParam("name") ?? initialParams.name ?? "";
  const currentSort = (getParam("sort-type") ??
    initialParams.sortType ??
    "") as ListSortType | "";

  const { data: companyListData, isLoading } = useCompanyStudentList({
    page: currentPage,
    name: currentName,
    sort_type: currentSort as ListSortType
  });
  const companies = companyListData?.companies.slice(0, 3) || [];

  const { data: companyStudentRecentListData } = useCompanyStudentRecentList();
  const recentCompanies =
    companyStudentRecentListData?.companies.slice(0, 3) || [];

  const { data: bookmarksData } = useBookmarks();
  const bookmarks = bookmarksData?.bookmarks.slice(0, 4) || [];

  return (
    <Container $maxWidth={960} $padding={[40, 0, 252, 0]}>
      {/* 회색 배너 1개를 기본으로 두고 내용은 나중에 채우는 걸로 디자인과 이야기 됐습니다 */}
      <div style={{ cursor: "pointer" }} onClick={() => {}}>
        <Box
          width={960}
          height={280}
          $bg="#E5E5E5"
          $radius={16}
          $margin={[0, 0, 80, 0]}
        />
      </div>
      <Flex $direction="column" $gap={80}>
        <Flex $direction="column" $gap={16}>
          <Flex $gap={12} $align="center">
            <Text $size="h5" $weight="bold">
              👀 최근 본 기업이에요
            </Text>
            <ListSection onClickViewAll={() => {}} />
          </Flex>
          <Flex $gap={24}>
            {isLoading &&
              Array.from({ length: 3 }, (_, index) => (
                <Flex
                  key={index}
                  $direction="column"
                  $gap={10}
                  $align="flex-start"
                >
                  <Skeleton width={304} height={168} $radius={12} />
                  <Skeleton width={304} height={28} $radius={12} />
                  <Skeleton width={100} height={20} $radius={12} />
                </Flex>
              ))}
            {!isLoading && recentCompanies.length === 0 ? (
              <>
                <Spacer />
                <Box $margin={[100, 400, 100, 0]}>
                  <Text $size="body2">최근 본 기업이 없습니다.</Text>
                </Box>
              </>
            ) : (
              recentCompanies.map(company => (
                <CompanyCard
                  key={company.company_id}
                  companyName={company.company_name}
                  imgUrl={company.company_logo_url}
                  hasRecruitment={company.is_recruiting}
                />
              ))
            )}
          </Flex>
        </Flex>

        <Flex $direction="column" $gap={16}>
          <Flex $gap={12} $align="center">
            <Text $size="h5" $weight="bold">
              🏢이런 기업은 어떠세요?
            </Text>
            <ListSection onClickViewAll={() => {}} />
          </Flex>
          <Flex $gap={24}>
            {isLoading &&
              Array.from({ length: 3 }, (_, index) => (
                <Flex
                  key={index}
                  $direction="column"
                  $gap={10}
                  $align="flex-start"
                >
                  <Skeleton width={304} height={168} $radius={12} />
                  <Skeleton width={304} height={28} $radius={12} />
                  <Skeleton width={100} height={20} $radius={12} />
                </Flex>
              ))}
            {!isLoading && companies.length === 0 ? (
              <>
                <Spacer />
                <Box $margin={[100, 400, 100, 0]}>
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
                  hasRecruitment={company.has_recruitment}
                />
              ))
            )}
          </Flex>
        </Flex>
      </Flex>

      <Box $margin={[120, 0]}>
        <EmploymentRateBanner onClick={() => {}} />
      </Box>

      <Flex $direction="column" $gap={16}>
        <Flex $gap={12} $align="center">
          <Text $size="h5" $weight="bold">
            📌 내가 저장한 모집 의뢰서
          </Text>
          <ListSection onClickViewAll={() => {}} />
        </Flex>
        <Flex $gap={24}>
          {bookmarks.map(bookmark => {
            return (
              <RecrutementCard
                key={bookmark.recruitment_id}
                companyName={bookmark.company_name}
                companyProfileUrl={bookmark.company_logo_url}
                hiringJobs={bookmark.hiring_job}
                militarySupport={bookmark.military_support}
                bookmarked={bookmark.bookmarked}
              />
            );
          })}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Home;
