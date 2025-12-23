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
import { reviewsKeys } from "./keys";

const DOMAIN = "/reviews";

export { reviewsKeys };

export const useReviewDetail = (
  reviewId: string,
  options?: QueryOptions<ReviewDetailResponse>
) => {
  return useQuery({
    queryKey: reviewsKeys.reviewDetail(reviewId),
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
  options?: MutationOptions<CreateReviewRequest>
) => {
  return useMutation({
    mutationFn: async request => {
      await instance.post(DOMAIN, request);
    },
    ...options
  });
};

export const useReviewQuestions = (
  options?: QueryOptions<ReviewQuestionsResponse>
) => {
  return useQuery({
    queryKey: reviewsKeys.reviewQuestions(),
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
  options?: MutationOptions<{ reviewId: string }>
) => {
  return useMutation({
    mutationFn: async ({ reviewId }) => {
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
    queryKey: reviewsKeys.reviewList(params),
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
    queryKey: reviewsKeys.reviewCount(params),
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
    queryKey: reviewsKeys.myReviews(),
    queryFn: async () => {
      const { data } = await instance.get<MyReviewsResponse>(`${DOMAIN}/my`);
      return data;
    },
    ...options
  });
};
