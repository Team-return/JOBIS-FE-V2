import type { CompanyType, RecruitmentStatus } from "@jobis/api";

export const COMPANY_TYPE_LABEL: Record<CompanyType, string> = {
  LEAD: "선도기업",
  PARTICIPATING: "참여기업",
  MANUAL_ADD: "수동등록"
};

export const COMPANY_TYPE_OPTIONS = [
  { label: "선도기업", value: "LEAD" },
  { label: "참여기업", value: "PARTICIPATING" },
  { label: "수동등록", value: "MANUAL_ADD" }
];

export const RECRUITMENT_STATUS_LABEL: Record<RecruitmentStatus, string> = {
  REQUESTED: "접수완료",
  READY: "모집전",
  RECRUITING: "모집중",
  DONE: "모집종료",
  MANUAL_ADD: "수동등록",
  WIN_INTERN: "겨울인턴"
};

export const RECRUITMENT_STATE_OPTIONS = [
  { label: "모집중", value: "RECRUITING" },
  { label: "모집전", value: "READY" },
  { label: "모집종료", value: "DONE" },
  { label: "접수완료", value: "REQUESTED" },
  { label: "겨울인턴", value: "WIN_INTERN" }
];

export const REGION_OPTIONS = [
  { label: "대전", value: "대전" },
  { label: "서울", value: "서울" },
  { label: "부산", value: "부산" },
  { label: "광주", value: "광주" },
  { label: "대구", value: "대구" },
  { label: "인천", value: "인천" },
  { label: "경기", value: "경기" },
  { label: "강원", value: "강원" },
  { label: "충북", value: "충북" },
  { label: "충남", value: "충남" },
  { label: "전북", value: "전북" },
  { label: "전남", value: "전남" },
  { label: "경북", value: "경북" },
  { label: "경남", value: "경남" },
  { label: "제주", value: "제주" }
];

export const BUSINESS_AREA_OPTIONS = [
  { label: "소프트웨어 개발", value: "1" },
  { label: "웹 개발", value: "2" },
  { label: "모바일 앱 개발", value: "3" },
  { label: "게임 개발", value: "4" },
  { label: "AI/머신러닝", value: "5" },
  { label: "데이터 분석", value: "6" },
  { label: "보안", value: "7" },
  { label: "임베디드", value: "8" },
  { label: "기타", value: "9" }
];

const currentYear = new Date().getFullYear();
export const YEAR_OPTIONS = Array.from(
  { length: currentYear - 2024 + 1 },
  (_, i) => ({
    label: String(2024 + i),
    value: String(2024 + i)
  })
);

export const ID_REGEX = /^[A-Za-z]*$/;
export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

export const PAGE_SIZE = 5;
export const RECRUITMENT_PAGE_SIZE = 5;
export const ADMIN_ID_KEY = "admin_id";
