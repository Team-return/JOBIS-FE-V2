import { CompanyStudentList } from "./types";

export const companiesKeys = {
  companyStudentList: (params?: CompanyStudentList) => [
    "company-student-list",
    params
  ],
  companyStudentCount: (params?: { name?: string }) => [
    "company-student-count",
    params
  ],
  companyReviewList: () => ["company-review-list"],
  companyDetail: (companyId: number) => ["company-detail", companyId],
  companyMy: () => ["company-my"],
  companyExists: (businessNumber: string) => ["company-exists", businessNumber],
  teacherCompanyList: (params?: {
    page?: number;
    type?: string;
    name?: string;
    region?: string;
    business_area?: number;
  }) => ["teacher-company-list", params],
  teacherCompanyCount: (params?: {
    page?: number;
    type?: string;
    name?: string;
    region?: string;
    business_area?: number;
  }) => ["teacher-company-count", params],
  employmentCompanyList: (params?: {
    page?: number;
    company_name?: string;
    company_type?: string;
    year?: number;
  }) => ["employment-company-list", params],
  employmentCompanyCount: (params?: {
    company_name?: string;
    company_type?: string;
    year?: number;
  }) => ["employment-company-count", params],
  companyCount: (params?: {
    type?: string;
    name?: string;
    region?: string;
    business_area?: number;
  }) => ["company-count", params],
  companyFileDownload: () => ["company-file"]
} as const;
