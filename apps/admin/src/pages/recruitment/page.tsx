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
  useToast,
  type PeriodValue,
  Box,
  TableSkeleton
} from "@jobis/design-system";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  useRecruitmentFileDownload,
  useTeacherRecruitmentList,
  useUpdateRecruitmentStatus,
  recruitmentsKeys,
  query,
  type RecruitmentStatus
} from "@jobis/api";
import {
  useDebounce,
  RECRUITMENT_STATUS_LABEL,
  RECRUITMENT_STATE_OPTIONS,
  COMPANY_TYPE_LABEL,
  COMPANY_TYPE_OPTIONS,
  YEAR_OPTIONS,
  PAGE_SIZE,
  formatDate,
  type LoaderData,
  useQueryParams
} from "../../utils";
import type { RecruitmentQuery } from "./loader";

export const Recruitment = () => {
  const { params: initialParams } =
    useLoaderData() as LoaderData<RecruitmentQuery>;
  const { currentTheme: theme } = useTheme();
  const toast = useToast();

  const { updateParams, resetParams, getParam, getParamAsNumber } =
    useQueryParams();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selected, setSelected] = useState<number[]>([]);

  const currentPage = getParamAsNumber("page", 1);
  const year = getParam("year");
  const type = getParam("type");
  const state = getParam("status");
  const startDate = getParam("start");
  const endDate = getParam("end");

  const period: PeriodValue | undefined =
    startDate && endDate
      ? {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          isConstant: false
        }
      : undefined;

  const [localSearch, setLocalSearch] = useState(
    initialParams.company_name || ""
  );

  const debouncedSearch = useDebounce(localSearch, 300);

  const handleResetFilters = () => {
    setLocalSearch("");
    setSelected([]);
    setOpenDropdown(null);
    resetParams();
  };

  const handlePeriodChange = (val: PeriodValue | undefined) => {
    updateParams({
      start: val?.startDate ? formatDate(val.startDate) : undefined,
      end: val?.endDate ? formatDate(val.endDate) : undefined,
      page: undefined
    });
  };

  const { data, isLoading, error } = useTeacherRecruitmentList({
    company_name: getParam("company-name"),
    year: year ? parseInt(year, 10) : undefined,
    status: state as RecruitmentStatus,
    start: startDate,
    end: endDate,
    winter_intern: initialParams.winter_intern
  });

  const { data: excelData } = useRecruitmentFileDownload();
  const { mutate: updateRecruitmentStatus } = useUpdateRecruitmentStatus();

  const excelUrl = excelData ? URL.createObjectURL(excelData) : null;

  const getSelectedRecruitmentIds = (): number[] => {
    return selected
      .map(index => {
        const globalIndex = (currentPage - 1) * PAGE_SIZE + index;
        return data?.recruitments[globalIndex]?.id;
      })
      .filter((id): id is number => id !== undefined);
  };

  const validateSelectedRecruitments = (): boolean => {
    if (selected.length === 0) {
      toast.warning("선택된 모집의뢰서가 없습니다.");
      return false;
    }

    const recruitmentIds = getSelectedRecruitmentIds();
    if (recruitmentIds.length === 0) {
      toast.warning("유효한 모집의뢰서가 없습니다.");
      return false;
    }

    return true;
  };

  const invalidateRecruitmentQueries = async () => {
    await Promise.all([
      query.invalidate(recruitmentsKeys.teacherRecruitmentList()),
      query.invalidate(recruitmentsKeys.recruitmentFileDownload())
    ]);
  };

  const resetSelection = () => {
    setSelected([]);
    setOpenDropdown(null);
  };

  const handleStatusChange = (newStatus: string) => {
    if (!validateSelectedRecruitments()) return;

    const recruitmentIds = getSelectedRecruitmentIds();
    updateRecruitmentStatus(
      {
        status: newStatus as RecruitmentStatus,
        recruitment_ids: recruitmentIds
      },
      {
        onSuccess: async () => {
          toast.success("상태가 변경되었습니다.");
          await invalidateRecruitmentQueries();
          resetSelection();
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
    const currentSearchValue = getParam("company-name") ?? "";
    if (debouncedSearch !== currentSearchValue) {
      updateParams({
        company_name: debouncedSearch || undefined,
        page: undefined
      });
    }
  }, [debouncedSearch, updateParams, getParam]);

  useEffect(() => {
    if (!error) return;
    const message =
      error && typeof error === "object" && "message" in error
        ? (error as Error).message
        : typeof error === "string"
          ? error
          : "알 수 없는 오류가 발생했습니다.";
    toast.error(message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
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
                {isLoading ? "-" : String(tableRows?.length)}
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
                onChange={handlePeriodChange}
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
              <Dropdown
                options={COMPANY_TYPE_OPTIONS}
                $width={96}
                $placeholder="구분"
                isOpen={openDropdown === "type"}
                onToggle={isOpen => setOpenDropdown(isOpen ? "type" : null)}
                value={type}
                onChange={val => updateParams({ type: val, page: undefined })}
              />
              <Dropdown
                options={RECRUITMENT_STATE_OPTIONS}
                $width={96}
                $placeholder="상태"
                isOpen={openDropdown === "state"}
                onToggle={isOpen => setOpenDropdown(isOpen ? "state" : null)}
                value={state}
                onChange={val => updateParams({ status: val, page: undefined })}
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
                value="상태변경"
                onChange={val => {
                  if (val) handleStatusChange(val);
                }}
                $color={theme.color.primary[20]}
              />
            </Flex>
          </Flex>
          {data?.recruitments.length === 0 || tableRows?.length === 0 ? (
            <Box $margin={[300, 474.8]}>
              <Text
                $size="h5"
                $weight="medium"
                $color={theme.color.grayScale[60]}
              >
                등록된 모집 의뢰서가 없습니다.
              </Text>
            </Box>
          ) : (
            <Flex $direction="column" $align="center" $gap={40}>
              {isLoading ? (
                <TableSkeleton
                  rows={5}
                  checkbox
                  columnWidths={[150, 135, 152, 120, 135, 135, 135, 163, 118]}
                />
              ) : (
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
