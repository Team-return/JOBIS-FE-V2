import { ListSortType } from "@/enum";

export interface CompanyStudent {
  id: number;
  name: string;
  logo_url: string;
  take: number;
  has_recruitment: boolean;
}

export interface CompanyStudentList {
  page?: number;
  name?: string;
  sortType?: ListSortType;
}

export interface CompanyStudentListResponse {
  companies: CompanyStudent[];
}

export interface CompanyStudentCountResponse {
  total_page_count: number;
}

export interface CompanyReview {
  id: number;
  name: string;
}

export interface CompanyReviewListResponse {
  companies: CompanyReview[];
}

export interface CompanyDetailResponse {
  business_number: string;
  company_name: string;
  company_profile_url: string;
  company_introduce: string;
  main_address: string;
  main_address_detail: string;
  main_zip_code: string;
  manager_name: string;
  email: string;
  representative_name: string;
  representative_phone_no: string;
  founded_at: string;
  worker_number: number;
  take: number;
  recruitment_id: number | null;
  attachments: string[];
  service_name: string;
  business_area_code: number;
  business_area: string;
  biz_registration_url: string;
  headquarter: boolean;
  manager_phone_no: string;
}

export interface CompanyMyResponse {
  company_id: number;
  name: string;
  biz_no: string;
  type: string;
  main_address: string;
  main_address_detail: string;
  main_zip_code: string;
  representative: string;
  representative_phone_no: string;
  attachment_urls: string[];
  founded_at: string;
  sales_per_year: number;
  workers_count: number;
  manager_name: string;
  email: string;
  company_introduce: string;
  company_logo_url: string;
  service_name: string;
  business_area: string;
  biz_registration_url: string;
  headquarter: boolean;
  manager_phone_no: string;
}

export interface UpdateCompanyRequest {
  main_zip_code?: string;
  main_address?: string;
  main_address_detail?: string;
  take?: number;
  worker_number?: number;
  company_introduce?: string;
  email?: string;
  manager_name?: string;
  company_profile_url?: string;
  service_name?: string;
  representative_phone_no?: string;
  biz_registration_url?: string;
  attachment_urls?: string[];
  headquarter?: boolean;
  manager_phone_no?: string;
}

export interface CreateCompanyRequest {
  name: string;
  founded_at: string;
  representative_name: string;
  representative_phone_no: string;
  main_zip_code: string;
  sub_zip_code?: string;
  main_address: string;
  main_address_detail?: string;
  sub_address?: string;
  sub_address_detail?: string;
  take: number;
  worker_number: number;
  company_introduce: string;
  email: string;
  manager_name: string;
  business_number: string;
  company_profile_url?: string;
  biz_registration_url?: string;
  business_area_code: number;
  service_name: string;
  headquarter: boolean;
  manager_phone_no: string;
  attachment_urls?: string[];
}

export interface CreateCompanyResponse {
  access_token: string;
  access_expires_at: string;
  refresh_token: string;
  refresh_expires_at: string;
  authority: string;
  platform_type: string;
}

export interface CompanyExistsResponse {
  company_name: string;
  exists: boolean;
}

export interface UpdateMouRequest {
  company_ids: number[];
}

export interface TeacherCompany {
  company_id: number;
  company_name: string;
  region: string;
  business_area: string;
  workers_count: number;
  take: number;
  company_type: string;
  convention: boolean;
  personal_contact: boolean;
  recent_recruit_year: number;
  total_acceptance_count: number;
  review_count: number;
}

export interface TeacherCompanyListResponse {
  companies: TeacherCompany[];
  total_page_count: number;
}

export interface TeacherCompanyCountResponse {
  total_page_count: number;
}

export interface EmploymentCompany {
  company_id: number;
  company_name: string;
  field_trainee_count: number;
  contract_count: number;
}

export interface EmploymentCompanyListResponse {
  companies: EmploymentCompany[];
}

export interface EmploymentCompanyCountResponse {
  total_page_count: number;
}

export interface UpdateCompanyTypeRequest {
  company_ids: number[];
  company_type: string;
}

export interface CompanyCountResponse {
  count: number;
}

export interface CreateTeacherCompanyRequest {
  company_name: string;
  business_number: string;
  company_profile_url?: string;
}
