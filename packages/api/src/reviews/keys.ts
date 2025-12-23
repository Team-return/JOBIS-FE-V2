import type { ReviewListQueryParams, ReviewCountQueryParams } from "./types";

export const reviewsKeys = {
  reviewDetail: (reviewId: string) => ["review-detail", reviewId],
  reviewQuestions: () => ["review-questions"],
  reviewList: (params?: ReviewListQueryParams) => ["review-list", params],
  reviewCount: (params?: ReviewCountQueryParams) => ["review-count", params],
  myReviews: () => ["my-reviews"]
} as const;
