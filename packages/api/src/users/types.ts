import type { Authority, PlatformType } from "@/enum";

export interface LoginRequest {
  account_id: string;
  password: string;
  platform_type: PlatformType;
}

export interface LoginResponse {
  access_token: string;
  access_expires_at: string;
  refresh_token: string;
  refresh_expires_at: string;
  authority: Authority;
}
