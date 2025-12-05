import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  CreateNoticeRequest,
  UpdateNoticeRequest,
  NoticeDetailResponse,
  NoticeListResponse
} from "./types";
import type { QueryOptions, MutationOptions } from "@/QueryProvider";
import { instance } from "@/instance";

const DOMAIN = "/notices";

export const useCreateNotice = (
  request: CreateNoticeRequest,
  options?: MutationOptions<void>
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.post(DOMAIN, request);
    },
    ...options
  });
};

export const useUpdateNotice = (
  noticeId: number,
  request: UpdateNoticeRequest,
  options?: MutationOptions<void>
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/${noticeId}`, request);
    },
    ...options
  });
};

export const useDeleteNotice = (
  noticeId: number,
  options?: MutationOptions<void>
) => {
  return useMutation({
    mutationFn: async () => {
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
    queryKey: ["notice-detail", noticeId],
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
    queryKey: ["notice-list"],
    queryFn: async () => {
      const { data } = await instance.get<NoticeListResponse>(DOMAIN);
      return data;
    },
    ...options
  });
};
