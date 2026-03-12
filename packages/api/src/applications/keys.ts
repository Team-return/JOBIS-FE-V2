export const applicationsKeys = {
  employmentCount: () => ["employment-count"],
  pass: (companyId: number) => ["pass", companyId],
  companyApplications: () => ["company-applications"],
  studentApplications: () => ["student-applications"],
  teacherApplications: (params?: {
    application_status?: string;
    student_name?: string;
    recruitment_id?: number;
    winter_intern?: boolean;
    page?: number;
    year?: string;
  }) => ["teacher-applications", params],
  teacherApplicationCount: (params?: {
    application_status?: string;
    student_name?: string;
  }) => ["teacher-application-count", params],
  rejection: (applicationId: number) => ["rejection", applicationId],
  applicationCount: (params?: {
    application_status?: string;
    student_name?: string;
    recruitment_id?: number;
    winter_intern?: boolean;
    year?: string;
  }) => ["application-count", params],
  employment: () => ["employment"]
} as const;
