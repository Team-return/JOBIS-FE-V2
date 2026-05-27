import { ApplicationStatus } from "./../../../../../api/dist/enum.d";

export type StatusType =
  | "rejected"
  | "failed"
  | "approved"
  | "requested"
  | "passed"
  | "internship"
  | "contract"
  | "applying";

export const SERVER_STATUS_MAP: Record<ApplicationStatus, StatusType> = {
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
