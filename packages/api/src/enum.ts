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

export type CompanyType = "LEAD" | "PARTICIPATING" | "DEFAULT";

export type FileType = "LOGO_IMAGE" | "EXTENSION_FILE";

export type JobType = "WEB" | "APP" | "EMBEDDED" | "SECURITY" | "AI" | "ASC";

export type RecruitmentStatus = "REQUESTED" | "READY" | "RECRUITING" | "DONE";

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
