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
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  useRecruitmentCount,
  useRecruitmentFileDownload,
  useTeacherRecruitmentCount,
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
  RECRUITMENT_STATUS_CHANGE_OPTIONS,
  COMPANY_TYPE_LABEL,
  COMPANY_TYPE_OPTIONS,
  YEAR_OPTIONS,
  PAGE_SIZE,
  formatDate,
  getErrorMessage,
  parseLocalDate,
  type LoaderData,
  useQueryParams
} from "../../utils";
import { getRecruitmentFilter, type RecruitmentQuery } from "./loader";

export const Recruitment = () => {
  const { params } = useLoaderData() as LoaderData<RecruitmentQuery>;
  const { currentTheme: theme } = useTheme();
  const toast = useToast();

  const { updateParams, resetParams, getParam, getPageParam } =
    useQueryParams();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selected, setSelected] = useState<number[]>([]);

  const currentPage = getPageParam();
  const year = getParam("year");
  const type = getParam("type");
  const state = getParam("status");
  const startDate = getParam("start");
  const endDate = getParam("end");
  const parsedStartDate = startDate ? parseLocalDate(startDate) : null;
  const parsedEndDate = endDate ? parseLocalDate(endDate) : null;

  // 주소에 잘못된 날짜가 들어 있으면 그 날짜는 설정하지 않은 것으로 보고, 한쪽만 골라도 표시한다
  const period: PeriodValue | undefined =
    parsedStartDate || parsedEndDate
      ? {
          startDate: parsedStartDate,
          endDate: parsedEndDate,
          isConstant: false
        }
      : undefined;

  const [localSearch, setLocalSearch] = useState(params.company_name || "");

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

  const filter = getRecruitmentFilter(params);

  // 필터·페이지를 바꾸는 동안 이전 결과를 두어 표와 총 개수가 비었다 채워지며 깜빡이지 않게 한다
  const { data, isLoading } = useTeacherRecruitmentList(
    { ...filter, page: currentPage },
    { placeholderData: previousData => previousData }
  );
  const { data: pageCountData } = useTeacherRecruitmentCount(filter, {
    placeholderData: previousData => previousData
  });
  const { data: countData } = useRecruitmentCount(filter, {
    placeholderData: previousData => previousData
  });

  const { data: excelData } = useRecruitmentFileDownload();
  const { mutate: updateRecruitmentStatus } = useUpdateRecruitmentStatus();

  const excelUrl = excelData ? URL.createObjectURL(excelData) : null;
  // 구분은 서버 조회 조건에 없어 받은 페이지 안에서만 거른다
  const recruitments =
    data?.recruitments.filter(
      recruitment => type === undefined || recruitment.company_type === type
    ) ?? [];

  const totalPages = Math.max(1, pageCountData?.total_page_count ?? 1);

  const getSelectedRecruitmentIds = (): number[] => {
    return selected
      .map(index => recruitments[index]?.id)
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
      query.invalidate(recruitmentsKeys.teacherRecruitmentCount()),
      query.invalidate(recruitmentsKeys.recruitmentCount()),
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
        onError: error => {
          toast.error(getErrorMessage(error, "상태 변경에 실패했습니다."));
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

  const getStatusColor = (status: RecruitmentStatus) => {
    switch (status) {
      case "REQUESTED":
        return theme.color.subColor.yellow[20];
      case "RECRUITING":
        return theme.color.subColor.blue[30];
      default:
        return theme.color.grayScale[60];
    }
  };

  const tableRows: ReactNode[][] = recruitments.map(recruitment => [
    <Flex $direction="column" $gap={2} $fit>
      <Text $size="body2" $color={getStatusColor(recruitment.status)}>
        {RECRUITMENT_STATUS_LABEL[recruitment.status] ??
          String(recruitment.status)}
      </Text>
      {/* 상태가 겨울인턴으로 덮어써진 공고는 상태 글자에 이미 겨울인턴이 나온다 */}
      {recruitment.winter_intern && recruitment.status !== "WIN_INTERN" && (
        <Text $size="caption" $color={theme.color.primary[20]}>
          겨울인턴
        </Text>
      )}
    </Flex>,
    recruitment.company_name,
    recruitment.hiring_jobs,
    COMPANY_TYPE_LABEL[recruitment.company_type] ?? recruitment.company_type,
    `${recruitment.total_hiring_count}명`,
    <Link
      to={`/application?recruitment-id=${recruitment.id}&application-status=REQUESTED`}
      style={{ textDecoration: "underline", color: theme.color.grayScale[60] }}
    >
      <Text $size="body2" $span $color={theme.color.grayScale[60]}>
        {`${recruitment.application_requested_count}명`}
      </Text>
    </Link>,
    `${recruitment.application_approved_count}명`,
    recruitment.start_date || "-",
    recruitment.end_date || "-"
  ]);

  // 다른 페이지·필터 결과가 오면 선택한 줄 번호가 다른 모집의뢰서를 가리키므로 비운다
  useEffect(() => {
    setSelected([]);
  }, [data, type]);

  useEffect(() => {
    const currentSearchValue = getParam("company-name") ?? "";
    if (debouncedSearch !== currentSearchValue) {
      updateParams({
        "company-name": debouncedSearch || undefined,
        "page": undefined
      });
    }
  }, [debouncedSearch, updateParams, getParam]);

  return (
    <Container $padding={[68, 0, 112]} $maxWidth={1248}>
      <Flex $gap={40} $direction="column" $justify="center" $align="center">
        <Flex $direction="column" $gap={16}>
          <Flex $align="flex-end" $justify="flex-start" $gap={8}>
            <Text $size="h4" $weight="bold" $color={theme.color.grayScale[90]}>
              모집의뢰서
            </Text>
            {countData && (
              <>
                <Text $size="body2" $color={theme.color.grayScale[90]}>
                  총
                </Text>
                <Flex $align="center" $fit>
                  <Text
                    $size="body2"
                    $span
                    $color={theme.color.subColor.blue[30]}
                  >
                    {String(countData.count)}
                  </Text>
                  <Text $size="body2" $color={theme.color.grayScale[90]}>
                    개
                  </Text>
                </Flex>
              </>
            )}
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
                options={RECRUITMENT_STATUS_CHANGE_OPTIONS}
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
          {recruitments.length === 0 && !isLoading ? (
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
                  rows={PAGE_SIZE}
                  checkbox
                  columnWidths={[150, 135, 152, 120, 135, 135, 135, 163, 118]}
                />
              ) : (
                <Table
                  headers={[
                    "상태",
                    "기업명",
                    "채용직군",
                    "구분",
                    "모집인원",
                    "지원요청",
                    "지원자",
                    "모집시작일",
                    "모집종료일"
                  ]}
                  rows={tableRows}
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
