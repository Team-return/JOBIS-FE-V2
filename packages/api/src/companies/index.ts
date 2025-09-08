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
import { instance } from "@/instance";

const DOMAIN = "/companies";

export const useCompanyStudentList = (page?: number, name?: string) => {
  return useQuery({
    queryKey: ["company-student-list", page, name],
    queryFn: async () => {
      const { data } = await instance.get<CompanyStudentListResponse>(
        `${DOMAIN}/student`,
        { params: { page, name } }
      );
      return data;
    }
  });
};

export const useCompanyStudentCount = (name?: string) => {
  return useQuery({
    queryKey: ["company-student-count", name],
    queryFn: async () => {
      const { data } = await instance.get<CompanyStudentCountResponse>(
        `${DOMAIN}/student/count`,
        { params: { name } }
      );
      return data;
    }
  });
};

export const useCompanyReviewList = () => {
  return useQuery({
    queryKey: ["company-review-list"],
    queryFn: async () => {
      const { data } = await instance.get<CompanyReviewListResponse>(
        `${DOMAIN}/review`
      );
      return data;
    }
  });
};

export const useCompanyDetail = (companyId: number) => {
  return useQuery({
    queryKey: ["company-detail", companyId],
    queryFn: async () => {
      const { data } = await instance.get<CompanyDetailResponse>(
        `${DOMAIN}/${companyId}`
      );
      return data;
    }
  });
};

export const useCompanyMy = () => {
  return useQuery({
    queryKey: ["company-my"],
    queryFn: async () => {
      const { data } = await instance.get<CompanyMyResponse>(`${DOMAIN}/my`);
      return data;
    }
  });
};

export const useUpdateCompany = (
  companyId: number,
  request: UpdateCompanyRequest
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/${companyId}`, request);
    }
  });
};

export const useCreateCompany = (request: CreateCompanyRequest) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await instance.post<CreateCompanyResponse>(
        DOMAIN,
        request
      );
      return data;
    }
  });
};

export const useCompanyExists = (businessNumber: string) => {
  return useQuery({
    queryKey: ["company-exists", businessNumber],
    queryFn: async () => {
      const { data } = await instance.get<CompanyExistsResponse>(
        `${DOMAIN}/exists/${businessNumber}`
      );
      return data;
    }
  });
};

export const useUpdateMou = (request: UpdateMouRequest) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/mou`, request);
    }
  });
};

export const useTeacherCompanyList = (
  page?: number,
  type?: string,
  name?: string,
  region?: string,
  businessArea?: number
) => {
  return useQuery({
    queryKey: ["teacher-company-list", page, type, name, region, businessArea],
    queryFn: async () => {
      const { data } = await instance.get<TeacherCompanyListResponse>(
        `${DOMAIN}/teacher`,
        { params: { page, type, name, region, business_area: businessArea } }
      );
      return data;
    }
  });
};

export const useTeacherCompanyCount = (
  page?: number,
  type?: string,
  name?: string,
  region?: string,
  businessArea?: number
) => {
  return useQuery({
    queryKey: ["teacher-company-count", page, type, name, region, businessArea],
    queryFn: async () => {
      const { data } = await instance.get<TeacherCompanyCountResponse>(
        `${DOMAIN}/teacher/count`,
        { params: { page, type, name, region, business_area: businessArea } }
      );
      return data;
    }
  });
};

export const useEmploymentCompanyList = (
  page?: number,
  companyName?: string,
  companyType?: string,
  year?: number
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
    }
  });
};

export const useEmploymentCompanyCount = (
  companyName?: string,
  companyType?: string,
  year?: number
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
    }
  });
};

export const useUpdateCompanyType = (request: UpdateCompanyTypeRequest) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/type`, request);
    }
  });
};

export const useCompanyCount = (
  type?: string,
  name?: string,
  region?: string,
  businessArea?: number
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
    }
  });
};

export const useCompanyFileDownload = () => {
  return useQuery({
    queryKey: ["company-file"],
    queryFn: async () => {
      const { data } = await instance.get<Blob>(`${DOMAIN}/file`, {
        responseType: "blob"
      });
      return data;
    }
  });
};

export const useCreateTeacherCompany = (
  request: CreateTeacherCompanyRequest
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.post(`${DOMAIN}/teacher`, request);
    }
  });
};
