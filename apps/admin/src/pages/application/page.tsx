import {
  Box,
  Button,
  Container,
  Dropdown,
  Flex,
  Icon,
  IconButton,
  Layer,
  Pagination,
  Positioner,
  Search,
  Spacer,
  Surface,
  Table,
  TableSkeleton,
  Text,
  useTheme,
  useToast
} from "@jobis/design-system";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useLoaderData } from "react-router-dom";
import {
  useTeacherApplications,
  useUpdateApplicationStatus,
  applicationsKeys,
  query,
  type ApplicationStatus,
  type AttachmentType
} from "@jobis/api";
import {
  useDebounce,
  useQueryParams,
  YEAR_OPTIONS,
  PAGE_SIZE,
  LoaderData
} from "../../utils";
import type { ApplicationQuery } from "./loader";

const APPLICATION_STATUS_LABEL: Record<ApplicationStatus, string> = {
  REQUESTED: "접수완료",
  APPROVED: "승인완료",
  SEND: "전송완료",
  FAILED: "불합격",
  PASS: "합격",
  REJECTED: "거절",
  FIELD_TRAIN: "현장실습",
  ACCEPTANCE: "취업",
  DOC_FAILED: "서류불합격",
  PROCESSING: "처리중"
};

const APPLICATION_STATUS_OPTIONS = [
  { label: "접수완료", value: "REQUESTED" },
  { label: "승인완료", value: "APPROVED" },
  { label: "전송완료", value: "SEND" },
  { label: "불합격", value: "FAILED" },
  { label: "합격", value: "PASS" },
  { label: "거절", value: "REJECTED" },
  { label: "현장실습", value: "FIELD_TRAIN" },
  { label: "취업", value: "ACCEPTANCE" },
  { label: "서류불합격", value: "DOC_FAILED" },
  { label: "처리중", value: "PROCESSING" }
];

interface Attachment {
  url: string;
  type: AttachmentType;
}

const Attachments = ({
  id,
  attachments,
  isOpen,
  setOpen
}: {
  id: number;
  attachments: Attachment[];
  isOpen: boolean;
  setOpen: (id: number | null) => void;
}) => {
  const { currentTheme: theme } = useTheme();

  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) {
        setOpen(null);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, id, setOpen]);

  if (attachments.length === 0) return "-";

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFileIcon = (type: AttachmentType) => {
    return type === "FILE" ? "Document" : "Link";
  };

  const getFileName = (url: string) => {
    const parts = url.split("-");
    return parts[parts.length - 1] || url;
  };

  const firstAttachment = attachments[0];

  return (
    <Positioner $top={25} $position="absolute">
      <Box width={"100%"} $padding={[8, 12]}>
        <Flex
          $align="center"
          $justify="center"
          $gap={8}
          style={{
            cursor: "pointer",
            borderRadius: "4px",
            border: `1px solid ${theme.color.grayScale[20]}`,
            backgroundColor: theme.color.grayScale[10]
          }}
          onClick={e => {
            e.stopPropagation();
            setOpen(isOpen ? null : id);
          }}
        >
          <Text $size="body3" $color={theme.color.grayScale[60]}>
            {getFileName(firstAttachment.url)}
          </Text>
          {attachments.length > 1 && (
            <Text $size="body3" $color={theme.color.grayScale[60]}>
              {`외 ${attachments.length - 1}개`}
            </Text>
          )}
          <Icon
            icon={isOpen ? "ChevronUp" : "ChevronDown"}
            size={14}
            strokeColor={theme.color.grayScale[60]}
          />
        </Flex>

        {isOpen && (
          <Layer $level={1}>
            <Surface
              $padding={[12, 16]}
              $bg={theme.color.grayScale[10]}
              $shadow
              $radius={4}
            >
              {attachments.map((attachment, index) => (
                <Flex
                  key={index}
                  $align="center"
                  $justify="space-between"
                  $gap={8}
                >
                  <Flex $align="center" $gap={8} $fit>
                    <Icon
                      icon={getFileIcon(attachment.type)}
                      size={20}
                      strokeColor={theme.color.grayScale[60]}
                    />
                    <Text $size="body3" $color={theme.color.grayScale[70]}>
                      {getFileName(attachment.url)}
                    </Text>
                  </Flex>
                  <Button
                    $size="sm"
                    $variant="outline"
                    onClick={e => {
                      e.stopPropagation();
                      if (attachment.type === "FILE") {
                        handleDownload(
                          `${import.meta.env.FILE_URL}/${attachment.url}`,
                          getFileName(attachment.url)
                        );
                      } else {
                        window.open(attachment.url, "_blank");
                      }
                    }}
                  >
                    {attachment.type === "FILE" ? "다운로드" : "링크이동"}
                  </Button>
                </Flex>
              ))}
            </Surface>
          </Layer>
        )}
      </Box>
    </Positioner>
  );
};

