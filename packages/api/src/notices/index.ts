import type {
  CreateNoticeRequest,
  UpdateNoticeRequest,
  NoticeDetailResponse,
  NoticeListResponse,
  NoticePageQueryParams,
  NoticeCountResponse
} from "./types";
import { useQuery } from "@tanstack/react-query";
import { createDomainApi } from "@/create-hook";
import { instance } from "@/instance";
import { queryClient } from "@/query-client";
import type { QueryOptions } from "@/QueryProvider";
import { noticesKeys } from "./keys";

const DOMAIN = "/notices";
const { createQueryHook, createMutationHook, createIdMutationHook } =
  createDomainApi(DOMAIN);

export { noticesKeys };

export const useCreateNotice = createMutationHook<CreateNoticeRequest, void>({
  path: "/",
  method: "post"
});

export const useUpdateNotice = createIdMutationHook<UpdateNoticeRequest, void>({
  path: "/",
  method: "patch"
});

export const useDeleteNotice = createIdMutationHook<void, void>({
  path: "/",
  method: "delete"
});

export const useNoticeDetail = createQueryHook<number, NoticeDetailResponse>({
  path: noticeId => `/${noticeId}`,
  queryKey: noticesKeys.noticeDetail
});

/** 학생만 호출할 수 있다. 서버가 학생마다 한 번만 기록한다 */
export const useRecordNoticeView = createMutationHook<
  { noticeId: number },
  void
>({
  path: ({ noticeId }) => `/${noticeId}/views`,
  method: "post"
});

/** 서버는 GET /notices?page=N 으로 공지를 12개씩 나눠 준다 */
export const NOTICE_LIST_PAGE_SIZE = 12;

/** 한 페이지(12개)만 받는다. 전체 페이지 수는 useNoticeCount로 따로 받는다 */
export const useNoticePage = createQueryHook<
  NoticePageQueryParams,
  NoticeListResponse
>({
  path: "/",
  queryKey: noticesKeys.noticePage
});

export const useNoticeCount = createQueryHook<void, NoticeCountResponse>({
  path: "/count",
  queryKey: noticesKeys.noticeCount
});

// /count는 페이지 수만 주므로 마지막 페이지의 글 수를 더해 전체 공지 개수를 구한다
const fetchNoticeTotalCount = async (): Promise<number> => {
  const { data: count } = await instance.get<NoticeCountResponse>(
    `${DOMAIN}/count`
  );
  const lastPage = count.total_page_count;
  if (lastPage <= 0) return 0;

  const { data } = await instance.get<NoticeListResponse>(DOMAIN, {
    params: { page: lastPage }
  });
  return (lastPage - 1) * NOTICE_LIST_PAGE_SIZE + data.notices.length;
};

const noticeTotalCountQueryOptions = (options?: QueryOptions<number>) => ({
  queryKey: noticesKeys.noticeTotalCount(),
  queryFn: fetchNoticeTotalCount,
  ...options
});

/** 전체 공지 개수(글 수)를 돌려준다 */
export const useNoticeTotalCount = Object.assign(
  (options?: QueryOptions<number>) =>
    useQuery(noticeTotalCountQueryOptions(options)),
  {
    prefetch: async (options?: QueryOptions<number>) => {
      await queryClient.prefetchQuery(noticeTotalCountQueryOptions(options));
    }
  }
);

const MAX_NOTICE_PAGES = 100;

// 전체 공지 개수를 알려 주는 API가 없어(/count는 페이지 수만 준다), 12개 미만인 페이지가 나올 때까지
// 이어 받아 전체 목록을 만든다. 서버에 제목 검색이 없어 검색·전체 순번이 필요한 화면에서만 쓴다.
const fetchAllNotices = async (): Promise<NoticeListResponse> => {
  const notices: NoticeListResponse["notices"] = [];

  for (let page = 1; page <= MAX_NOTICE_PAGES; page++) {
    const { data } = await instance.get<NoticeListResponse>(DOMAIN, {
      params: { page }
    });
    notices.push(...data.notices);
    if (data.notices.length < NOTICE_LIST_PAGE_SIZE) return { notices };
  }

  // 끝 페이지를 찾지 못한 채 상한에 닿았다. 일부만 받은 목록을 전체처럼 보여 주지 않도록 실패로 처리한다
  throw new Error(
    `공지 목록이 ${MAX_NOTICE_PAGES}페이지를 넘어 끝까지 불러오지 못했습니다.`
  );
};

const noticeListQueryOptions = (
  options?: QueryOptions<NoticeListResponse>
) => ({
  queryKey: noticesKeys.noticeList(),
  queryFn: fetchAllNotices,
  ...options
});

export const useNoticeList = Object.assign(
  (options?: QueryOptions<NoticeListResponse>) =>
    useQuery(noticeListQueryOptions(options)),
  {
    prefetch: async (options?: QueryOptions<NoticeListResponse>) => {
      await queryClient.prefetchQuery(noticeListQueryOptions(options));
    }
  }
);
