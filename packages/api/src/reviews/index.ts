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
import { createDomainApi } from "@/create-hook";
import { reviewsKeys } from "./keys";

const DOMAIN = "/reviews";
const { createQueryHook, createMutationHook, createIdMutationHook } =
  createDomainApi(DOMAIN);

export { reviewsKeys };

export const useReviewDetail = createQueryHook<string, ReviewDetailResponse>({
  path: reviewId => `/${reviewId}`,
  queryKey: reviewsKeys.reviewDetail
});

export const useCreateReview = createMutationHook<CreateReviewRequest, void>({
  path: "/",
  method: "post"
});

export const useReviewQuestions = createQueryHook<
  void,
  ReviewQuestionsResponse
>({
  path: "/questions",
  queryKey: reviewsKeys.reviewQuestions
});

export const useDeleteReview = createIdMutationHook<void, void>({
  path: "/",
  method: "delete"
});

export const useReviewList = createQueryHook<
  ReviewListQueryParams,
  ReviewListResponse
>({
  path: "/",
  queryKey: reviewsKeys.reviewList
});

export const useReviewCount = createQueryHook<
  ReviewCountQueryParams,
  ReviewCountResponse
>({
  path: "/count",
  queryKey: reviewsKeys.reviewCount
});

export const useMyReviews = createQueryHook<void, MyReviewsResponse>({
  path: "/my",
  queryKey: reviewsKeys.myReviews
});
