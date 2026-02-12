export interface Props {
  hiringJobs: string;
  companyName: string;
  companyProfileUrl: string;
  militarySupport: boolean;
  recruitmentStatus: "모집전" | "모집중" | "모집 종료";
  bookmarked: boolean;
  onClick?: () => void;
}
