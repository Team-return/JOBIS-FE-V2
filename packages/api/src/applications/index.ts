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
import { instance } from "@/instance";

const DOMAIN = "/applications";

export const useEmploymentCount = () => {
  return useQuery({
    queryKey: ["employment-count"],
    queryFn: async () => {
      const { data } = await instance.get<EmploymentCountResponse>(
        `${DOMAIN}/employment/count`
      );
      return data;
    }
  });
};

export const usePass = (companyId: number) => {
  return useQuery({
    queryKey: ["pass", companyId],
    queryFn: async () => {
      const { data } = await instance.get<PassResponse>(
        `${DOMAIN}/pass/${companyId}`
      );
      return data;
    }
  });
};

export const useCompanyApplications = () => {
  return useQuery({
    queryKey: ["company-applications"],
    queryFn: async () => {
      const { data } = await instance.get<CompanyApplicationResponse>(
        `${DOMAIN}/company`
      );
      return data;
    }
  });
};

export const useStudentApplications = () => {
  return useQuery({
    queryKey: ["student-applications"],
    queryFn: async () => {
      const { data } = await instance.get<StudentApplicationResponse>(
        `${DOMAIN}/students`
      );
      return data;
    }
  });
};

export const useTeacherApplications = (
  applicationStatus?: string,
  studentName?: string,
  recruitmentId?: number,
  winterIntern?: boolean,
  page?: number,
  year?: string
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
    }
  });
};

export const useTeacherApplicationCount = (
  applicationStatus?: string,
  studentName?: string
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
    }
  });
};

export const useDeleteApplication = (applicationId: number) => {
  return useMutation({
    mutationFn: async () => {
      await instance.delete(`${DOMAIN}/${applicationId}`);
    }
  });
};

export const useCreateApplication = (recruitmentId: number) => {
  return useMutation({
    mutationFn: async (attachments: { url: string; type: string }[]) => {
      await instance.post(`${DOMAIN}/${recruitmentId}`, { attachments });
    }
  });
};

export const useUpdateApplicationStatus = () => {
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
    }
  });
};

export const useUpdateTrainDate = () => {
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
    }
  });
};

export const useRejectApplication = (applicationId: number) => {
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
    }
  });
};

export const useRejection = (applicationId: number) => {
  return useQuery({
    queryKey: ["rejection", applicationId],
    queryFn: async () => {
      const { data } = await instance.get<RejectionResponse>(
        `${DOMAIN}/rejection/${applicationId}`
      );
      return data;
    }
  });
};

export const useReapply = (applicationId: number) => {
  return useMutation({
    mutationFn: async (attachments: { url: string; type: string }[]) => {
      await instance.put(`${DOMAIN}/${applicationId}`, { attachments });
    }
  });
};

export const useApplicationCount = (
  applicationStatus?: string,
  studentName?: string,
  recruitmentId?: number,
  winterIntern?: boolean,
  year?: string
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
    }
  });
};

export const useDeleteApplications = () => {
  return useMutation({
    mutationFn: async (applicationIds: string) => {
      await instance.delete(`${DOMAIN}`, {
        params: { application_ids: applicationIds }
      });
    }
  });
};

export const useEmployment = () => {
  return useQuery({
    queryKey: ["employment"],
    queryFn: async () => {
      const { data } = await instance.get<EmploymentResponse>(
        `${DOMAIN}/employment`
      );
      return data;
    }
  });
};

export const useTeacherApprove = (recruitmentId: number) => {
  return useMutation({
    mutationFn: async (studentGcns: string[]) => {
      await instance.post(`${DOMAIN}/teacher/${recruitmentId}`, {
        student_gcns: studentGcns
      });
    }
  });
};
