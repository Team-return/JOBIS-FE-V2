import type { ReactNode } from "react";

export interface Props {
  title: string;
  content: string;
  onConfirm: () => void;
  onClose: () => void;
  /** 본문 아래, 버튼 위에 둘 입력 영역 (사유 입력 등) */
  children?: ReactNode;
  confirmDisabled?: boolean;
  disableBackdropClick?: boolean;
  disableEscapeKey?: boolean;
}
