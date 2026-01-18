import {
  Container,
  Dropdown,
  PeriodDropdown,
  Flex,
  IconButton,
  Pagination,
  Search,
  Spacer,
  Table,
  Text,
  useTheme,
  useToast
} from "@jobis/design-system";
import { useEffect, useState } from "react";
import type { PeriodValue } from "@jobis/design-system";
import {
  useRecruitmentFileDownload,
  useTeacherRecruitmentList,
  useUpdateRecruitmentStatus
} from "@jobis/api";
import type { RecruitmentStatus, CompanyType } from "@jobis/api";

const STATUS_LABEL: Record<RecruitmentStatus, string> = {
  REQUESTED: "접수완료",
  READY: "모집전",
  RECRUITING: "모집중",
  DONE: "모집종료",
  MANUAL_ADD: "수동등록",
  WIN_INTERN: "겨울인턴"
};

const COMPANY_TYPE_LABEL: Record<CompanyType, string> = {
  LEAD: "선도기업",
  PARTICIPATING: "참여기업",
  MANUAL_ADD: "수동등록"
};

const STATE_OPTIONS = [
  { label: "모집중", value: "RECRUITING" },
  { label: "모집전", value: "READY" },
  { label: "진행중", value: "IN_PROGRESS" },
  { label: "모집종료", value: "DONE" },
  { label: "접수완료", value: "REQUESTED" },
  {
    label: "겨울인턴",
    value: "WIN_INTERN"
  }
];
const TYPE_OPTIONS = [
  { label: "선도기업", value: "LEAD" },
  { label: "참여기업", value: "PARTICIPATING" },
  { label: "수동등록", value: "MANUAL_ADD" }
];
const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: currentYear - 2024 + 1 }, (_, i) => ({
  label: String(2024 + i),
  value: String(2024 + i)
}));

const PAGE_SIZE = 5;

