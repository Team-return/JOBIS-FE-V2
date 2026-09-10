import type {
  CreateNoticeRequest,
  UpdateNoticeRequest,
  NoticeDetailResponse,
  NoticeListQueryParams,
  NoticeListResponse
} from "./types";
import { createDomainApi } from "@/create-hook";
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

export const useNoticeList = createQueryHook<
  NoticeListQueryParams | undefined,
  NoticeListResponse
>({
  path: "/",
  queryKey: noticesKeys.noticeList
});
