// 디자인 시스템은 api 패키지 빌드 산출물에 의존하지 않도록 서버 상태 값을 직접 정의한다
export type ServerStatusType =
  | "REQUESTED"
  | "APPROVED"
  | "SEND"
  | "FAILED"
  | "PASS"
  | "REJECTED"
  | "FIELD_TRAIN"
  | "ACCEPTANCE"
  | "DOC_FAILED"
  | "PROCESSING";

export type StatusType =
  | "rejected"
  | "failed"
  | "approved"
  | "requested"
  | "pending"
  | "passed"
  | "internship"
  | "contract"
  | "applying";

export const SERVER_STATUS_MAP: Record<ServerStatusType, StatusType> = {
  REQUESTED: "requested",
  APPROVED: "approved",
  SEND: "applying",
  FAILED: "failed",
  PASS: "passed",
  REJECTED: "rejected",
  FIELD_TRAIN: "internship",
  ACCEPTANCE: "contract",
  DOC_FAILED: "failed",
  PROCESSING: "applying"
};

export interface Props {
  types: StatusType;
  imgUrl: string;
  companyName: string;
  date: string;
  onRetry?: () => void;
  onCancle?: () => void;
}
