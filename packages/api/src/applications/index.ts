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
import {
  createQueryHook,
  createMutationHook,
  createIdMutationHook
} from "@/create-hook";
import { applicationsKeys } from "./keys";

const DOMAIN = "/applications";

export { applicationsKeys };

export const useEmploymentCount = createQueryHook<
  void,
  EmploymentCountResponse
>({
  domain: `${DOMAIN}/employment/count`,
  queryKey: applicationsKeys.employmentCount
});

export const usePass = createQueryHook<number, PassResponse>({
  domain: companyId => `${DOMAIN}/pass/${companyId}`,
  queryKey: applicationsKeys.pass
});

export const useCompanyApplications = createQueryHook<
  void,
  CompanyApplicationResponse
>({
  domain: `${DOMAIN}/company`,
  queryKey: applicationsKeys.companyApplications
});

export const useStudentApplications = createQueryHook<
  void,
  StudentApplicationResponse
>({
  domain: `${DOMAIN}/students`,
  queryKey: applicationsKeys.studentApplications
});

export const useTeacherApplications = (
  applicationStatus?: string,
  studentName?: string,
  recruitmentId?: number,
  winterIntern?: boolean,
  page?: number,
  year?: string
) => {
  return createQueryHook<
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
    domain: DOMAIN,
    queryKey: () =>
      applicationsKeys.teacherApplications(
        applicationStatus,
        studentName,
        recruitmentId,
        winterIntern,
        page,
        year
      )
  })({
    application_status: applicationStatus,
    student_name: studentName,
    recruitment_id: recruitmentId,
    winter_intern: winterIntern,
    page,
    year
  });
};

export const useTeacherApplicationCount = (
  applicationStatus?: string,
  studentName?: string
) => {
  return createQueryHook<
    {
      application_status?: string;
      student_name?: string;
    },
    TeacherApplicationCountResponse
  >({
    domain: `${DOMAIN}/teacher/count`,
    queryKey: () =>
      applicationsKeys.teacherApplicationCount(applicationStatus, studentName)
  })({
    application_status: applicationStatus,
    student_name: studentName
  });
};

export const useDeleteApplication = createIdMutationHook<void, void>({
  domain: DOMAIN,
  method: "delete"
});

export const useCreateApplication = createIdMutationHook<
  { url: string; type: string }[],
  void
>({
  domain: DOMAIN,
  method: "post"
});

export const useUpdateApplicationStatus = createMutationHook<
  { applicationIds: number[]; status: string },
  void
>({
  domain: `${DOMAIN}/status`,
  method: "patch"
});

export const useUpdateTrainDate = createMutationHook<
  { applicationIds: number[]; startDate: string; endDate: string },
  void
>({
  domain: `${DOMAIN}/train-date`,
  method: "patch"
});

export const useRejectApplication = createIdMutationHook<
  {
    reason: string;
    rejectionAttachments: { url: string }[];
  },
  void
>({
  domain: `${DOMAIN}/rejection`,
  method: "patch"
});

export const useRejection = createQueryHook<number, RejectionResponse>({
  domain: applicationId => `${DOMAIN}/rejection/${applicationId}`,
  queryKey: applicationsKeys.rejection
});

export const useReapply = createIdMutationHook<
  { url: string; type: string }[],
  void
>({
  domain: DOMAIN,
  method: "put"
});

export const useApplicationCount = (
  applicationStatus?: string,
  studentName?: string,
  recruitmentId?: number,
  winterIntern?: boolean,
  year?: string
) => {
  return createQueryHook<
    {
      application_status?: string;
      student_name?: string;
      recruitment_id?: number;
      winter_intern?: boolean;
      year?: string;
    },
    { count: number }
  >({
    domain: `${DOMAIN}/count`,
    queryKey: () =>
      applicationsKeys.applicationCount(
        applicationStatus,
        studentName,
        recruitmentId,
        winterIntern,
        year
      )
  })({
    application_status: applicationStatus,
    student_name: studentName,
    recruitment_id: recruitmentId,
    winter_intern: winterIntern,
    year
  });
};

export const useDeleteApplications = createMutationHook<string, void>({
  domain: DOMAIN,
  method: "delete"
});

export const useEmployment = createQueryHook<void, EmploymentResponse>({
  domain: `${DOMAIN}/employment`,
  queryKey: applicationsKeys.employment
});

export const useTeacherApprove = createIdMutationHook<string[], void>({
  domain: `${DOMAIN}/teacher`,
  method: "post"
});
