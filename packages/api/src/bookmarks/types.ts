import { RecruitmentStatus } from "@/enum";

export interface Bookmark {
  company_logo_url: string;
  company_name: string;
  recruitment_id: number;
  created_at: string;
  bookmarked: boolean;
  status: RecruitmentStatus;
  hiring_job: string;
  military_support: boolean;
}

export interface BookmarksResponse {
  bookmarks: Bookmark[];
}
