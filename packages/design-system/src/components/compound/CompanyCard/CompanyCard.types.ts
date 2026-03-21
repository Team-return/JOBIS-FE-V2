export interface Props {
  imgUrl: string;
  companyName: string;
  annualSales?: number;
  hasRecruitment: boolean;
  onClick?: () => void;
}