export const Recruitment = () => {
  const { currentTheme: theme } = useTheme();
  const toast = useToast();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [period, setPeriod] = useState<PeriodValue | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);
  const [state, setState] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string>("");

  const handleResetFilters = () => {
    setPeriod(undefined);
    setYear(undefined);
    setType(undefined);
    setState(undefined);
    setSearch("");
    setSelected([]);
    setOpenDropdown(null);
    setCurrentPage(1);
  };

  const formatDate = (date?: Date | string) => {
    if (!date) return undefined;
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toISOString().split("T")[0];
  };

  const filterParams = {
    company_name: search || undefined,
    year: year ? Number(year) : undefined,
    status: state as RecruitmentStatus | undefined,
    start: period?.startDate ? formatDate(period.startDate) : undefined,
    end: period?.endDate ? formatDate(period.endDate) : undefined,
    winter_intern: state === "WIN_INTERN" || undefined
  };

  const { data } = useTeacherRecruitmentList(filterParams);
  const { data: excelData } = useRecruitmentFileDownload();
  const { mutate: updateRecruitmentStatus } = useUpdateRecruitmentStatus();

  const excelUrl = excelData ? URL.createObjectURL(excelData) : null;

  const handleStatusChange = (newStatus: string) => {
    if (selected.length === 0) {
      toast.warning("선택된 모집의뢰서가 없습니다.");
      return;
    }

    const recruitmentIds = selected
      .map(index => {
        const globalIndex = (currentPage - 1) * PAGE_SIZE + index;
        return data?.recruitments[globalIndex]?.id;
      })
      .filter((id): id is number => id !== undefined);

    if (recruitmentIds.length === 0) {
      toast.warning("선택된 모집의뢰서 ID를 찾을 수 없습니다.");
      return;
    }

    updateRecruitmentStatus(
      {
        status: newStatus as RecruitmentStatus,
        recruitment_ids: recruitmentIds
      },
      {
        onSuccess: () => {
          toast.success("상태가 변경되었습니다.");
          setSelected([]);
          setOpenDropdown(null);
        },
        onError: () => {
          toast.error("상태 변경에 실패했습니다.");
        }
      }
    );
  };

  const tableRows: string[][] =
    data?.recruitments.map(recruitment => [
      STATUS_LABEL[recruitment.status] ?? String(recruitment.status),
      recruitment.company_name,
      recruitment.hiring_jobs,
      COMPANY_TYPE_LABEL[recruitment.company_type] ?? recruitment.company_type,
      String(recruitment.total_hiring_count),
      String(recruitment.application_requested_count),
      String(recruitment.application_approved_count),
      recruitment.start_date,
      recruitment.end_date
    ]) ?? [];

  const totalPages = Math.max(1, Math.ceil(tableRows.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedRows = tableRows.slice(startIndex, endIndex);
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [tableRows.length, totalPages, currentPage]);

  return (
    <Container $padding={[68, 0, 112]} $maxWidth={1248}>
      <Flex $gap={40} $direction="column" $justify="center" $align="center">
        <Flex $direction="column" $gap={16}>
          <Flex $align="flex-end" $justify="flex-start" $gap={8}>
            <Text $size="h4" $weight="bold" $color={theme.color.grayScale[90]}>
              모집의뢰서
            </Text>
            <Text $size="body2" $color={theme.color.grayScale[90]}>
              총
            </Text>
            <Flex $align="center" $fit>
              <Text $size="body2" $span $color={theme.color.subColor.blue[30]}>
                {String(tableRows?.length)}
              </Text>
              <Text $size="body2" $color={theme.color.grayScale[90]}>
                개
              </Text>
            </Flex>
          </Flex>
          <Flex $align="center" $justify="space-between">
            <Flex $align="center" $gap={8} $fit>
              <PeriodDropdown
                $width={96}
                $placeholder="기간"
                isOpen={openDropdown === "period"}
                onToggle={isOpen => setOpenDropdown(isOpen ? "period" : null)}
                value={period}
                onChange={val => setPeriod(val)}
              />
              <Dropdown
                options={YEAR_OPTIONS}
                $width={96}
                $placeholder="년도"
                isOpen={openDropdown === "year"}
                onToggle={isOpen => setOpenDropdown(isOpen ? "year" : null)}
                value={year}
                onChange={val => setYear(val)}
              />
              <Dropdown
                options={TYPE_OPTIONS}
                $width={96}
                $placeholder="구분"
                isOpen={openDropdown === "type"}
                onToggle={isOpen => setOpenDropdown(isOpen ? "type" : null)}
                value={type}
                onChange={val => setType(val)}
              />
              <Dropdown
                options={STATE_OPTIONS}
                $width={96}
                $placeholder="상태"
                isOpen={openDropdown === "state"}
                onToggle={isOpen => setOpenDropdown(isOpen ? "state" : null)}
                value={state}
                onChange={val => setState(val)}
              />
              <Search
                placeholder="기업명을 입력해주세요"
                $width={359}
                value={search}
                onChange={val => setSearch(val)}
              />
            </Flex>
            <Spacer />
            <Flex $align="center" $gap={8} $fit>
              <IconButton icon="Refresh" onClick={handleResetFilters}>
                필터 초기화
              </IconButton>
              {excelUrl ? (
                <a
                  href={excelUrl}
                  download="recruitments.xlsx"
                  style={{ textDecoration: "none" }}
                >
                  <IconButton icon="Print">엑셀 출력</IconButton>
                </a>
              ) : (
                <IconButton icon="Print">엑셀 출력</IconButton>
              )}
              <Dropdown
                $width={96}
                options={STATE_OPTIONS}
                $placeholder="상태변경"
                isOpen={openDropdown === "stateChange"}
                onToggle={isOpen =>
                  setOpenDropdown(isOpen ? "stateChange" : null)
                }
                value={undefined}
                onChange={val => {
                  if (val) handleStatusChange(val);
                }}
                $color={theme.color.primary[20]}
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex $direction="column" $align="center" $gap={40}>
          <Table
            headers={[
              "상태",
              "기업명",
              "직군",
              "구분",
              "모집인원",
              "지원요청",
              "지원자",
              "모집시작일",
              "모집종료일"
            ]}
            rows={paginatedRows}
            columnWidths={[150, 135, 152, 120, 135, 135, 135, 163, 118]}
            checkbox
            selectedRows={selected}
            onRowSelect={setSelected}
          />
          <Pagination
            start={1}
            end={totalPages}
            current={currentPage}
            onChange={page => {
              setSelected([]);
              setCurrentPage(page);
            }}
          />
        </Flex>
      </Flex>
    </Container>
  );
};
