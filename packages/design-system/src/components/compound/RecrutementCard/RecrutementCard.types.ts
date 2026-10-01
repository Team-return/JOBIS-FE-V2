export type RecruitmentCardStatus = "모집전" | "모집중" | "모집 종료";

export interface Props {
  hiringJobs: string;
  companyName: string;
  companyProfileUrl: string;
  militarySupport: boolean;
  bookmarked: boolean;
  /** 넘기면 병역특례 칩 앞에 모집 상태 칩을 보여 준다 */
  status?: RecruitmentCardStatus;
  onClick?: () => void;
}
