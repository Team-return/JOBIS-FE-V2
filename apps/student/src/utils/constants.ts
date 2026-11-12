import type {
  Department,
  InterviewType,
  RecruitmentSortType
} from "@jobis/api";

export const ID_REGEX = /^[A-Za-z]*$/;
export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@dsm.hs.kr$/;
export const VERIFYCODE_REGEX = /^[[0-9]{6}$/;
export const GRADE_REGEX = /^[1-3][1-4](0[1-9]|1[0-9])$/;

export const ADMIN_ID_KEY = "admin_id";

export const INTERVIEW_TYPE_LABEL_MAP: Record<InterviewType, string> = {
  DOCUMENT: "서류 전형",
  CODING_TEST: "코딩 테스트",
  LIVE_CODING: "라이브 코딩",
  TASK: "과제 전형",
  AI: "AI 면접",
  PERSONALITY: "인성 면접",
  TECH_INTERVIEW: "기술 면접",
  CULTURE_INTERVIEW: "컬처 면접",
  FINAL_INTERVIEW: "최종 면접"
};

export const DEPARTMENT_LABEL_MAP: Record<Department, string> = {
  SOFTWARE_DEVELOP: "소프트웨어 개발과",
  EMBEDDED_SOFTWARE: "임베디드 소프트웨어과",
  INFORMATION_SECURITY: "정보보안과",
  AI_SOFTWARE: "인공지능 소프트웨어과",
  COMMON: "공통과정"
};

/** 학생에게 보여 주는 모집 상태 라벨 (필터와 목록 카드가 같이 쓴다) */
export const RECRUITMENT_STATUS_LABEL = {
  REQUESTED: "모집전",
  RECRUITING: "모집중",
  DONE: "모집 종료"
} as const;

export const RECRUITMENT_STATE_OPTIONS = Object.entries(
  RECRUITMENT_STATUS_LABEL
).map(([value, label]) => ({ label, value }));

/** 위 라벨에 없는 상태(READY 등)는 카드에 상태 칩을 그리지 않도록 undefined를 돌려준다 */
export const getRecruitmentStatusLabel = (status: string) =>
  status in RECRUITMENT_STATUS_LABEL
    ? RECRUITMENT_STATUS_LABEL[status as keyof typeof RECRUITMENT_STATUS_LABEL]
    : undefined;

const RECRUITMENT_START_YEAR = 2024;
const currentYear = new Date().getFullYear();

export const YEAR_OPTIONS = Array.from(
  { length: currentYear - RECRUITMENT_START_YEAR + 1 },
  (_, index) => String(currentYear - index)
).map(year => ({ label: year, value: year }));

export const BUG_REPORT_AREA_OPTIONS = [
  { label: "Server", value: "SERVER" },
  { label: "WEB", value: "WEB" },
  { label: "iOS", value: "IOS" },
  { label: "Android", value: "ANDROID" }
];

/** 모집의뢰서 목록 정렬. 로더의 URL 검증과 정렬 드롭다운이 같이 쓴다 */
const RECRUITMENT_SORT_LABEL: Record<RecruitmentSortType, string> = {
  TAKE: "매출",
  WORKERS_COUNT_DESC: "직원 ↓",
  WORKERS_COUNT_ASC: "직원 ↑",
  DEADLINE_DESC: "공고마감 ↓",
  DEADLINE_ASC: "공고마감 ↑"
};

export const RECRUITMENT_SORT_TYPES = Object.keys(
  RECRUITMENT_SORT_LABEL
) as RecruitmentSortType[];

// 정렬을 고르지 않으면 서버가 등록순(최신순)으로 준다
export const RECRUITMENT_SORT_OPTIONS = [
  { label: "기본순", value: "" },
  ...RECRUITMENT_SORT_TYPES.map(value => ({
    label: RECRUITMENT_SORT_LABEL[value],
    value
  }))
];
