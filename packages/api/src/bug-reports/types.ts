import type { Field } from "@/enum";

export interface CreateBugReportRequest {
  title: string;
  content: string;
  development_area: Exclude<Field, "ALL">;
  attachment_urls: string[];
}
