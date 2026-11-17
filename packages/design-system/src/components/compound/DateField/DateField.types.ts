export interface Props {
  /** 입력칸 위에 보여 줄 이름. 접근성 이름으로도 쓴다 */
  label: string;
  value: Date | null;
  /** 다 입력했고 실제로 있는 날짜면 Date, 아니면 null로 알린다 */
  onChange: (value: Date | null) => void;
  disabled?: boolean;
  /** 달력을 입력칸 왼쪽·오른쪽 중 어디에 맞춰 띄울지 */
  calendarAlign?: "left" | "right";
}
