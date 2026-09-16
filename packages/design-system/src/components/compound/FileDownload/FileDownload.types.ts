export interface Props {
  label: string;
  fileUrl: string;
  $done?: boolean;
  /** 넘기면 칩 안에 삭제용 X 버튼이 표시됩니다 */
  onRemove?: () => void;
}
