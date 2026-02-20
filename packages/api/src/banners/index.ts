import type {
  CreateBannerRequest,
  BannerListResponse,
  TeacherBannerListResponse
} from "./types";
import { createQueryHook, createMutationHook } from "@/create-hook";
import { bannersKeys } from "./keys";

const DOMAIN = "/banners";

export { bannersKeys };

export const useCreateBanner = createMutationHook<CreateBannerRequest, void>({
  domain: DOMAIN,
  method: "post"
});

export const useDeleteBanner = createMutationHook<{ bannerId: number }, void>({
  domain: DOMAIN,
  method: "delete"
});

export const useBannerList = createQueryHook<void, BannerListResponse>({
  domain: DOMAIN,
  queryKey: bannersKeys.bannerList
});

export const useTeacherBannerList = (isOpened?: boolean) => {
  return createQueryHook<{ is_opended?: boolean }, TeacherBannerListResponse>({
    domain: `${DOMAIN}/teacher`,
    queryKey: () => bannersKeys.teacherBannerList(isOpened)
  })({
    is_opended: isOpened
  });
};
