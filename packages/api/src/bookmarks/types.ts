export interface Bookmark {
  company_logo_url: string;
  company_name: string;
  recruitment_id: number;
  created_at: string;
}

export interface BookmarksResponse {
  bookmarks: Bookmark[];
}
