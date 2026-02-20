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
  CompanyStudentList
} from "./types";
import {
  createQueryHook,
  createMutationHook,
  createIdMutationHook
} from "@/create-hook";
import { instance } from "@/instance";
import { useQuery } from "@tanstack/react-query";
import { companiesKeys } from "./keys";

const DOMAIN = "/companies";

export { companiesKeys };

export const useCompanyStudentList = (params?: CompanyStudentList) => {
  return createQueryHook<CompanyStudentList, CompanyStudentListResponse>({
    domain: `${DOMAIN}/student`,
    queryKey: () => companiesKeys.companyStudentList(params)
  })(params);
};

export const useCompanyStudentCount = createQueryHook<
  { name?: string },
  CompanyStudentCountResponse
>({
  domain: `${DOMAIN}/student/count`,
  queryKey: companiesKeys.companyStudentCount
});

export const useCompanyReviewList = createQueryHook<
  void,
  CompanyReviewListResponse
>({
  domain: `${DOMAIN}/review`,
  queryKey: companiesKeys.companyReviewList
});

export const useCompanyDetail = createQueryHook<number, CompanyDetailResponse>({
  domain: companyId => `${DOMAIN}/${companyId}`,
  queryKey: companiesKeys.companyDetail
});

export const useCompanyMy = createQueryHook<void, CompanyMyResponse>({
  domain: `${DOMAIN}/my`,
  queryKey: companiesKeys.companyMy
});

export const useUpdateCompany = createIdMutationHook<
  UpdateCompanyRequest,
  void
>({
  domain: DOMAIN,
  method: "patch"
});

export const useCreateCompany = createMutationHook<
  CreateCompanyRequest,
  CreateCompanyResponse
>({
  domain: DOMAIN,
  method: "post"
});

export const useCompanyExists = createQueryHook<string, CompanyExistsResponse>({
  domain: businessNumber => `${DOMAIN}/exists/${businessNumber}`,
  queryKey: companiesKeys.companyExists
});

export const useUpdateMou = createMutationHook<UpdateMouRequest, void>({
  domain: `${DOMAIN}/mou`,
  method: "patch"
});

export const useTeacherCompanyList = (
  page?: number,
  type?: string,
  name?: string,
  region?: string,
  businessArea?: number
) => {
  return createQueryHook<
    {
      page?: number;
      type?: string;
      name?: string;
      region?: string;
      business_area?: number;
    },
    TeacherCompanyListResponse
  >({
    domain: `${DOMAIN}/teacher`,
    queryKey: () =>
      companiesKeys.teacherCompanyList(page, type, name, region, businessArea)
  })({
    page,
    type,
    name,
    region,
    business_area: businessArea
  });
};

export const useTeacherCompanyCount = (
  page?: number,
  type?: string,
  name?: string,
  region?: string,
  businessArea?: number
) => {
  return createQueryHook<
    {
      page?: number;
      type?: string;
      name?: string;
      region?: string;
      business_area?: number;
    },
    TeacherCompanyCountResponse
  >({
    domain: `${DOMAIN}/teacher/count`,
    queryKey: () =>
      companiesKeys.teacherCompanyCount(page, type, name, region, businessArea)
  })({
    page,
    type,
    name,
    region,
    business_area: businessArea
  });
};

export const useEmploymentCompanyList = (
  page?: number,
  companyName?: string,
  companyType?: string,
  year?: number
) => {
  return createQueryHook<
    {
      page?: number;
      company_name?: string;
      company_type?: string;
      year?: number;
    },
    EmploymentCompanyListResponse
  >({
    domain: `${DOMAIN}/employment`,
    queryKey: () =>
      companiesKeys.employmentCompanyList(page, companyName, companyType, year)
  })({
    page,
    company_name: companyName,
    company_type: companyType,
    year
  });
};

export const useEmploymentCompanyCount = (
  companyName?: string,
  companyType?: string,
  year?: number
) => {
  return createQueryHook<
    { company_name?: string; company_type?: string; year?: number },
    EmploymentCompanyCountResponse
  >({
    domain: `${DOMAIN}/employment/count`,
    queryKey: () =>
      companiesKeys.employmentCompanyCount(companyName, companyType, year)
  })({
    company_name: companyName,
    company_type: companyType,
    year
  });
};

export const useUpdateCompanyType = createMutationHook<
  UpdateCompanyTypeRequest,
  void
>({
  domain: `${DOMAIN}/type`,
  method: "patch"
});

export const useCompanyCount = (
  type?: string,
  name?: string,
  region?: string,
  businessArea?: number
) => {
  return createQueryHook<
    {
      type?: string;
      name?: string;
      region?: string;
      business_area?: number;
    },
    CompanyCountResponse
  >({
    domain: `${DOMAIN}/count`,
    queryKey: () => companiesKeys.companyCount(type, name, region, businessArea)
  })({
    type,
    name,
    region,
    business_area: businessArea
  });
};

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
  domain: `${DOMAIN}/teacher`,
  method: "post"
});
