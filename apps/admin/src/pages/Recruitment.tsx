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
import { useEffect, useState, useMemo } from "react";
import type { PeriodValue } from "@jobis/design-system";
import {
  useRecruitmentFileDownload,
  useTeacherRecruitmentList,
  useUpdateRecruitmentStatus
} from "@jobis/api";
import type { RecruitmentStatus } from "@jobis/api";
import {
  useDebounce,
  RECRUITMENT_STATUS_LABEL,
  RECRUITMENT_STATE_OPTIONS,
  COMPANY_TYPE_LABEL,
  COMPANY_TYPE_OPTIONS,
  YEAR_OPTIONS,
  PAGE_SIZE,
  formatDate
} from "../utils";

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

  const debouncedSearch = useDebounce(search, 300);

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

  const filterParams = useMemo(
    () => ({
      company_name: debouncedSearch || undefined,
      year: year ? Number(year) : undefined,
      status: state as RecruitmentStatus | undefined,
      start: period?.startDate ? formatDate(period.startDate) : undefined,
      end: period?.endDate ? formatDate(period.endDate) : undefined,
      winter_intern: state === "WIN_INTERN" || undefined
    }),
    [debouncedSearch, year, state, period]
  );

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

  const handleExcelDownload = () => {
    if (!excelUrl) {
      toast.info("파일이 준비중입니다.");
      return;
    }

    const link = document.createElement("a");
    link.href = excelUrl;
    link.download = `${new Date().toISOString()}-recruitments.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tableRows: string[][] =
    data?.recruitments
      .filter(
        recruitment => type === undefined || recruitment.company_type === type
      )
      .map(recruitment => [
        RECRUITMENT_STATUS_LABEL[recruitment.status] ??
          String(recruitment.status),
        recruitment.company_name,
        recruitment.hiring_jobs,
        COMPANY_TYPE_LABEL[recruitment.company_type] ??
          recruitment.company_type,
        String(recruitment.total_hiring_count),
        String(recruitment.application_requested_count),
        String(recruitment.application_approved_count),
        recruitment.start_date || "-",
        recruitment.end_date || "-"
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
                options={COMPANY_TYPE_OPTIONS}
                $width={96}
                $placeholder="구분"
                isOpen={openDropdown === "type"}
                onToggle={isOpen => setOpenDropdown(isOpen ? "type" : null)}
                value={type}
                onChange={val => setType(val)}
              />
              <Dropdown
                options={RECRUITMENT_STATE_OPTIONS}
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
              <IconButton icon="Print" onClick={handleExcelDownload}>
                엑셀 출력
              </IconButton>
              <Dropdown
                $width={96}
                options={RECRUITMENT_STATE_OPTIONS}
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
