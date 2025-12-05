import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  ReviewDetailResponse,
  CreateReviewRequest,
  ReviewQuestionsResponse,
  ReviewListResponse,
  ReviewListQueryParams,
  ReviewCountResponse,
  ReviewCountQueryParams,
  MyReviewsResponse
} from "./types";
import type { QueryOptions, MutationOptions } from "@/QueryProvider";
import { instance } from "@/instance";

const DOMAIN = "/reviews";

export const useReviewDetail = (
  reviewId: string,
  options?: QueryOptions<ReviewDetailResponse>
) => {
  return useQuery({
    queryKey: ["review-detail", reviewId],
    queryFn: async () => {
      const { data } = await instance.get<ReviewDetailResponse>(
        `${DOMAIN}/${reviewId}`
      );
      return data;
    },
    ...options
  });
};

export const useCreateReview = (
  request: CreateReviewRequest,
  options?: MutationOptions<void>
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.post(DOMAIN, request);
    },
    ...options
  });
};

export const useReviewQuestions = (
  options?: QueryOptions<ReviewQuestionsResponse>
) => {
  return useQuery({
    queryKey: ["review-questions"],
    queryFn: async () => {
      const { data } = await instance.get<ReviewQuestionsResponse>(
        `${DOMAIN}/questions`
      );
      return data;
    },
    ...options
  });
};

export const useDeleteReview = (
  reviewId: string,
  options?: MutationOptions<void>
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.delete(`${DOMAIN}/${reviewId}`);
    },
    ...options
  });
};

export const useReviewList = (
  params?: ReviewListQueryParams,
  options?: QueryOptions<ReviewListResponse>
) => {
  return useQuery({
    queryKey: ["review-list", params],
    queryFn: async () => {
      const { data } = await instance.get<ReviewListResponse>(DOMAIN, {
        params
      });
      return data;
    },
    ...options
  });
};

export const useReviewCount = (
  params?: ReviewCountQueryParams,
  options?: QueryOptions<ReviewCountResponse>
) => {
  return useQuery({
    queryKey: ["review-count", params],
    queryFn: async () => {
      const { data } = await instance.get<ReviewCountResponse>(
        `${DOMAIN}/count`,
        { params }
      );
      return data;
    },
    ...options
  });
};

export const useMyReviews = (options?: QueryOptions<MyReviewsResponse>) => {
  return useQuery({
    queryKey: ["my-reviews"],
    queryFn: async () => {
      const { data } = await instance.get<MyReviewsResponse>(`${DOMAIN}/my`);
      return data;
    },
    ...options
  });
};
