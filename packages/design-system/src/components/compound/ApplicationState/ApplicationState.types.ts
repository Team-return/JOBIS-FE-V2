export type StatusType =
  | "rejected"
  | "failed"
  | "approved"
  | "pending"
  | "passed"
  | "internship"
  | "contract"
  | "applying";

export interface Props {
  types: StatusType;
  imgUrl: string;
  companyName: string;
  date: string;
  onRetry?: () => void;
  onCancle?: () => void;
}
