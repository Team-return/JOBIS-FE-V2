import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  CreateBannerRequest,
  BannerListResponse,
  TeacherBannerListResponse
} from "./types";
import { instance } from "@/instance";

const DOMAIN = "/banners";

export const useCreateBanner = (request: CreateBannerRequest) => {
  return useMutation({
    mutationFn: async () => {
      await instance.post(DOMAIN, request);
    }
  });
};

export const useDeleteBanner = (bannerId: number) => {
  return useMutation({
    mutationFn: async () => {
      await instance.delete(`${DOMAIN}/${bannerId}`);
    }
  });
};

export const useBannerList = () => {
  return useQuery({
    queryKey: ["banner-list"],
    queryFn: async () => {
      const { data } = await instance.get<BannerListResponse>(DOMAIN);
      return data;
    }
  });
};

export const useTeacherBannerList = (isOpened?: boolean) => {
  return useQuery({
    queryKey: ["teacher-banner-list", isOpened],
    queryFn: async () => {
      const { data } = await instance.get<TeacherBannerListResponse>(
        `${DOMAIN}/teacher`,
        { params: { is_opended: isOpened } }
      );
      return data;
    }
  });
};
