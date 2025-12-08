import { useMutation, useQuery } from "@tanstack/react-query";
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
  CreateTeacherCompanyRequest
} from "./types";
import type { QueryOptions, MutationOptions } from "@/QueryProvider";
import { instance } from "@/instance";

const DOMAIN = "/companies";

export const useCompanyStudentList = (
  page?: number,
  name?: string,
  options?: QueryOptions<CompanyStudentListResponse>
) => {
  return useQuery({
    queryKey: ["company-student-list", page, name],
    queryFn: async () => {
      const { data } = await instance.get<CompanyStudentListResponse>(
        `${DOMAIN}/student`,
        { params: { page, name } }
      );
      return data;
    },
    ...options
  });
};

export const useCompanyStudentCount = (
  name?: string,
  options?: QueryOptions<CompanyStudentCountResponse>
) => {
  return useQuery({
    queryKey: ["company-student-count", name],
    queryFn: async () => {
      const { data } = await instance.get<CompanyStudentCountResponse>(
        `${DOMAIN}/student/count`,
        { params: { name } }
      );
      return data;
    },
    ...options
  });
};

export const useCompanyReviewList = (
  options?: QueryOptions<CompanyReviewListResponse>
) => {
  return useQuery({
    queryKey: ["company-review-list"],
    queryFn: async () => {
      const { data } = await instance.get<CompanyReviewListResponse>(
        `${DOMAIN}/review`
      );
      return data;
    },
    ...options
  });
};

export const useCompanyDetail = (
  companyId: number,
  options?: QueryOptions<CompanyDetailResponse>
) => {
  return useQuery({
    queryKey: ["company-detail", companyId],
    queryFn: async () => {
      const { data } = await instance.get<CompanyDetailResponse>(
        `${DOMAIN}/${companyId}`
      );
      return data;
    },
    ...options
  });
};

export const useCompanyMy = (options?: QueryOptions<CompanyMyResponse>) => {
  return useQuery({
    queryKey: ["company-my"],
    queryFn: async () => {
      const { data } = await instance.get<CompanyMyResponse>(`${DOMAIN}/my`);
      return data;
    },
    ...options
  });
};

export const useUpdateCompany = (
  companyId: number,
  options?: MutationOptions<UpdateCompanyRequest>
) => {
  return useMutation({
    mutationFn: async request => {
      await instance.patch(`${DOMAIN}/${companyId}`, request);
    },
    ...options
  });
};

export const useCreateCompany = (
  options?: MutationOptions<CreateCompanyRequest, CreateCompanyResponse>
) => {
  return useMutation({
    mutationFn: async request => {
      const { data } = await instance.post<CreateCompanyResponse>(
        DOMAIN,
        request
      );
      return data;
    },
    ...options
  });
};

export const useCompanyExists = (
  businessNumber: string,
  options?: QueryOptions<CompanyExistsResponse>
) => {
  return useQuery({
    queryKey: ["company-exists", businessNumber],
    queryFn: async () => {
      const { data } = await instance.get<CompanyExistsResponse>(
        `${DOMAIN}/exists/${businessNumber}`
      );
      return data;
    },
    ...options
  });
};

export const useUpdateMou = (options?: MutationOptions<UpdateMouRequest>) => {
  return useMutation({
    mutationFn: async request => {
      await instance.patch(`${DOMAIN}/mou`, request);
    },
    ...options
  });
};

export const useTeacherCompanyList = (
  page?: number,
  type?: string,
  name?: string,
  region?: string,
  businessArea?: number,
  options?: QueryOptions<TeacherCompanyListResponse>
) => {
  return useQuery({
    queryKey: ["teacher-company-list", page, type, name, region, businessArea],
    queryFn: async () => {
      const { data } = await instance.get<TeacherCompanyListResponse>(
        `${DOMAIN}/teacher`,
        { params: { page, type, name, region, business_area: businessArea } }
      );
      return data;
    },
    ...options
  });
};

export const useTeacherCompanyCount = (
  page?: number,
  type?: string,
  name?: string,
  region?: string,
  businessArea?: number,
  options?: QueryOptions<TeacherCompanyCountResponse>
) => {
  return useQuery({
    queryKey: ["teacher-company-count", page, type, name, region, businessArea],
    queryFn: async () => {
      const { data } = await instance.get<TeacherCompanyCountResponse>(
        `${DOMAIN}/teacher/count`,
        { params: { page, type, name, region, business_area: businessArea } }
      );
      return data;
    },
    ...options
  });
};

export const useEmploymentCompanyList = (
  page?: number,
  companyName?: string,
  companyType?: string,
  year?: number,
  options?: QueryOptions<EmploymentCompanyListResponse>
) => {
  return useQuery({
    queryKey: ["employment-company-list", page, companyName, companyType, year],
    queryFn: async () => {
      const { data } = await instance.get<EmploymentCompanyListResponse>(
        `${DOMAIN}/employment`,
        {
          params: {
            page,
            company_name: companyName,
            company_type: companyType,
            year
          }
        }
      );
      return data;
    },
    ...options
  });
};

export const useEmploymentCompanyCount = (
  companyName?: string,
  companyType?: string,
  year?: number,
  options?: QueryOptions<EmploymentCompanyCountResponse>
) => {
  return useQuery({
    queryKey: ["employment-company-count", companyName, companyType, year],
    queryFn: async () => {
      const { data } = await instance.get<EmploymentCompanyCountResponse>(
        `${DOMAIN}/employment/count`,
        {
          params: { company_name: companyName, company_type: companyType, year }
        }
      );
      return data;
    },
    ...options
  });
};

export const useUpdateCompanyType = (
  options?: MutationOptions<UpdateCompanyTypeRequest>
) => {
  return useMutation({
    mutationFn: async request => {
      await instance.patch(`${DOMAIN}/type`, request);
    },
    ...options
  });
};

export const useCompanyCount = (
  type?: string,
  name?: string,
  region?: string,
  businessArea?: number,
  options?: QueryOptions<CompanyCountResponse>
) => {
  return useQuery({
    queryKey: ["company-count", type, name, region, businessArea],
    queryFn: async () => {
      const { data } = await instance.get<CompanyCountResponse>(
        `${DOMAIN}/count`,
        {
          params: { type, name, region, business_area: businessArea }
        }
      );
      return data;
    },
    ...options
  });
};

export const useCompanyFileDownload = (options?: QueryOptions<Blob>) => {
  return useQuery({
    queryKey: ["company-file"],
    queryFn: async () => {
      const { data } = await instance.get<Blob>(`${DOMAIN}/file`, {
        responseType: "blob"
      });
      return data;
    },
    ...options
  });
};

export const useCreateTeacherCompany = (
  options?: MutationOptions<CreateTeacherCompanyRequest>
) => {
  return useMutation({
    mutationFn: async request => {
      await instance.post(`${DOMAIN}/teacher`, request);
    },
    ...options
  });
};
