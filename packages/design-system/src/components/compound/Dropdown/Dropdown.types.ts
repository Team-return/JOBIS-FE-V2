import type { DimensionValue } from "../../../utils/type";

export type DropdownOption = {
  label: string;
  value: string;
  suffixIcon?: "SortAsc" | "SortDesc";
};

export type PeriodValue = {
  startDate: Date | null;
  endDate: Date | null;
  isConstant: boolean;
};

type BaseProps = {
  $width?: DimensionValue;
  $isNoneBorder?: boolean;
  $defaultValue?: string;
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

export type PeriodDropdownProps = BaseProps & {
  value?: PeriodValue;
  onChange?: (value: PeriodValue) => void;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
};
