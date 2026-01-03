import type { DimensionValue } from "../../../utils/type";

export type DropdownOption = {
  label: string;
  value: string;
};

export interface Props {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  $width?: DimensionValue;
  $placeholder?: string;
  types?: "supportJob" | "period";
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}
