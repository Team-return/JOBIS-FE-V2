import type { AttachmentType } from "@/enum";

interface NoticeAttachment {
  url: string;
  type: AttachmentType;
}

export interface CreateNoticeRequest {
  title: string;
  content: string;
  attachments?: NoticeAttachment[];
}

export interface UpdateNoticeRequest {
  title?: string;
  content?: string;
}

export interface NoticeDetailResponse {
  title: string;
  content: string;
  created_at: string;
  attachments: NoticeAttachment[];
}

interface NoticeListItem {
  id: number;
  title: string;
  created_at: string;
}

export interface NoticeListQueryParams {
  page?: number;
}

export interface NoticeListResponse {
  notices: NoticeListItem[];
}
