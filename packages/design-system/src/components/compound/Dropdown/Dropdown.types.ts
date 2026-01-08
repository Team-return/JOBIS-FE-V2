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

type BaseProps = {
  $width?: DimensionValue;
  $placeholder?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  $color?: string;
};

type DefaultDropdownProps = BaseProps & {
  types?: undefined;
  value?: string;
  options: DropdownOption[];
  onChange?: (value: string) => void;
};

type SupportJobDropdownProps = BaseProps & {
  types: "supportJob";
  value?: string;
  options: DropdownOption[];
  onChange?: (value: string) => void;
};

export type Props = DefaultDropdownProps | SupportJobDropdownProps;

// PeriodDropdown 전용 Props
export type PeriodDropdownProps = BaseProps & {
  value?: PeriodValue;
  onChange?: (value: PeriodValue) => void;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
};
