export interface Props {
  imgUrl: string;
  companyName: string;
  annualSales: string;
  bookmark: boolean;
  onBookmarkClick?: () => void;
}
