import type {
  CreateBannerRequest,
  BannerListResponse,
  TeacherBannerListResponse
} from "./types";
import { createDomainApi } from "@/create-hook";
import { bannersKeys } from "./keys";

const DOMAIN = "/banners";
const { createQueryHook, createMutationHook } = createDomainApi(DOMAIN);

export { bannersKeys };

export const useCreateBanner = createMutationHook<CreateBannerRequest, void>({
  path: "/",
  method: "post"
});

export const useDeleteBanner = createMutationHook<{ bannerId: number }, void>({
  path: "/",
  method: "delete"
});

export const useBannerList = createQueryHook<void, BannerListResponse>({
  path: "/",
  queryKey: bannersKeys.bannerList
});

export const useTeacherBannerList = createQueryHook<
  { is_opened?: boolean },
  TeacherBannerListResponse
>({
  path: "/teacher",
  queryKey: params => bannersKeys.teacherBannerList(params?.is_opened)
});
