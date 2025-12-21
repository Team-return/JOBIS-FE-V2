export const applicationsKeys = {
  employmentCount: () => ["employment-count"],
  pass: (companyId: number) => ["pass", companyId],
  companyApplications: () => ["company-applications"],
  studentApplications: () => ["student-applications"],
  teacherApplications: (
    applicationStatus?: string,
    studentName?: string,
    recruitmentId?: number,
    winterIntern?: boolean,
    page?: number,
    year?: string
  ) => [
    "teacher-applications",
    applicationStatus,
    studentName,
    recruitmentId,
    winterIntern,
    page,
    year
  ],
  teacherApplicationCount: (
    applicationStatus?: string,
    studentName?: string
  ) => ["teacher-application-count", applicationStatus, studentName],
  rejection: (applicationId: number) => ["rejection", applicationId],
  applicationCount: (
    applicationStatus?: string,
    studentName?: string,
    recruitmentId?: number,
    winterIntern?: boolean,
    year?: string
  ) => [
    "application-count",
    applicationStatus,
    studentName,
    recruitmentId,
    winterIntern,
    year
  ],
  employment: () => ["employment"]
} as const;
