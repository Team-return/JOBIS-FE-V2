import type {
  CreateNoticeRequest,
  UpdateNoticeRequest,
  NoticeDetailResponse,
  NoticeListResponse
} from "./types";
import {
  createQueryHook,
  createMutationHook,
  createIdMutationHook
} from "@/create-hook";
import { noticesKeys } from "./keys";

const DOMAIN = "/notices";

export { noticesKeys };

export const useCreateNotice = createMutationHook<CreateNoticeRequest, void>({
  domain: DOMAIN,
  method: "post"
});

export const useUpdateNotice = createIdMutationHook<UpdateNoticeRequest, void>({
  domain: DOMAIN,
  method: "patch"
});

export const useDeleteNotice = createIdMutationHook<void, void>({
  domain: DOMAIN,
  method: "delete"
});

export const useNoticeDetail = createQueryHook<number, NoticeDetailResponse>({
  domain: noticeId => `${DOMAIN}/${noticeId}`,
  queryKey: noticesKeys.noticeDetail
});

export const useNoticeList = createQueryHook<void, NoticeListResponse>({
  domain: DOMAIN,
  queryKey: noticesKeys.noticeList
});
