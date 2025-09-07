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
import { instance } from "@/instance";

const DOMAIN = "/reviews";

export const useReviewDetail = (reviewId: string) => {
  return useQuery({
    queryKey: ["review-detail", reviewId],
    queryFn: async () => {
      const { data } = await instance.get<ReviewDetailResponse>(
        `${DOMAIN}/${reviewId}`
      );
      return data;
    }
  });
};

export const useCreateReview = (request: CreateReviewRequest) => {
  return useMutation({
    mutationFn: async () => {
      await instance.post(DOMAIN, request);
    }
  });
};

export const useReviewQuestions = () => {
  return useQuery({
    queryKey: ["review-questions"],
    queryFn: async () => {
      const { data } = await instance.get<ReviewQuestionsResponse>(
        `${DOMAIN}/questions`
      );
      return data;
    }
  });
};

export const useDeleteReview = (reviewId: string) => {
  return useMutation({
    mutationFn: async () => {
      await instance.delete(`${DOMAIN}/${reviewId}`);
    }
  });
};

export const useReviewList = (params?: ReviewListQueryParams) => {
  return useQuery({
    queryKey: ["review-list", params],
    queryFn: async () => {
      const { data } = await instance.get<ReviewListResponse>(DOMAIN, {
        params
      });
      return data;
    }
  });
};

export const useReviewCount = (params?: ReviewCountQueryParams) => {
  return useQuery({
    queryKey: ["review-count", params],
    queryFn: async () => {
      const { data } = await instance.get<ReviewCountResponse>(
        `${DOMAIN}/count`,
        { params }
      );
      return data;
    }
  });
};

export const useMyReviews = () => {
  return useQuery({
    queryKey: ["my-reviews"],
    queryFn: async () => {
      const { data } = await instance.get<MyReviewsResponse>(`${DOMAIN}/my`);
      return data;
    }
  });
};
