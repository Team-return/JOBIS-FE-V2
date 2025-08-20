export interface Props {
  /**
   * 텍스트
   */
  text: string;
  /**
   * 색상 변형
   * @default 'default'
   */
  $variant?: "default" | "primary" | "secondary";
  /**
   * 클릭 핸들러
   */
  onClick?: () => void;
}
