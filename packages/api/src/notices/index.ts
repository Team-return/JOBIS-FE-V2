import type {
  CreateNoticeRequest,
  UpdateNoticeRequest,
  NoticeDetailResponse,
  NoticeListResponse
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

/** 서버는 GET /notices?page=N 으로 공지를 12개씩 나눠 준다 */
export const NOTICE_LIST_PAGE_SIZE = 12;
const MAX_NOTICE_PAGES = 100;

// 전체 개수를 알려 주는 API가 없어, 12개 미만인 페이지가 나올 때까지 이어 받아 전체 목록을 만든다.
// 페이지 나누기·번호 매기기·검색은 화면에서 이 전체 목록으로 한다.
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
