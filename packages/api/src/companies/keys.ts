import { CompanyStudentList } from "./types";

export const companiesKeys = {
  companyStudentList: (params?: CompanyStudentList) => [
    "company-student-list",
    params
  ],
  companyStudentCount: (name?: string) => ["company-student-count", name],
  companyReviewList: () => ["company-review-list"],
  companyDetail: (companyId: number) => ["company-detail", companyId],
  companyMy: () => ["company-my"],
  companyExists: (businessNumber: string) => ["company-exists", businessNumber],
  teacherCompanyList: (
    page?: number,
    type?: string,
    name?: string,
    region?: string,
    businessArea?: number
  ) => ["teacher-company-list", page, type, name, region, businessArea],
  teacherCompanyCount: (
    page?: number,
    type?: string,
    name?: string,
    region?: string,
    businessArea?: number
  ) => ["teacher-company-count", page, type, name, region, businessArea],
  employmentCompanyList: (
    page?: number,
    companyName?: string,
    companyType?: string,
    year?: number
  ) => ["employment-company-list", page, companyName, companyType, year],
  employmentCompanyCount: (
    companyName?: string,
    companyType?: string,
    year?: number
  ) => ["employment-company-count", companyName, companyType, year],
  companyCount: (
    type?: string,
    name?: string,
    region?: string,
    businessArea?: number
  ) => ["company-count", type, name, region, businessArea],
  companyFileDownload: () => ["company-file"]
} as const;
