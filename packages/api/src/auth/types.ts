export interface LoginRequest {
  business_number: string;
  auth_code: string;
}

export interface LoginResponse {
  access_token: string;
  access_expires_at: string;
  refresh_token: string;
  refresh_expires_at: string;
}
