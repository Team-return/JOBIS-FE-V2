export type InterviewType =
  | "CULTURE_INTERVIEW"
  | "DOCUMENT"
  | "TASK"
  | "LIVE_CODING"
  | "TECH_INTERVIEW"
  | "FINAL_INTERVIEW"
  | "PERSONALITY"
  | "AI"
  | "CODING_TEST";

export type CompanyType = "LEAD" | "PARTICIPATING" | "MANUAL_ADD";

export type FileType = "LOGO_IMAGE" | "EXTENSION_FILE";

export type JobType =
  | "WEB"
  | "APP"
  | "EMBEDDED"
  | "SECURITY"
  | "AI"
  | "ASD"
  | "ETC";

export type RecruitmentStatus =
  | "REQUESTED"
  | "READY"
  | "RECRUITING"
  | "DONE"
  | "MANUAL_ADD"
  | "WIN_INTERN";

export type ApplicationStatus =
  | "REQUESTED"
  | "APPROVED"
  | "SEND"
  | "FAILED"
  | "PASS"
  | "REJECTED"
  | "FIELD_TRAIN"
  | "ACCEPTANCE"
  | "DOC_FAILED"
  | "PROCESSING";

export type Gender = "MAN" | "WOMAN";

export type Department =
  | "SOFTWARE_DEVELOP"
  | "EMBEDDED_SOFTWARE"
  | "INFORMATION_SECURITY"
  | "AI_SOFTWARE"
  | "COMMON";

export type AttachmentType = "FILE" | "URL";

export type Field = "ALL" | "SERVER" | "WEB" | "ANDROID" | "IOS";

export type Authority = "USER" | "TEACHER" | "COMPANY" | "DEVELOPER";

export type PlatformType = "WEB" | "ANDROID" | "IOS";

export type BannerType =
  | "RECRUITMENT"
  | "BOOKMARK"
  | "NONE"
  | "COMPANY"
  | "EMPLOYMENT";

export type NotificationTopic =
  | "APPLICATION"
  | "RECRUITMENT"
  | "NOTICE"
  | "WINTER_INTERN";

export type InterviewMethod = "INDIVIDUAL" | "GROUP" | "OTHER";

export type InterviewLocation = "DAEJEON" | "SEOUL" | "GYEONGGI" | "OTHER";

export type ListSortType =
  | "WORKERS_COUNT_ASC"
  | "WORKERS_COUNT_DESC"
  | "FOUNDED_AT_ASC"
  | "FOUNDED_AT_DESC"
  | "TAKE";
