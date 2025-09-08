import type {
  InterviewType,
  JobType,
  RecruitmentStatus,
  CompanyType
} from "@/enum";

interface RecruitmentArea {
  job_codes: number[];
  tech_codes?: number[];
  hiring: number;
  major_task: string;
  preferential_treatment: string;
}

export interface CreateRecruitmentRequest {
  areas: RecruitmentArea[];
  required_licenses?: string[];
  additional_qualifications?: string;
  working_hours: string;
  flexible_working: boolean;
  train_pay: number;
  pay?: string;
  benefits?: string;
  military_support: boolean;
  hiring_progress: InterviewType[];
  submit_document: string;
  start_date: string;
  end_date: string;
  etc?: string;
  winter_intern: boolean;
  hire_convertible?: boolean;
  integration_plan?: boolean;
}

export interface UpdateRecruitmentRequest {
  required_licenses?: string[];
  additional_qualifications?: string;
  working_hours: string;
  flexible_working: boolean;
  train_pay: number;
  pay?: string;
  benefits?: string;
  military_support: boolean;
  hiring_progress: InterviewType[];
  submit_document: string;
  start_date: string;
  end_date: string;
  etc?: string;
  hire_convertible?: boolean;
  integration_plan?: boolean;
}

export interface UpdateRecruitmentAreaRequest {
  job_codes: number[];
  tech_codes: number[];
  hiring: number;
  major_task: string;
  preferential_treatment?: string;
}

export interface CreateRecruitmentAreaRequest {
  job_codes: number[];
  tech_codes: number[];
  hiring: number;
  major_task: string;
  preferential_treatment?: string;
}

export interface UpdateRecruitmentStatusRequest {
  status: RecruitmentStatus;
  recruitment_ids: number[];
}

export interface StudentRecruitmentListQueryParams {
  page?: number;
  name?: string;
  job_code?: number;
  tech_code?: string;
  winter_intern?: boolean;
  military_support?: boolean;
}

interface StudentRecruitment {
  id: number;
  company_name: string;
  company_profile_url: string;
  train_pay: number;
  military_support: boolean;
  hiring_jobs: string;
  bookmarked: boolean;
}

export interface StudentRecruitmentListResponse {
  recruitments: StudentRecruitment[];
}

export interface RecruitmentCountQueryParams {
  company_name?: string;
  job_code?: number;
  tech_code?: string;
  start?: string;
  end?: string;
  status?: RecruitmentStatus;
  year?: number;
  winter_intern?: boolean;
  military_support?: boolean;
}

export interface StudentRecruitmentCountResponse {
  total_page_count: number;
}

export interface RecruitmentCountResponse {
  count: number;
}

interface RecruitmentDetailAreaJob {
  id: number;
  name: JobType;
}

interface RecruitmentDetailAreaTech {
  id: number;
  name: string;
}

interface RecruitmentDetailArea {
  id: number;
  job: RecruitmentDetailAreaJob[];
  tech: RecruitmentDetailAreaTech[];
  hiring: number;
  major_task: string;
  preferential_treatment: string;
}

export interface RecruitmentDetailResponse {
  recruitment_id: number;
  company_id: number;
  company_profile_url: string;
  company_name: string;
  areas: RecruitmentDetailArea[];
  additional_qualifications?: string;
  working_hours: string;
  flexible_working: boolean;
  required_licenses: string[];
  hiring_progress: InterviewType[];
  train_pay: number;
  pay: string;
  benefits: string;
  military_support: boolean;
  submit_document: string;
  start_date: string;
  end_date: string;
  etc: string;
  is_applicable: boolean;
  bookmarked: boolean;
  hire_convertible?: boolean;
  winter_intern: boolean;
  integration_plan: boolean;
}

export interface TeacherRecruitmentListQueryParams {
  page?: number;
  company_name?: string;
  job_code?: number;
  tech_code?: string;
  start?: string;
  end?: string;
  status?: RecruitmentStatus;
  year?: number;
  winter_intern?: boolean;
  military_support?: boolean;
}

export interface TeacherRecruitmentCountQueryParams {
  company_name?: string;
  start?: string;
  end?: string;
  status?: RecruitmentStatus;
  year?: number;
  winter_intern?: boolean;
}

export interface TeacherRecruitment {
  id: number;
  status: RecruitmentStatus;
  company_name: string;
  company_type: CompanyType;
  hiring_jobs: string;
  total_hiring_count: number;
  application_requested_count: number;
  application_approved_count: number;
  start_date: string;
  end_date: string;
  company_id: number;
}

export interface TeacherRecruitmentListResponse {
  recruitments: TeacherRecruitment[];
}

export interface TeacherRecruitmentCountResponse {
  total_page_count: number;
}

export interface TeacherRecruitmentNoPageQueryParams {
  job_code?: number;
  tech_code?: string;
  winter_intern?: boolean;
  military_support?: boolean;
}

interface MyRecruitment {
  id: number;
  recruitment_areas: {
    jobs: string[];
    hiring: number;
  };
  created_at: string;
}

export interface MyRecruitmentsResponse {
  my_recruitments: MyRecruitment[];
}

interface MyRecentRecruitmentArea {
  id: number;
  job: string[];
  tech: string[];
  hiring: number;
  major_task: string;
  preferential_treatment: string;
}

export interface MyRecentRecruitmentResponse {
  recruitment_id: number;
  recruit_year: number;
  areas: MyRecentRecruitmentArea[];
  additional_qualifications: string;
  required_licenses: string[];
  start_time: string;
  end_time: string;
  train_pay: number;
  pay: string;
  benefits: string;
  military_support: boolean;
  hiringin_progress: InterviewType[];
  start_date: string;
  end_date: string;
  etc: string;
  company_biz_no: string;
}

export type RecruitmentFileResponse = Blob;

export interface RecruitmentExistsResponse {
  winter_intern: boolean;
  experiential: boolean;
}

interface ManualRecruitment {
  id: number;
  company_name: string;
  company_logo_url: string;
}

export interface TeacherManualRecruitmentListResponse {
  recruitments: ManualRecruitment[];
}
