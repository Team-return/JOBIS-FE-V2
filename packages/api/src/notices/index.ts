import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  CreateNoticeRequest,
  UpdateNoticeRequest,
  NoticeDetailResponse,
  NoticeListResponse
} from "./types";
import { instance } from "@/instance";

const DOMAIN = "/notices";

export const useCreateNotice = (request: CreateNoticeRequest) => {
  return useMutation({
    mutationFn: async () => {
      await instance.post(DOMAIN, request);
    }
  });
};

export const useUpdateNotice = (
  noticeId: number,
  request: UpdateNoticeRequest
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/${noticeId}`, request);
    }
  });
};

export const useDeleteNotice = (noticeId: number) => {
  return useMutation({
    mutationFn: async () => {
      await instance.delete(`${DOMAIN}/${noticeId}`);
    }
  });
};

export const useNoticeDetail = (noticeId: number) => {
  return useQuery({
    queryKey: ["notice-detail", noticeId],
    queryFn: async () => {
      const { data } = await instance.get<NoticeDetailResponse>(
        `${DOMAIN}/${noticeId}`
      );
      return data;
    }
  });
};

export const useNoticeList = () => {
  return useQuery({
    queryKey: ["notice-list"],
    queryFn: async () => {
      const { data } = await instance.get<NoticeListResponse>(DOMAIN);
      return data;
    }
  });
};
