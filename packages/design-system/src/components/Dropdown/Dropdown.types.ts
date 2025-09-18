export type DropdownOption = {
  label: string; // 화면에 보이는 텍스트
  value: string; // 선택 값
  disabled?: boolean; // 특정 옵션 비활성화 가능
};

export interface DropdownProps {
  $options: DropdownOption[]; // 드롭다운에 들어갈 옵션 리스트
  value?: string; // 현재 선택된 값 (controlled)
  $defaultValue?: string; // 기본 선택 값 (uncontrolled)
  onChange?: (value: string) => void; // 값 선택 시 콜백
  placeholder?: string; // 선택 안 했을 때 표시할 텍스트
  $disabled?: boolean; // 드롭다운 전체 비활성화
}
