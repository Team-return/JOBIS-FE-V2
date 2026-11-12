export interface DetailHeaderProps {
  type: "company" | "recruitment";
  title: string;
  logoUrl: string;
  businessNumber?: string;
  onMoreClick?: () => void;
  onViewReview?: () => void;
  onViewDetail?: () => void;
  onApply?: () => void;
  /** 넘기면 지원하기를 막고 옆에 이 사유를 보여 준다 */
  applyDisabledReason?: string;
}
