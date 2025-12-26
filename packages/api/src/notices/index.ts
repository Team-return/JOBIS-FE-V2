import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  CreateNoticeRequest,
  UpdateNoticeRequest,
  NoticeDetailResponse,
  NoticeListResponse
} from "./types";
import type { QueryOptions, MutationOptions } from "@/QueryProvider";
import { instance } from "@/instance";
import { noticesKeys } from "./keys";

const DOMAIN = "/notices";

export { noticesKeys };

export const useCreateNotice = (
  options?: MutationOptions<CreateNoticeRequest>
) => {
  return useMutation({
    mutationFn: async request => {
      await instance.post(DOMAIN, request);
    },
    ...options
  });
};

export const useUpdateNotice = (
  noticeId: number,
  options?: MutationOptions<UpdateNoticeRequest>
) => {
  return useMutation({
    mutationFn: async request => {
      await instance.patch(`${DOMAIN}/${noticeId}`, request);
    },
    ...options
  });
};

export const useDeleteNotice = (
  options?: MutationOptions<{ noticeId: number }>
) => {
  return useMutation({
    mutationFn: async ({ noticeId }) => {
      await instance.delete(`${DOMAIN}/${noticeId}`);
    },
    ...options
  });
};

export const useNoticeDetail = (
  noticeId: number,
  options?: QueryOptions<NoticeDetailResponse>
) => {
  return useQuery({
    queryKey: noticesKeys.noticeDetail(noticeId),
    queryFn: async () => {
      const { data } = await instance.get<NoticeDetailResponse>(
        `${DOMAIN}/${noticeId}`
      );
      return data;
    },
    ...options
  });
};

export const useNoticeList = (options?: QueryOptions<NoticeListResponse>) => {
  return useQuery({
    queryKey: noticesKeys.noticeList(),
    queryFn: async () => {
      const { data } = await instance.get<NoticeListResponse>(DOMAIN);
      return data;
    },
    ...options
  });
};
