import type { NoticeListQueryParams } from "./types";

export const noticesKeys = {
  noticeDetail: (noticeId: number) => ["notice-detail", noticeId],
  noticeList: (params?: NoticeListQueryParams) => ["notice-list", params]
} as const;
