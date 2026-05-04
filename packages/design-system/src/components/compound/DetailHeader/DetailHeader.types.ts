export interface DetailHeaderProps {
  type: "company" | "recruitment";
  title: string;
  logoUrl: string;
  businessNumber?: string;
  onMoreClick?: () => void;
}
