import type { Gender, PlatformType } from "@/enum";

export interface StudentMyResponse {
  student_name: string;
  student_gcn: string;
  department: string;
  profile_image_url: string;
}

export interface UpdateStudentProfileRequest {
  profile_image_url: string;
}

export interface StudentSignupRequest {
  email: string;
  password: string;
  grade: number;
  name: string;
  gender: Gender;
  class_room: number;
  number: number;
  profile_image_url?: string;
  platform_type: PlatformType;
  device_token?: string;
}

export interface StudentSignupResponse {
  access_token: string;
  access_expires_at: string;
  refresh_token: string;
  refresh_expires_at: string;
  authority: string;
  platform_type: string;
}