export const Application = () => {
  const { params: initialParams } =
    useLoaderData() as LoaderData<ApplicationQuery>;
  const { currentTheme: theme } = useTheme();
  const toast = useToast();

  const { updateParams, resetParams, getParam, getParamAsNumber } =
    useQueryParams();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [localSearch, setLocalSearch] = useState(
    initialParams.student_name || ""
  );

  const [openedAttachment, setOpenedAttachment] = useState<number | null>(null);

  const currentPage = getParamAsNumber("page", 1);
  const applicationStatus = getParam("application-status");
  const yearFilter = getParam("year");

  const debouncedSearch = useDebounce(localSearch, 300);

  const { data, isLoading } = useTeacherApplications(
    applicationStatus,
    getParam("student-name"),
    undefined,
    undefined,
    undefined,
    yearFilter
  );

  const { mutate: updateApplicationStatus } = useUpdateApplicationStatus();

  const handleResetFilters = () => {
    setLocalSearch("");
    setSelected([]);
    setOpenDropdown(null);
    resetParams();
  };

  const getSelectedApplicationIds = (): number[] => {
    return selected
      .map(index => {
        const globalIndex = (currentPage - 1) * PAGE_SIZE + index;
        return data?.applications[globalIndex]?.application_id;
      })
      .filter((id): id is number => id !== undefined);
  };

  const validateSelectedApplications = (): boolean => {
    if (selected.length === 0) {
      toast.warning("선택된 지원서가 없습니다.");
      return false;
    }

    const applicationIds = getSelectedApplicationIds();
    if (applicationIds.length === 0) {
      toast.warning("유효한 지원서가 없습니다.");
      return false;
    }

    return true;
  };

  const invalidateApplicationQueries = async () => {
    await Promise.all([
      query.invalidate(applicationsKeys.teacherApplications())
    ]);
  };

  const resetSelection = () => {
    setSelected([]);
    setOpenDropdown(null);
  };

  const handleStatusChange = (newStatus: string) => {
    if (!validateSelectedApplications()) return;

    const applicationIds = getSelectedApplicationIds();
    updateApplicationStatus(
      {
        applicationIds,
        status: newStatus
      },
      {
        onSuccess: async () => {
          toast.success("상태가 변경되었습니다.");
          await invalidateApplicationQueries();
          resetSelection();
        },
        onError: () => {
          toast.error("상태 변경에 실패했습니다.");
        }
      }
    );
  };

  const tableRows: ReactNode[][] =
    data?.applications.map(app => [
      app.attachments.some(att => att.type === "FILE") ? "파일" : "URL",
      APPLICATION_STATUS_LABEL[app.application_status],
      app.student_gcn,
      app.student_name,
      app.company_name,
      app.created_at,
      app.attachments.length > 0 ? (
        <Attachments
          id={app.application_id}
          attachments={app.attachments}
          isOpen={openedAttachment === app.application_id}
          setOpen={setOpenedAttachment}
        />
      ) : (
        "-"
      )
    ]) ?? [];

  const totalPages = Math.max(1, Math.ceil(tableRows.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedRows = tableRows.slice(startIndex, endIndex);

  useEffect(() => {
    const currentSearchValue = getParam("student-name") ?? "";
    if (debouncedSearch !== currentSearchValue) {
      updateParams({
        studentName: debouncedSearch || undefined,
        page: undefined
      });
    }
  }, [debouncedSearch, updateParams, getParam]);

  return (
    <Container $padding={[68, 0, 112]} $maxWidth={1242}>
      <Flex $gap={40} $direction="column" $justify="center" $align="center">
        <Flex $direction="column" $gap={16}>
          <Flex $align="flex-end" $justify="flex-start" $gap={8}>
            <Text $size="h4" $weight="bold" $color={theme.color.grayScale[90]}>
              지원서
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
                options={APPLICATION_STATUS_OPTIONS}
                $width={96}
                $placeholder="상태"
                isOpen={openDropdown === "status"}
                onToggle={isOpen => setOpenDropdown(isOpen ? "status" : null)}
                value={applicationStatus}
                onChange={val =>
                  updateParams({ applicationStatus: val, page: undefined })
                }
              />
              <Dropdown
                options={YEAR_OPTIONS}
                $width={96}
                $placeholder="년도"
                isOpen={openDropdown === "year"}
                onToggle={isOpen => setOpenDropdown(isOpen ? "year" : null)}
                value={yearFilter}
                onChange={val => updateParams({ year: val, page: undefined })}
              />
              <Search
                placeholder="이름을 입력하여 검색"
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
              <Dropdown
                $width={96}
                options={APPLICATION_STATUS_OPTIONS}
                $placeholder="상태변경"
                isOpen={openDropdown === "statusChange"}
                onToggle={isOpen =>
                  setOpenDropdown(isOpen ? "statusChange" : null)
                }
                value="상태변경"
                onChange={val => {
                  if (val) handleStatusChange(val);
                }}
                $color={theme.color.primary[20]}
              />
            </Flex>
          </Flex>

          {data?.applications.length === 0 ||
          (tableRows?.length === 0 && !isLoading) ? (
            <Box $margin={[300, 511.2]}>
              <Text
                $size="h5"
                $weight="medium"
                $color={theme.color.grayScale[60]}
              >
                등록된 지원서가 없습니다.
              </Text>
            </Box>
          ) : (
            <Flex $direction="column" $align="center" $gap={40}>
              {isLoading ? (
                <TableSkeleton
                  checkbox
                  columnWidths={[124, 124, 124, 124, 173, 124, 405]}
                  rows={5}
                />
              ) : (
                <Table
                  headers={[
                    "형태",
                    "상태",
                    "학번",
                    "이름",
                    "기업",
                    "지원일자",
                    "첨부파일"
                  ]}
                  rows={paginatedRows}
                  columnWidths={[124, 124, 124, 124, 173, 124, 405]}
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
