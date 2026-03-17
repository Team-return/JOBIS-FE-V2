export interface Props {
  imgUrl: string;
  companyName: string;
  annualSales?: string;
  recruitmentStatus?: "모집전" | "모집중" | "모집 종료";
  onClick?: () => void;
}
