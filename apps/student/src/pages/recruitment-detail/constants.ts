import type { UnapplicableReason } from "@jobis/api";

const UNAPPLICABLE_REASON_LABEL: Record<UnapplicableReason, string> = {
  ALREADY_APPLIED: "이미 지원한 모집의뢰서입니다",
  NOT_RECRUITING: "모집 중이 아닙니다",
  HAS_ACTIVE_APPLICATION: "진행 중인 다른 지원이 있습니다",
  GRADE_NOT_ELIGIBLE: "지원 가능한 학년이 아닙니다"
};

/** 상세 응답의 지원 불가 사유를 학생에게 보여 줄 문구로 바꾼다 */
export const getUnapplicableMessage = (reason: UnapplicableReason | null) =>
  (reason && UNAPPLICABLE_REASON_LABEL[reason]) ??
  "지원할 수 없는 모집의뢰서입니다";
