import type { BannerType } from "@/enum";

export interface Banner {
  id: number;
  banner_url: string;
  banner_type: BannerType;
  detail_id: number;
}

export interface TeacherBanner extends Banner {
  start_date: string;
  end_date: string;
}

export interface CreateBannerRequest {
  banner_url: string;
  banner_type: BannerType;
  start_date: string;
  end_date: string;
  detail_id: number;
}

export interface BannerListResponse {
  banners: Banner[];
}

export interface TeacherBannerListResponse {
  banners: TeacherBanner[];
}
