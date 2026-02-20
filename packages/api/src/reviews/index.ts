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
import {
  createQueryHook,
  createMutationHook,
  createIdMutationHook
} from "@/create-hook";
import { reviewsKeys } from "./keys";

const DOMAIN = "/reviews";

export { reviewsKeys };

export const useReviewDetail = createQueryHook<string, ReviewDetailResponse>({
  domain: reviewId => `${DOMAIN}/${reviewId}`,
  queryKey: reviewsKeys.reviewDetail
});

export const useCreateReview = createMutationHook<CreateReviewRequest, void>({
  domain: DOMAIN,
  method: "post"
});

export const useReviewQuestions = createQueryHook<
  void,
  ReviewQuestionsResponse
>({
  domain: `${DOMAIN}/questions`,
  queryKey: reviewsKeys.reviewQuestions
});

export const useDeleteReview = createIdMutationHook<void, void>({
  domain: DOMAIN,
  method: "delete"
});

export const useReviewList = (params?: ReviewListQueryParams) => {
  return createQueryHook<ReviewListQueryParams, ReviewListResponse>({
    domain: DOMAIN,
    queryKey: () => reviewsKeys.reviewList(params)
  })(params);
};

export const useReviewCount = (params?: ReviewCountQueryParams) => {
  return createQueryHook<ReviewCountQueryParams, ReviewCountResponse>({
    domain: `${DOMAIN}/count`,
    queryKey: () => reviewsKeys.reviewCount(params)
  })(params);
};

export const useMyReviews = createQueryHook<void, MyReviewsResponse>({
  domain: `${DOMAIN}/my`,
  queryKey: reviewsKeys.myReviews
});
