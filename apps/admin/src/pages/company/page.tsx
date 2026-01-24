import {
  Box,
  Container,
  Dropdown,
  Flex,
  IconButton,
  Pagination,
  Search,
  Spacer,
  Table,
  TableSkeleton,
  Text,
  useTheme,
  useToast
} from "@jobis/design-system";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  useTeacherCompanyList,
  useUpdateCompanyType,
  useUpdateMou,
  companiesKeys,
  query,
  type CompanyType
} from "@jobis/api";
import {
  useDebounce,
  useQueryParams,
  COMPANY_TYPE_LABEL,
  COMPANY_TYPE_OPTIONS,
  REGION_OPTIONS,
  BUSINESS_AREA_OPTIONS,
  PAGE_SIZE,
  LoaderData,
  booleanToYN
} from "../../utils";
import type { CompanyQuery } from "./loader";

export const Company = () => {
  const { params: initialParams } = useLoaderData() as LoaderData<CompanyQuery>;
  const { currentTheme: theme } = useTheme();
  const toast = useToast();

  const { updateParams, resetParams, getParam, getParamAsNumber } =
    useQueryParams();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [localSearch, setLocalSearch] = useState(initialParams.name || "");

  const companyType = getParam("type");
  const region = getParam("region");
  const businessArea = getParam("business-area");
  const currentPage = getParamAsNumber("page", 1);

  const debouncedSearch = useDebounce(localSearch, 300);

  const handleResetFilters = () => {
    setLocalSearch("");
    setSelected([]);
    setOpenDropdown(null);
    resetParams();
  };

  const getSelectedCompanyIds = (): number[] => {
    return selected
      .map(index => {
        const globalIndex = (currentPage - 1) * PAGE_SIZE + index;
        return data?.companies[globalIndex]?.company_id;
      })
      .filter((id): id is number => id !== undefined);
  };

  const validateSelectedCompanies = (): boolean => {
    if (selected.length === 0) {
      toast.warning("선택된 기업이 없습니다.");
      return false;
    }

    const companyIds = getSelectedCompanyIds();
    if (companyIds.length === 0) {
      toast.warning("유효한 기업이 없습니다.");
      return false;
    }

    return true;
  };

  const invalidateCompanyQueries = async () => {
    await Promise.all([
      query.invalidate(companiesKeys.teacherCompanyList()),
      query.invalidate(companiesKeys.companyFileDownload())
    ]);
  };

  const resetSelection = () => {
    setSelected([]);
  };

  const handleParticipatingCompanyRegistration = () => {
    if (!validateSelectedCompanies()) return;

    const companyIds = getSelectedCompanyIds();
    updateCompanyType(
      {
        company_ids: companyIds,
        company_type: "PARTICIPATING"
      },
      {
        onSuccess: async () => {
          toast.success("참여기업으로 등록되었습니다.");
          await invalidateCompanyQueries();
          resetSelection();
        },
        onError: () => {
          toast.error("참여기업 등록에 실패했습니다.");
        }
      }
    );
  };

  const handleLeadingCompanyRegistration = () => {
    if (!validateSelectedCompanies()) return;

    const companyIds = getSelectedCompanyIds();
    updateCompanyType(
      {
        company_ids: companyIds,
        company_type: "LEADING"
      },
      {
        onSuccess: async () => {
          toast.success("선도기업으로 등록되었습니다.");
          await invalidateCompanyQueries();
          resetSelection();
        },
        onError: () => {
          toast.error("선도기업 등록에 실패했습니다.");
        }
      }
    );
  };

  const handleMouRegistration = () => {
    if (!validateSelectedCompanies()) return;

    const companyIds = getSelectedCompanyIds();
    updateMou(
      {
        company_ids: companyIds
      },
      {
        onSuccess: async () => {
          toast.success("협약이 등록되었습니다.");
          await invalidateCompanyQueries();
          resetSelection();
        },
        onError: () => {
          toast.error("협약 등록에 실패했습니다.");
        }
      }
    );
  };

  const { data, isLoading } = useTeacherCompanyList(
    currentPage,
    companyType,
    getParam("name"),
    region,
    businessArea ? parseInt(businessArea, 10) : undefined
  );

  const { mutate: updateCompanyType } = useUpdateCompanyType();
  const { mutate: updateMou } = useUpdateMou();

  const tableRows: string[][] =
    data?.companies.map(company => [
      company.company_name,
      company.region,
      company.business_area,
      String(company.workers_count),
      String(company.take),
      COMPANY_TYPE_LABEL[company.company_type as CompanyType] ??
        company.company_type,
      booleanToYN(company.convention),
      booleanToYN(company.personal_contact),
      String(company.recent_recruit_year),
      String(company.total_acceptance_count),
      String(company.review_count)
    ]) ?? [];

  const totalPages = Math.max(1, Math.ceil(tableRows.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedRows = tableRows.slice(startIndex, endIndex);

  useEffect(() => {
    const currentSearchValue = getParam("name") ?? "";
    if (debouncedSearch !== currentSearchValue) {
      updateParams({ name: debouncedSearch || undefined, page: undefined });
    }
  }, [debouncedSearch, updateParams, getParam]);

  return (
    <Container $padding={[68, 0, 112]} $maxWidth={1248}>
      <Flex $gap={40} $direction="column" $justify="center" $align="center">
        <Flex $direction="column" $gap={16}>
          <Flex $align="flex-end" $justify="flex-start" $gap={8}>
            <Text $size="h4" $weight="bold" $color={theme.color.grayScale[90]}>
              기업
            </Text>
            <Text $size="body2" $color={theme.color.grayScale[90]}>
              총
            </Text>
            <Flex $align="center" $fit>
              <Text $size="body2" $span $color={theme.color.subColor.blue[30]}>
                {isLoading ? "-" : String(tableRows?.length)}
              </Text>

              <Text $size="body2" $color={theme.color.grayScale[90]}>
                개
              </Text>
            </Flex>
          </Flex>
          <Flex $align="center" $justify="space-between">
            <Flex $align="center" $gap={8} $fit>
              <Dropdown
                options={COMPANY_TYPE_OPTIONS}
                $width={96}
                $placeholder="구분"
                isOpen={openDropdown === "companyType"}
                onToggle={isOpen =>
                  setOpenDropdown(isOpen ? "companyType" : null)
                }
                value={companyType}
                onChange={val => updateParams({ type: val, page: undefined })}
              />
              <Dropdown
                options={REGION_OPTIONS}
                $width={96}
                $placeholder="지역"
                isOpen={openDropdown === "region"}
                onToggle={isOpen => setOpenDropdown(isOpen ? "region" : null)}
                value={region}
                onChange={val => updateParams({ region: val, page: undefined })}
              />
              <Dropdown
                options={BUSINESS_AREA_OPTIONS}
                $width={96}
                $placeholder="분야"
                isOpen={openDropdown === "businessArea"}
                onToggle={isOpen =>
                  setOpenDropdown(isOpen ? "businessArea" : null)
                }
                value={businessArea}
                onChange={val =>
                  updateParams({ businessArea: val, page: undefined })
                }
              />
              <Search
                placeholder="기업명을 입력해주세요"
                $width={359}
                value={localSearch}
                onChange={setLocalSearch}
              />
            </Flex>
            <Spacer />
            <Flex $align="center" $gap={8} $fit>
              <IconButton icon="Refresh" onClick={handleResetFilters}>
                초기화
              </IconButton>
              <IconButton
                icon="Company"
                onClick={handleParticipatingCompanyRegistration}
              >
                참여기업 등록
              </IconButton>
              <IconButton
                icon="Company"
                onClick={handleLeadingCompanyRegistration}
              >
                선도기업 등록
              </IconButton>
              <IconButton icon="Register" onClick={handleMouRegistration}>
                협약등록
              </IconButton>
            </Flex>
          </Flex>
          {data?.companies.length === 0 ? (
            <Box $margin={[300, 511.2]}>
              <Text
                $size="h5"
                $weight="medium"
                $color={theme.color.grayScale[60]}
              >
                등록된 기업이 없습니다.
              </Text>
            </Box>
          ) : (
            <Flex $direction="column" $align="center" $gap={40}>
              {isLoading ? (
                <TableSkeleton
                  checkbox
                  columnWidths={[
                    164, 106, 170, 137, 101, 120, 75, 75, 117, 108, 115
                  ]}
                  rows={5}
                />
              ) : (
                <Table
                  headers={[
                    "기업명",
                    "지역",
                    "사업분야",
                    "근로자수",
                    "매출액(억)",
                    "기업구분",
                    "협약여부",
                    "개인컨텍",
                    "최근 의뢰년도",
                    "총 취업 학생수",
                    "후기등록"
                  ]}
                  rows={paginatedRows}
                  columnWidths={[
                    164, 106, 170, 137, 101, 120, 75, 75, 117, 108, 115
                  ]}
                  checkbox
                  selectedRows={selected}
                  onRowSelect={setSelected}
                />
              )}

              <Pagination
                start={1}
                end={totalPages}
                current={currentPage}
                onChange={page => {
                  setSelected([]);
                  updateParams({ page });
                }}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};
