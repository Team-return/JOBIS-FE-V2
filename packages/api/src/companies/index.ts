import type {
  CompanyStudentListResponse,
  CompanyStudentCountResponse,
  CompanyReviewListResponse,
  CompanyDetailResponse,
  CompanyMyResponse,
  UpdateCompanyRequest,
  CreateCompanyRequest,
  CreateCompanyResponse,
  CompanyExistsResponse,
  UpdateMouRequest,
  TeacherCompanyListResponse,
  TeacherCompanyCountResponse,
  EmploymentCompanyListResponse,
  EmploymentCompanyCountResponse,
  UpdateCompanyTypeRequest,
  CompanyCountResponse,
  CreateTeacherCompanyRequest,
  CompanyStudentList,
  CompanyStudentRecentListResponse
} from "./types";
import { createDomainApi } from "@/create-hook";
import { instance } from "@/instance";
import { useQuery } from "@tanstack/react-query";
import { companiesKeys } from "./keys";

const DOMAIN = "/companies";
const { createQueryHook, createMutationHook, createIdMutationHook } =
  createDomainApi(DOMAIN);

export { companiesKeys };

export const useCompanyStudentList = createQueryHook<
  CompanyStudentList,
  CompanyStudentListResponse
>({
  path: "/student",
  queryKey: companiesKeys.companyStudentList
});

export const useCompanyStudentCount = createQueryHook<
  { name?: string },
  CompanyStudentCountResponse
>({
  path: "/student/count",
  queryKey: companiesKeys.companyStudentCount
});

export const useCompanyStudentRecentList = createQueryHook<
  void,
  CompanyStudentRecentListResponse
>({
  path: "/student/recent",
  queryKey: companiesKeys.companyStudentRecentList
});

export const useCompanyReviewList = createQueryHook<
  void,
  CompanyReviewListResponse
>({
  path: "/review",
  queryKey: companiesKeys.companyReviewList
});

export const useCompanyDetail = createQueryHook<number, CompanyDetailResponse>({
  path: companyId => `/${companyId}`,
  queryKey: companiesKeys.companyDetail
});

export const useCompanyMy = createQueryHook<void, CompanyMyResponse>({
  path: "/my",
  queryKey: companiesKeys.companyMy
});

export const useUpdateCompany = createIdMutationHook<
  UpdateCompanyRequest,
  void
>({
  path: "/",
  method: "patch"
});

export const useCreateCompany = createMutationHook<
  CreateCompanyRequest,
  CreateCompanyResponse
>({
  path: "/",
  method: "post"
});

export const useCompanyExists = createQueryHook<string, CompanyExistsResponse>({
  path: businessNumber => `/exists/${businessNumber}`,
  queryKey: companiesKeys.companyExists
});

export const useUpdateMou = createMutationHook<UpdateMouRequest, void>({
  path: "/mou",
  method: "patch"
});

export const useTeacherCompanyList = createQueryHook<
  {
    page?: number;
    type?: string;
    name?: string;
    region?: string;
    business_area?: number;
  },
  TeacherCompanyListResponse
>({
  path: "/teacher",
  queryKey: companiesKeys.teacherCompanyList
});

export const useTeacherCompanyCount = createQueryHook<
  {
    page?: number;
    type?: string;
    name?: string;
    region?: string;
    business_area?: number;
  },
  TeacherCompanyCountResponse
>({
  path: "/teacher/count",
  queryKey: companiesKeys.teacherCompanyCount
});

export const useEmploymentCompanyList = createQueryHook<
  {
    page?: number;
    company_name?: string;
    company_type?: string;
    year?: number;
  },
  EmploymentCompanyListResponse
>({
  path: "/employment",
  queryKey: companiesKeys.employmentCompanyList
});

export const useEmploymentCompanyCount = createQueryHook<
  { company_name?: string; company_type?: string; year?: number },
  EmploymentCompanyCountResponse
>({
  path: "/employment/count",
  queryKey: companiesKeys.employmentCompanyCount
});

export const useUpdateCompanyType = createMutationHook<
  UpdateCompanyTypeRequest,
  void
>({
  path: "/type",
  method: "patch"
});

export const useCompanyCount = createQueryHook<
  {
    type?: string;
    name?: string;
    region?: string;
    business_area?: number;
  },
  CompanyCountResponse
>({
  path: "/count",
  queryKey: companiesKeys.companyCount
});

export const useCompanyFileDownload = () => {
  return useQuery({
    queryKey: companiesKeys.companyFileDownload(),
    queryFn: async () => {
      const { data } = await instance.get<Blob>(`${DOMAIN}/file`, {
        responseType: "blob"
      });
      return data;
    }
  });
};

export const useCreateTeacherCompany = createMutationHook<
  CreateTeacherCompanyRequest,
  void
>({
  path: "/teacher",
  method: "post"
});
