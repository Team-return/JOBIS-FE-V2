import {
  Box,
  Button,
  Container,
  Flex,
  Pagination,
  Search,
  Spacer,
  Table,
  TableSkeleton,
  Text,
  useTheme
} from "@jobis/design-system";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useNoticeList } from "@jobis/api";
import {
  useDebounce,
  useQueryParams,
  NOTICE_PAGE_SIZE,
  LoaderData
} from "../../utils";
import type { NoticeQuery } from "./loader";

const NOTICE_COLUMN_WIDTHS = [102, 1020, 102];
const NOTICE_TABLE_WIDTH = NOTICE_COLUMN_WIDTHS.reduce(
  (total, width) => total + width,
  0
);
const NOTICE_TITLE_PADDING = 28;
const NOTICE_TITLE_WIDTH = 556;
const NOTICE_ROW_HEIGHT = 48;
const SEARCH_DEBOUNCE_DELAY = 300;
const SKELETON_ROW_COUNT = 5;

const NoticeCell = ({ children, to }: { children: ReactNode; to?: string }) =>
  to ? (
    <Link
      to={to}
      style={{
        width: "100%",
        display: "block",
        color: "inherit",
        textDecoration: "none"
      }}
    >
      {children}
    </Link>
  ) : (
    <div style={{ width: "100%" }}>{children}</div>
  );

const NoticeTitle = ({ title, color }: { title: string; color?: string }) => (
  <div style={{ width: "100%", paddingLeft: NOTICE_TITLE_PADDING }}>
    <div
      style={{
        width: NOTICE_TITLE_WIDTH,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }}
    >
      <Text $span $size="body2" $color={color}>
        {title}
      </Text>
    </div>
  </div>
);

const formatNoticeDate = (createdAt: string) => {
  if (!createdAt) return "-";
  return createdAt.split("T")[0];
};

export const Notice = () => {
  const { params: initialParams } = useLoaderData() as LoaderData<NoticeQuery>;
  const { currentTheme: theme } = useTheme();

  const { updateParams, getParam, getParamAsNumber } = useQueryParams();
  const navigate = useNavigate();

  const [localSearch, setLocalSearch] = useState(initialParams.title || "");

  const currentPage = getParamAsNumber("page", 1);
  const searchKeyword = getParam("title") ?? "";

  const debouncedSearch = useDebounce(localSearch, SEARCH_DEBOUNCE_DELAY);

  const { data, isLoading } = useNoticeList();

  const notices = (data?.notices ?? []).filter(notice =>
    notice.title.includes(searchKeyword)
  );

  const tableRows: ReactNode[][] = notices.map(notice => [
    <NoticeCell key={`id-${notice.id}`} to={`/notice/detail/${notice.id}`}>
      <Text $size="body2" $color={theme.color.grayScale[70]}>
        {String(notice.id)}
      </Text>
    </NoticeCell>,
    <NoticeCell key={`title-${notice.id}`} to={`/notice/detail/${notice.id}`}>
      <NoticeTitle title={notice.title} color={theme.color.grayScale[90]} />
    </NoticeCell>,
    <NoticeCell key={`date-${notice.id}`} to={`/notice/detail/${notice.id}`}>
      <Text $size="body2" $color={theme.color.grayScale[90]}>
        {formatNoticeDate(notice.created_at)}
      </Text>
    </NoticeCell>
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(tableRows.length / NOTICE_PAGE_SIZE)
  );
  const startIndex = (currentPage - 1) * NOTICE_PAGE_SIZE;
  const endIndex = startIndex + NOTICE_PAGE_SIZE;
  const paginatedRows = tableRows.slice(startIndex, endIndex);

  const syncedKeyword = useRef(searchKeyword);

  useEffect(() => {
    if (syncedKeyword.current === searchKeyword) return;
    syncedKeyword.current = searchKeyword;
    setLocalSearch(searchKeyword);
  }, [searchKeyword]);

  useEffect(() => {
    if (syncedKeyword.current === debouncedSearch) return;
    syncedKeyword.current = debouncedSearch;
    updateParams({ title: debouncedSearch || undefined, page: undefined });
  }, [debouncedSearch, updateParams]);
  useEffect(() => {
    if (isLoading || currentPage <= totalPages) return;
    updateParams({ page: undefined });
  }, [isLoading, currentPage, totalPages, updateParams]);

  return (
    <Container $padding={[68, 0, 112]} $maxWidth={NOTICE_TABLE_WIDTH}>
      <Flex $gap={46} $direction="column" $justify="center" $align="center">
        <Flex $direction="column" $gap={16}>
          <Text $size="h4" $weight="bold" $color={theme.color.grayScale[90]}>
            공지 사항
          </Text>

          <Flex $align="center" $justify="space-between">
            <Flex $align="center" $fit>
              <Search
                placeholder="공지사항을 입력해주세요"
                $width={359}
                value={localSearch}
                onChange={setLocalSearch}
              />
            </Flex>
            <Spacer />
            <Flex $align="center" $fit>
              <Button
                $variant="outline"
                $size="sm"
                onClick={() => navigate("/notice/write")}
              >
                공지 추가 +
              </Button>
            </Flex>
          </Flex>
        </Flex>

        {tableRows.length === 0 && !isLoading ? (
          <Box width={NOTICE_TABLE_WIDTH} $margin={[300, 0]}>
            <Text
              $size="h5"
              $weight="medium"
              $align="center"
              $color={theme.color.grayScale[60]}
            >
              {searchKeyword
                ? "검색 결과가 없습니다."
                : "등록된 공지사항이 없습니다."}
            </Text>
          </Box>
        ) : (
          <Flex $direction="column" $align="center" $gap={51}>
            {isLoading ? (
              <TableSkeleton
                columnWidths={NOTICE_COLUMN_WIDTHS}
                rows={SKELETON_ROW_COUNT}
              />
            ) : (
              <Table
                headers={[
                  "번호",
                  <NoticeTitle
                    title="제목"
                    color={theme.color.grayScale[60]}
                  />,
                  "작성일"
                ]}
                rows={paginatedRows}
                columnWidths={NOTICE_COLUMN_WIDTHS}
                rowHeight={NOTICE_ROW_HEIGHT}
                headerBorder={false}
                borderColor={theme.color.grayScale[40]}
              />
            )}

            <Pagination
              start={1}
              end={totalPages}
              current={currentPage}
              onChange={page => updateParams({ page })}
            />
          </Flex>
        )}
      </Flex>
    </Container>
  );
};
