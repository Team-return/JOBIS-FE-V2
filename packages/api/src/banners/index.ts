import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  CreateBannerRequest,
  BannerListResponse,
  TeacherBannerListResponse
} from "./types";
import type { QueryOptions, MutationOptions } from "@/QueryProvider";
import { instance } from "@/instance";

const DOMAIN = "/banners";

export const useCreateBanner = (
  request: CreateBannerRequest,
  options?: MutationOptions<void>
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.post(DOMAIN, request);
    },
    ...options
  });
};

export const useDeleteBanner = (
  bannerId: number,
  options?: MutationOptions<void>
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.delete(`${DOMAIN}/${bannerId}`);
    },
    ...options
  });
};

export const useBannerList = (options?: QueryOptions<BannerListResponse>) => {
  return useQuery({
    queryKey: ["banner-list"],
    queryFn: async () => {
      const { data } = await instance.get<BannerListResponse>(DOMAIN);
      return data;
    },
    ...options
  });
};

export const useTeacherBannerList = (
  isOpened?: boolean,
  options?: QueryOptions<TeacherBannerListResponse>
) => {
  return useQuery({
    queryKey: ["teacher-banner-list", isOpened],
    queryFn: async () => {
      const { data } = await instance.get<TeacherBannerListResponse>(
        `${DOMAIN}/teacher`,
        { params: { is_opended: isOpened } }
      );
      return data;
    },
    ...options
  });
};
