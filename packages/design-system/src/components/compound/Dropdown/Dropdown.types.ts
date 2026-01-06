import type { DimensionValue } from "../../../utils/type";

export type DropdownOption = {
  label: string;
  value: string;
};

export type PeriodValue = {
  startDate: Date | null;
  endDate: Date | null;
  isConstant: boolean;
};

export interface Props {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string | PeriodValue) => void;
  $width?: DimensionValue;
  $placeholder?: string;
  types?: "supportJob" | "period";
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  $color?: string;
}
