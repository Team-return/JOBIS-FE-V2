import type { NoticePageQueryParams } from "./types";

export const noticesKeys = {
  noticeDetail: (noticeId: number) => ["notice-detail", noticeId],
  noticeList: () => ["notice-list"],
  // 등록·수정·삭제 후 noticeList()로 무효화하면 함께 갱신되도록 같은 접두사를 쓴다
  noticePage: (params: NoticePageQueryParams) => ["notice-list", params],
  noticeCount: () => ["notice-list", "count"]
} as const;
