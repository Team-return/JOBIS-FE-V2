import {
  Box,
  Container,
  Dropdown,
  Flex,
  Pagination,
  Search,
  Spacer,
  Table,
  TableSkeleton,
  Text,
  useTheme
} from "@jobis/design-system";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useLoaderData } from "react-router-dom";
import {
  COMPANY_TYPE_OPTIONS,
  LoaderData,
  YEAR_OPTIONS,
  useDebounce,
  useQueryParams
} from "../../utils";
import type { StudentQuery, StudentTab } from "./loader";

const TABLE_WIDTH = 1224;
const PAGE_SIZE = 12;
const SEARCH_DEBOUNCE_DELAY = 300;
const SKELETON_ROW_COUNT = 5;

const COMPANY_COLUMN_WIDTHS = [612, 306, 306];
const FIELD_TRAIN_COLUMN_WIDTHS = [312, 228, 228, 228, 228];
const CONTRACT_COLUMN_WIDTHS = [324, 300, 300, 300];

const FIELD_TRAIN_ACTION_OPTIONS = [
  { label: "삭제", value: "delete" },
  { label: "근로계약 변경", value: "employment" }
];

const TABS: { value: StudentTab; label: string }[] = [
  { value: "company", label: "기업" },
  { value: "field-train", label: "현장실습" },
  { value: "contract", label: "근로계약" }
];

