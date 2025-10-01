import type { DimensionValue } from "../../utils/type";

export type DropdownOption = {
  label: string;
  value: string;
};

export interface Props {
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  $width?: DimensionValue;
  $placeholder?: string;
}
