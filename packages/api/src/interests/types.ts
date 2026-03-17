import { RecruitmentStatus } from "@/enum";

export interface Interest {
  id: number;
  company_name: string;
  company_profile_url: string;
  train_pay: number;
  military_support: boolean;
  hiring_jobs: string;
  bookmarked: boolean;
  status: RecruitmentStatus;
  year: number;
}

export interface InterestsResponse {
  recruitments: Interest[];
}
