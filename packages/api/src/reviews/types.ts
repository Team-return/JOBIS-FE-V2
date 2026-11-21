import type { InterviewType, InterviewLocation } from "@/enum";

export interface ReviewDetailResponse {
  review_id: number;
  company_name: string;
  writer: string;
  // 면접 날짜(yyyy-MM-dd)
  time: string;
  major: string;
  type: InterviewType;
  location: InterviewLocation;
  interviewer_count: number;
  qn_as: {
    id: number;
    question: string;
    answer: string;
  }[];
  question: string;
  answer: string;
}

export interface CreateReviewRequest {
  interview_type: InterviewType;
  location: InterviewLocation;
  company_id: number;
  job_code: number;
  interviewer_count: number;
  qnas: {
    question_id: number;
    answer: string;
  }[];
  question: string;
  answer: string;
}

export interface ReviewQuestion {
  id: number;
  question: string;
}

export interface ReviewQuestionsResponse {
  questions: ReviewQuestion[];
}

export interface ReviewListItem {
  review_id: number;
  company_name: string;
  company_logo_url: string;
  time: string;
  writer: string;
  major: string;
}

export interface ReviewListResponse {
  reviews: ReviewListItem[];
}

// 서버 @RequestParam 이름(type, years, code)을 그대로 쓴다
export interface ReviewListQueryParams {
  page?: number;
  location?: InterviewLocation;
  type?: InterviewType;
  company_id?: number;
  keyword?: string;
  years?: number;
  code?: number;
}

export interface ReviewCountResponse {
  total_page_count: number;
}

export interface ReviewCountQueryParams {
  location?: InterviewLocation;
  type?: InterviewType;
  company_id?: number;
  keyword?: string;
  years?: number;
  code?: number;
}

export interface MyReview {
  review_id: number;
  company_name: string;
}

export interface MyReviewsResponse {
  reviews: MyReview[];
}
