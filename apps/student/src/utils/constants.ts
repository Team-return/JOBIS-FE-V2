export const ID_REGEX = /^[A-Za-z]*$/;
export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@dsm.hs.kr$/;
export const VERIFYCODE_REGEX = /^[[0-9]{6}$/;
export const GRADE_REGEX = /^[1-3][1-4](0[1-9]|1[0-9])$/;

export const ADMIN_ID_KEY = "admin_id";

export const RECRUITMENT_STATE_OPTIONS = [
  { label: "모집전", value: "REQUESTED" },
  { label: "모집중", value: "RECRUITING" },
  { label: "모집 종료", value: "DONE" }
];

const RECRUITMENT_START_YEAR = 2024;
const currentYear = new Date().getFullYear();

export const YEAR_OPTIONS = Array.from(
  { length: currentYear - RECRUITMENT_START_YEAR + 1 },
  (_, index) => String(currentYear - index)
).map(year => ({ label: year, value: year }));

export const RECRUITMENT_SORT_OPTIONS = [
  { label: "기본순", value: "" },
  { label: "매출", value: "TAKE" },
  { label: "직원 ↓", value: "WORKERS_COUNT_DESC" },
  { label: "직원 ↑", value: "WORKERS_COUNT_ASC" },
  { label: "설립일 ↓", value: "FOUNDED_AT_DESC" },
  { label: "설립일 ↑", value: "FOUNDED_AT_ASC" }
];
