import type { IconName } from "@/components/Icon/Icon.types";
import type { DimensionValue } from "@/utils/type";

export interface Props {
  $label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  $width?: DimensionValue;
  disabled?: boolean;
  $errorMessage?: string;
  $iconName?: IconName;
  onIconClick?: () => void;
}