export const Student = () => {
  const { params: initialParams } = useLoaderData() as LoaderData<StudentQuery>;
  const { currentTheme: theme } = useTheme();
  const { updateParams, getParam, getParamAsNumber } = useQueryParams();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [localSearch, setLocalSearch] = useState(
    initialParams.companyName || ""
  );

  const tab = (getParam("tab") as StudentTab) || initialParams.tab;
  const currentPage = getParamAsNumber("page", 1);
  const companyName = getParam("company-name") ?? "";
  const companyType = getParam("type");
  const year = getParam("year");
  const selectedCompanyId = getParamAsNumber("company-id", 0);
  const selectedCompanyName = getParam("selected-company") ?? "";

  const debouncedSearch = useDebounce(localSearch, SEARCH_DEBOUNCE_DELAY);

  const isCompanyTab = tab === "company";
  const hasSelectedCompany = selectedCompanyId > 0;

  // 퍼블리싱 단계라 데이터는 비워둡니다. API 연동은 별도 브랜치에서 진행합니다.
  const isLoading = false;
  const companies: {
    company_id: number;
    company_name: string;
    field_trainee_count: number;
    contract_count: number;
  }[] = [];
  const fieldTrainees: {
    student_gcn: string;
    student_name: string;
    start_date: string;
    end_date: string;
  }[] = [];
  const acceptances: {
    student_gcn: string;
    student_name: string;
    contract_date: string;
  }[] = [];

  const selectCompany = (companyId: number, name: string) => {
    updateParams({
      "tab": "field-train",
      "company-id": companyId,
      "selected-company": name,
      "page": undefined
    });
  };

  const changeTab = (nextTab: StudentTab) => {
    setOpenDropdown(null);
    setSelected([]);
    updateParams({ tab: nextTab, page: undefined });
  };

  useEffect(() => {
    if (!isCompanyTab) return;
    if (debouncedSearch === companyName) return;

    updateParams({
      "company-name": debouncedSearch || undefined,
      "page": undefined
    });
  }, [debouncedSearch, companyName, isCompanyTab, updateParams]);

  const headers = isCompanyTab
    ? ["기업명", "현장실습생", "근로계약생"]
    : tab === "field-train"
      ? ["기업명", "학번", "이름", "파견일자", "종료일자"]
      : ["기업명", "학번", "이름", "계약일자"];

  const columnWidths = isCompanyTab
    ? COMPANY_COLUMN_WIDTHS
    : tab === "field-train"
      ? FIELD_TRAIN_COLUMN_WIDTHS
      : CONTRACT_COLUMN_WIDTHS;

  const rows: ReactNode[][] = isCompanyTab
    ? companies.map(company => [
        <div
          key={`company-${company.company_id}`}
          style={{ cursor: "pointer" }}
          onClick={() =>
            selectCompany(company.company_id, company.company_name)
          }
        >
          <Text $size="body2" $color={theme.color.grayScale[70]}>
            {company.company_name}
          </Text>
        </div>,
        String(company.field_trainee_count),
        String(company.contract_count)
      ])
    : tab === "field-train"
      ? fieldTrainees.map(trainee => [
          selectedCompanyName,
          trainee.student_gcn,
          trainee.student_name,
          trainee.start_date || "-",
          trainee.end_date || "-"
        ])
      : acceptances.map(acceptance => [
          selectedCompanyName,
          acceptance.student_gcn,
          acceptance.student_name,
          acceptance.contract_date || "-"
        ]);

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedRows = isCompanyTab
    ? rows
    : rows.slice(startIndex, startIndex + PAGE_SIZE);

  const emptyMessage =
    !isCompanyTab && !hasSelectedCompany
      ? "기업 탭에서 기업을 먼저 선택해주세요."
      : isCompanyTab
        ? "등록된 기업이 없습니다."
        : "등록된 학생이 없습니다.";

  return (
    <Container $padding={[68, 0, 112]} $maxWidth={TABLE_WIDTH}>
      <Flex $gap={40} $direction="column" $justify="center" $align="center">
        <Flex $direction="column" $gap={16}>
          <Flex $gap={16} $align="flex-end">
            {TABS.map(({ value, label }) => (
              <div
                key={value}
                style={{ cursor: "pointer" }}
                onClick={() => changeTab(value)}
              >
                <Text
                  $size="h4"
                  $weight="bold"
                  $color={
                    tab === value
                      ? theme.color.grayScale[90]
                      : theme.color.grayScale[50]
                  }
                >
                  {label}
                </Text>
              </div>
            ))}
          </Flex>

          <Flex $align="center" $justify="space-between">
            <Flex $align="center" $gap={8} $fit>
              <Dropdown
                options={COMPANY_TYPE_OPTIONS}
                $width={96}
                $placeholder="구분"
                isOpen={openDropdown === "type"}
                onToggle={isOpen => setOpenDropdown(isOpen ? "type" : null)}
                value={companyType}
                onChange={val => updateParams({ type: val, page: undefined })}
              />
              <Dropdown
                options={YEAR_OPTIONS}
                $width={96}
                $placeholder="년도"
                isOpen={openDropdown === "year"}
                onToggle={isOpen => setOpenDropdown(isOpen ? "year" : null)}
                value={year}
                onChange={val => updateParams({ year: val, page: undefined })}
              />
              <Search
                placeholder="기업명을 입력해주세요"
                $width={359}
                value={localSearch}
                onChange={setLocalSearch}
              />
            </Flex>
            <Spacer />
            <Dropdown
              options={tab === "field-train" ? FIELD_TRAIN_ACTION_OPTIONS : []}
              $width={110}
              $placeholder="상태변경"
              value=""
              isOpen={openDropdown === "action"}
              onToggle={isOpen => setOpenDropdown(isOpen ? "action" : null)}
            />
          </Flex>

          {rows.length === 0 && !isLoading ? (
            <Box width={TABLE_WIDTH} $margin={[300, 0]}>
              <Text
                $size="h5"
                $weight="medium"
                $align="center"
                $color={theme.color.grayScale[60]}
              >
                {emptyMessage}
              </Text>
            </Box>
          ) : (
            <Flex $direction="column" $align="center" $gap={40}>
              {isLoading ? (
                <TableSkeleton
                  checkbox
                  columnWidths={columnWidths}
                  rows={SKELETON_ROW_COUNT}
                />
              ) : (
                <Table
                  headers={headers}
                  rows={paginatedRows}
                  columnWidths={columnWidths}
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
