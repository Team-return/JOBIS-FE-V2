import type { InterviewType } from "@/enum";

export interface StudentInterview {
  id: number;
  interview_type: InterviewType;
  start_date: string;
  end_date: string;
  interview_time: string;
  company_name: string;
  location: string;
  document_number_id: number | null;
  review_written: boolean;
}

export interface StudentInterviewsResponse {
  total_count: number;
  interviews: StudentInterview[];
}
