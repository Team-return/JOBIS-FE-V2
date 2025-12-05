import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  EmploymentCountResponse,
  PassResponse,
  CompanyApplicationResponse,
  StudentApplicationResponse,
  TeacherApplicationResponse,
  TeacherApplicationCountResponse,
  RejectionResponse,
  EmploymentResponse
} from "./types";
import type { QueryOptions, MutationOptions } from "@/QueryProvider";
import { instance } from "@/instance";

const DOMAIN = "/applications";

export const useEmploymentCount = (
  options?: QueryOptions<EmploymentCountResponse>
) => {
  return useQuery({
    queryKey: ["employment-count"],
    queryFn: async () => {
      const { data } = await instance.get<EmploymentCountResponse>(
        `${DOMAIN}/employment/count`
      );
      return data;
    },
    ...options
  });
};

export const usePass = (
  companyId: number,
  options?: QueryOptions<PassResponse>
) => {
  return useQuery({
    queryKey: ["pass", companyId],
    queryFn: async () => {
      const { data } = await instance.get<PassResponse>(
        `${DOMAIN}/pass/${companyId}`
      );
      return data;
    },
    ...options
  });
};

export const useCompanyApplications = (
  options?: QueryOptions<CompanyApplicationResponse>
) => {
  return useQuery({
    queryKey: ["company-applications"],
    queryFn: async () => {
      const { data } = await instance.get<CompanyApplicationResponse>(
        `${DOMAIN}/company`
      );
      return data;
    },
    ...options
  });
};

export const useStudentApplications = (
  options?: QueryOptions<StudentApplicationResponse>
) => {
  return useQuery({
    queryKey: ["student-applications"],
    queryFn: async () => {
      const { data } = await instance.get<StudentApplicationResponse>(
        `${DOMAIN}/students`
      );
      return data;
    },
    ...options
  });
};

export const useTeacherApplications = (
  applicationStatus?: string,
  studentName?: string,
  recruitmentId?: number,
  winterIntern?: boolean,
  page?: number,
  year?: string,
  options?: QueryOptions<TeacherApplicationResponse>
) => {
  return useQuery({
    queryKey: [
      "teacher-applications",
      applicationStatus,
      studentName,
      recruitmentId,
      winterIntern,
      page,
      year
    ],
    queryFn: async () => {
      const { data } = await instance.get<TeacherApplicationResponse>(
        `${DOMAIN}`,
        {
          params: {
            application_status: applicationStatus,
            student_name: studentName,
            recruitment_id: recruitmentId,
            winter_intern: winterIntern,
            page,
            year
          }
        }
      );
      return data;
    },
    ...options
  });
};

export const useTeacherApplicationCount = (
  applicationStatus?: string,
  studentName?: string,
  options?: QueryOptions<TeacherApplicationCountResponse>
) => {
  return useQuery({
    queryKey: ["teacher-application-count", applicationStatus, studentName],
    queryFn: async () => {
      const { data } = await instance.get<TeacherApplicationCountResponse>(
        `${DOMAIN}/teacher/count`,
        {
          params: {
            application_status: applicationStatus,
            student_name: studentName
          }
        }
      );
      return data;
    },
    ...options
  });
};

export const useDeleteApplication = (
  applicationId: number,
  options?: MutationOptions<void>
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.delete(`${DOMAIN}/${applicationId}`);
    },
    ...options
  });
};

export const useCreateApplication = (
  recruitmentId: number,
  options?: MutationOptions<{ url: string; type: string }[]>
) => {
  return useMutation({
    mutationFn: async (attachments: { url: string; type: string }[]) => {
      await instance.post(`${DOMAIN}/${recruitmentId}`, { attachments });
    },
    ...options
  });
};

export const useUpdateApplicationStatus = (
  options?: MutationOptions<{
    applicationIds: number[];
    status: string;
  }>
) => {
  return useMutation({
    mutationFn: async ({
      applicationIds,
      status
    }: {
      applicationIds: number[];
      status: string;
    }) => {
      await instance.patch(`${DOMAIN}/status`, {
        application_ids: applicationIds,
        status
      });
    },
    ...options
  });
};

export const useUpdateTrainDate = (
  options?: MutationOptions<{
    applicationIds: number[];
    startDate: string;
    endDate: string;
  }>
) => {
  return useMutation({
    mutationFn: async ({
      applicationIds,
      startDate,
      endDate
    }: {
      applicationIds: number[];
      startDate: string;
      endDate: string;
    }) => {
      await instance.patch(`${DOMAIN}/train-date`, {
        application_ids: applicationIds,
        start_date: startDate,
        end_date: endDate
      });
    },
    ...options
  });
};

export const useRejectApplication = (
  applicationId: number,
  options?: MutationOptions<{
    reason: string;
    rejectionAttachments: { url: string }[];
  }>
) => {
  return useMutation({
    mutationFn: async ({
      reason,
      rejectionAttachments
    }: {
      reason: string;
      rejectionAttachments: { url: string }[];
    }) => {
      await instance.patch(`${DOMAIN}/rejection/${applicationId}`, {
        reason,
        rejection_attachments: rejectionAttachments
      });
    },
    ...options
  });
};

export const useRejection = (
  applicationId: number,
  options?: QueryOptions<RejectionResponse>
) => {
  return useQuery({
    queryKey: ["rejection", applicationId],
    queryFn: async () => {
      const { data } = await instance.get<RejectionResponse>(
        `${DOMAIN}/rejection/${applicationId}`
      );
      return data;
    },
    ...options
  });
};

export const useReapply = (
  applicationId: number,
  options?: MutationOptions<{ url: string; type: string }[]>
) => {
  return useMutation({
    mutationFn: async (attachments: { url: string; type: string }[]) => {
      await instance.put(`${DOMAIN}/${applicationId}`, { attachments });
    },
    ...options
  });
};

export const useApplicationCount = (
  applicationStatus?: string,
  studentName?: string,
  recruitmentId?: number,
  winterIntern?: boolean,
  year?: string,
  options?: QueryOptions<{ count: number }>
) => {
  return useQuery({
    queryKey: [
      "application-count",
      applicationStatus,
      studentName,
      recruitmentId,
      winterIntern,
      year
    ],
    queryFn: async () => {
      const { data } = await instance.get<{ count: number }>(
        `${DOMAIN}/count`,
        {
          params: {
            application_status: applicationStatus,
            student_name: studentName,
            recruitment_id: recruitmentId,
            winter_intern: winterIntern,
            year
          }
        }
      );
      return data;
    },
    ...options
  });
};

export const useDeleteApplications = (options?: MutationOptions<string>) => {
  return useMutation({
    mutationFn: async (applicationIds: string) => {
      await instance.delete(`${DOMAIN}`, {
        params: { application_ids: applicationIds }
      });
    },
    ...options
  });
};

export const useEmployment = (options?: QueryOptions<EmploymentResponse>) => {
  return useQuery({
    queryKey: ["employment"],
    queryFn: async () => {
      const { data } = await instance.get<EmploymentResponse>(
        `${DOMAIN}/employment`
      );
      return data;
    },
    ...options
  });
};

export const useTeacherApprove = (
  recruitmentId: number,
  options?: MutationOptions<string[]>
) => {
  return useMutation({
    mutationFn: async (studentGcns: string[]) => {
      await instance.post(`${DOMAIN}/teacher/${recruitmentId}`, {
        student_gcns: studentGcns
      });
    },
    ...options
  });
};
