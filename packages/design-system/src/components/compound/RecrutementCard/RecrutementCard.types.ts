export type RecruitmentCardStatus = "모집전" | "모집중" | "모집 종료";

export interface Props {
  hiringJobs: string;
  companyName: string;
  companyProfileUrl: string;
  militarySupport: boolean;
  bookmarked: boolean;
  /** 넘기면 병역특례 칩 앞에 모집 상태 칩을 보여 준다 */
  status?: RecruitmentCardStatus;
  /** true면 병역특례 칩 뒤에 겨울인턴 칩을 보여 준다 */
  winterIntern?: boolean;
  onClick?: () => void;
  /** 넘기면 북마크 아이콘을 눌렀을 때 카드 onClick 대신 이 함수만 호출한다 */
  onBookmarkClick?: () => void;
}
