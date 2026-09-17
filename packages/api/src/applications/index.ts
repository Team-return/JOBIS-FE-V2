import type {
  EmploymentCountResponse,
  PassResponse,
  CompanyApplicationResponse,
  StudentApplicationResponse,
  TeacherApplicationResponse,
  TeacherApplicationCountResponse,
  RejectionResponse,
  EmploymentResponse,
  CreateApplicationRequest
} from "./types";
import { createDomainApi } from "@/create-hook";
import { applicationsKeys } from "./keys";
import { query, type MutationOptions } from "@/QueryProvider";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/instance";

const DOMAIN = "/applications";
const { createQueryHook, createMutationHook, createIdMutationHook } =
  createDomainApi(DOMAIN);

export { applicationsKeys };

export const useEmploymentCount = createQueryHook<
  number,
  EmploymentCountResponse
>({
  path: year => `/employment/count/${year}`,
  queryKey: applicationsKeys.employmentCount
});

export const usePass = createQueryHook<number, PassResponse>({
  path: companyId => `/pass/${companyId}`,
  queryKey: applicationsKeys.pass
});

export const useCompanyApplications = createQueryHook<
  void,
  CompanyApplicationResponse
>({
  path: "/company",
  queryKey: applicationsKeys.companyApplications
});

export const useStudentApplications = createQueryHook<
  void,
  StudentApplicationResponse
>({
  path: "/students",
  queryKey: applicationsKeys.studentApplications
});

export const useTeacherApplications = createQueryHook<
  {
    application_status?: string;
    student_name?: string;
    recruitment_id?: number;
    winter_intern?: boolean;
    page?: number;
    year?: string;
  },
  TeacherApplicationResponse
>({
  path: "/",
  queryKey: applicationsKeys.teacherApplications
});

export const useTeacherApplicationCount = createQueryHook<
  {
    application_status?: string;
    student_name?: string;
  },
  TeacherApplicationCountResponse
>({
  path: "/teacher/count",
  queryKey: applicationsKeys.teacherApplicationCount
});

export const useDeleteApplication = (options?: MutationOptions<number, void>) =>
  useMutation<void, number, number>({
    mutationFn: id =>
      instance.delete(`${DOMAIN}/${id}`).then(({ data }) => data),
    ...options,
    onSuccess: async (...args) => {
      await query.invalidate(applicationsKeys.studentApplications());
      options?.onSuccess?.(...args);
    }
  });

export const useCreateApplication = (
  recruitmentId: number | string,
  options?: MutationOptions<CreateApplicationRequest, void>
) =>
  useMutation<void, number, CreateApplicationRequest>({
    mutationFn: request =>
      instance
        .post(`${DOMAIN}/${recruitmentId}`, request)
        .then(({ data }) => data),
    ...options,
    onSuccess: async (...args) => {
      await query.invalidate(applicationsKeys.studentApplications());
      options?.onSuccess?.(...args);
    }
  });

export const useUpdateApplicationStatus = createMutationHook<
  { applicationIds: number[]; status: string },
  void
>({
  path: "/status",
  method: "patch"
});

export const useUpdateTrainDate = createMutationHook<
  { applicationIds: number[]; startDate: string; endDate: string },
  void
>({
  path: "/train-date",
  method: "patch"
});

export const useRejectApplication = createIdMutationHook<
  {
    reason: string;
    rejectionAttachments: { url: string }[];
  },
  void
>({
  path: "/rejection",
  method: "patch"
});

export const useRejection = createQueryHook<number, RejectionResponse>({
  path: applicationId => `/rejection/${applicationId}`,
  queryKey: applicationsKeys.rejection
});

export const useReapply = createIdMutationHook<CreateApplicationRequest, void>({
  path: "",
  method: "put"
});

export const useApplicationCount = createQueryHook<
  {
    application_status?: string;
    student_name?: string;
    recruitment_id?: number;
    winter_intern?: boolean;
    year?: string;
  },
  { count: number }
>({
  path: "/count",
  queryKey: applicationsKeys.applicationCount
});

export const useDeleteApplications = createMutationHook<string, void>({
  path: "/",
  method: "delete"
});

export const useEmployment = createQueryHook<number, EmploymentResponse>({
  path: year => `/employment/${year}`,
  queryKey: applicationsKeys.employment
});

export const useTeacherApprove = createIdMutationHook<string[], void>({
  path: "/teacher",
  method: "post"
});
