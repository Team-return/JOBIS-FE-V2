import type { DimensionValue } from "@/utils/type";

export interface Props {
  value?: string;
  onChange?: (value: string) => void;
  $width?: DimensionValue;
  placeholder?: string;
  onIconClick?: () => void;
  IconColor?: string;
}
