import {
  Container,
  Dropdown,
  DropdownPeriod,
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
  useTeacherRecruitmentList,
  useUpdateRecruitmentStatus
} from "@jobis/api";
import type { RecruitmentStatus, CompanyType } from "@jobis/api";

export const Recruitment = () => {
  const { currentTheme: theme } = useTheme();
  const toast = useToast();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  // 필터 상태 관리
  const [period, setPeriod] = useState<PeriodValue | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);
  const [state, setState] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string>("");

  // 필터 초기화 함수
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
    winter_intern: type === "winter_internship" || undefined
  };

  const { data } = useTeacherRecruitmentList(filterParams);
  const { mutate: updateRecruitmentStatus } = useUpdateRecruitmentStatus();

  // 상태 변경 핸들러
  const handleStatusChange = (newStatus: string) => {
    if (selected.length === 0) {
      toast.warning("선택된 모집의뢰서가 없습니다.");
      return;
    }

    // 선택된 인덱스를 전체 행 인덱스로 변환 (페이지네이션 고려)
    const recruitmentIds = selected
      .map(index => {
        const globalIndex = (currentPage - 1) * pageSize + index;
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
          setSelected([]); // 선택 초기화
          setOpenDropdown(null);
        },
        onError: () => {
          toast.error("상태 변경에 실패했습니다.");
        }
      }
    );
  };
  const statusLabel: Record<RecruitmentStatus, string> = {
    REQUESTED: "접수완료",
    READY: "모집전",
    RECRUITING: "모집중",
    DONE: "모집종료"
  };

  const companyTypeLabel: Record<CompanyType, string> = {
    PARTICIPATING: "참여",
    MANUAL_ADD: "일반"
  };

  // API 데이터를 Table 형식으로 변환
  const tableRows: string[][] =
    data?.recruitments.map(recruitment => [
      statusLabel[recruitment.status] ?? String(recruitment.status),
      String(recruitment.company_name),
      String(recruitment.hiring_jobs),
      companyTypeLabel[recruitment.company_type] ??
        String(recruitment.company_type),
      String(recruitment.total_hiring_count),
      String(recruitment.application_requested_count),
      String(recruitment.application_approved_count),
      String(recruitment.start_date),
      String(recruitment.end_date)
    ]) ?? [];

  // 페이지네이션 계산 (5개씩 보여주기)
  const totalPages = Math.max(1, Math.ceil(tableRows.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRows = tableRows.slice(startIndex, endIndex);

  // 데이터 길이가 변할 때 현재 페이지 보정
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [tableRows.length, totalPages, currentPage]);

  const stateOptions = [
    { label: "모집중", value: "recruiting" },
    { label: "모집전", value: "before_recruitment" },
    { label: "진행중", value: "in_progress" },
    { label: "모집종료", value: "recruitment_closed" },
    { label: "전수완료", value: "completed" },
    {
      label: "겨울인턴",
      value: "winter_internship"
    }
  ];
  const typeOptions = [
    { label: "채용형", value: "recruitment" },
    { label: "체험형", value: "experience" }
  ];
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => ({
      label: String(2024 + i),
      value: String(2024 + i)
    })
  );
  return (
    <Container $padding={[68, 0, 112]} $maxWidth={1248}>
      {/* 전체 flex 컨테이너 */}
      <Flex $gap={40} $direction="column" $justify="center" $align="center">
        {/* 모집의뢰서 텍스트와 필터링 드롭다운 */}
        <Flex $direction="column" $gap={16}>
          <Flex $align="flex-end" $justify="flex-start" $gap={8}>
            <Text $size="h4" $weight="bold" $color={theme.color.grayScale[90]}>
              모집의뢰서
            </Text>
            <Text $size="body2" $color={theme.color.grayScale[90]}>
              총{" "}
              <Text $size="body2" $span $color={theme.color.subColor.blue[30]}>
                {tableRows.length ?? 0}
              </Text>
              개
            </Text>
          </Flex>
          <Flex $align="center" $justify="space-between">
            <Flex $align="center" $gap={8} $fit>
              <DropdownPeriod
                $width={96}
                $placeholder="기간"
                isOpen={openDropdown === "period"}
                onToggle={isOpen => setOpenDropdown(isOpen ? "period" : null)}
                value={period}
                onChange={val => setPeriod(val)}
              />
              <Dropdown
                options={yearOptions}
                $width={96}
                $placeholder="년도"
                isOpen={openDropdown === "year"}
                onToggle={isOpen => setOpenDropdown(isOpen ? "year" : null)}
                value={year}
                onChange={val => setYear(val)}
              />
              <Dropdown
                options={typeOptions}
                $width={96}
                $placeholder="구분"
                isOpen={openDropdown === "type"}
                onToggle={isOpen => setOpenDropdown(isOpen ? "type" : null)}
                value={type}
                onChange={val => setType(val)}
              />
              <Dropdown
                options={stateOptions}
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
              <IconButton iconName="Refresh" onClick={handleResetFilters}>
                필터 초기화
              </IconButton>
              <IconButton iconName="Print" onClick={() => void 0}>
                엑셀 출력
              </IconButton>
              <Dropdown
                $width={96}
                options={stateOptions}
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

        {/* 모집의뢰서 리스트와 페이지네이션 */}
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
              setSelected([]); // 페이지 전환 시 선택 초기화
              setCurrentPage(page);
            }}
          />
        </Flex>
      </Flex>
    </Container>
  );
};
