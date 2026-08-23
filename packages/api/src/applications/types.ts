import type { AttachmentType, ApplicationStatus } from "@/enum";

export interface ApplicationAttachment {
  url: string;
  type: AttachmentType;
}

export interface CreateApplicationRequest {
  attachments: ApplicationAttachment[];
}

export interface EmploymentCountResponse {
  total_student_count: number;
  pass_count: number;
  approved_count: number;
}

export interface PassStudent {
  application_id: number;
  student_name: string;
  student_gcn: string;
}

export interface PassResponse {
  students: PassStudent[];
}

export interface CompanyApplicationAttachment {
  url: string;
  type: AttachmentType;
}

export interface CompanyApplication {
  application_id: number;
  student_number: string;
  student_name: string;
  profile_image_url: string;
  attachments: CompanyApplicationAttachment[];
  created_at: string;
}

export interface CompanyApplicationResponse {
  applications: CompanyApplication[];
  count: number;
}

export interface StudentApplication {
  application_id: number;
  recruitment_id: number;
  company: string;
  company_logo_url: string;
  attachments: CompanyApplicationAttachment[];
  application_status: ApplicationStatus;
  created_at: string;
}

export interface StudentApplicationResponse {
  applications: StudentApplication[];
  count: number;
}

export interface TeacherApplicationAttachment {
  url: string;
  type: AttachmentType;
}

export interface TeacherApplication {
  application_id: number;
  student_name: string;
  student_gcn: string;
  company_name: string;
  attachments: TeacherApplicationAttachment[];
  created_at: string;
  application_status: ApplicationStatus;
}

export interface TeacherApplicationResponse {
  applications: TeacherApplication[];
}

export interface TeacherApplicationCountResponse {
  total_page_count: number;
}

export interface RejectionResponse {
  rejection_reason: string;
  rejection_attachments: {
    attachment_url: string;
  }[];
}

export interface EmploymentClass {
  class_id: number;
  employment_rate_response_list: {
    id: number;
    company_name: string;
    logo_url: string;
  }[];
  total_students: number;
  passed_students: number;
}

export interface EmploymentResponse {
  classes: EmploymentClass[];
}
