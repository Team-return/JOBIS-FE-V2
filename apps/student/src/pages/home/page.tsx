import { ListSortType, useCompanyStudentList } from "@jobis/api";
import {
  Box,
  Container,
  Text,
  Flex,
  CompanyCard,
  Spacer,
  Skeleton,
  RecrutementCard
} from "@jobis/design-system";
import { useQueryParams } from "../../utils";
import { BandBanner } from "../../../../../packages/design-system/src/components/compound/BandBanner";

const CompanyCardSkeleton = () => {
  return (
    <Flex $direction="column" $gap={10} $align="flex-start">
      <Skeleton width={304} height={168} $radius={12} />
      <Skeleton width={304} height={28} $radius={12} />
      <Skeleton width={100} height={20} $radius={12} />
    </Flex>
  );
};

export const Home = () => {
  const { getParam, getParamAsNumber } = useQueryParams();

  const currentPage = getParamAsNumber("page", 1);
  const currentName = getParam("name") || "";
  const currentSort = getParam("sort-type") || "";

  const { data: companyListData, isLoading } = useCompanyStudentList({
    page: currentPage,
    name: currentName,
    sort_type: currentSort as ListSortType
  });

  const companies = companyListData?.companies || [];

  const companyData = Array.from({ length: 4 }, (_, index) => ({
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
    <Container $maxWidth={960} $padding={[40, 0, 252, 0]}>
      {/* 회색 배너 1개를 기본으로 두고 내용은 나중에 채우는 걸로 디자인과 이야기 됐습니다 */}
      <Box
        width={960}
        height={280}
        $bg="#E5E5E5"
        $radius={16}
        $margin={[0, 0, 80, 0]}
      />
      <Flex $direction="column" $gap={80}>
        <Flex $direction="column" $gap={16}>
          <Text $size="h5" $weight="bold">
            👀 최근 본 기업이에요
          </Text>
          <Flex>
            {isLoading &&
              Array.from({ length: 3 }, (_, index) => (
                <CompanyCardSkeleton key={index} />
              ))}
            {!isLoading && companies.length === 0 ? (
              <>
                <Spacer />
                <Box $margin={[100, 400, 100, 0]}>
                  <Text $size="body2">최근 본 기업이 없습니다.</Text>
                </Box>
              </>
            ) : (
              companies.map(company => (
                <CompanyCard
                  key={company.id}
                  companyName={company.name}
                  imgUrl={company.logo_url}
                  annualSales={`연매출 ${company.take}억`}
                />
              ))
            )}
          </Flex>
        </Flex>

        <Flex $direction="column" $gap={16}>
          <Text $size="h5" $weight="bold">
            🏢이런 기업은 어떠세요?
          </Text>
          <Flex>
            {isLoading &&
              Array.from({ length: 3 }, (_, index) => (
                <CompanyCardSkeleton key={index} />
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
                />
              ))
            )}
          </Flex>
        </Flex>

        <Flex $direction="column" $gap={16}>
          <Text $size="h5" $weight="bold">
            👩‍💻 강용수님의 관심 분야에요
          </Text>
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
        </Flex>
      </Flex>

      <Box $margin={[120, 0]} $cursor="pointer">
        <BandBanner />
      </Box>

      <Flex $direction="column" $gap={16}>
        <Text $size="h5" $weight="bold">
          📌 내가 저장한 모집 의뢰서
        </Text>
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
      </Flex>
    </Container>
  );
};

export default Home;
