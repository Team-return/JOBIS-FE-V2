export const noticesKeys = {
  noticeDetail: (noticeId: number) => ["notice-detail", noticeId],
  noticeList: () => ["notice-list"]
} as const;
