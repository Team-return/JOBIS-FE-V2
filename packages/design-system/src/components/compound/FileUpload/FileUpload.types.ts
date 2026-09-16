import type { IconName } from "@/components/core/Icon/Icon.types";
import type { DimensionValue } from "@/utils/type";

export interface Props {
  label: string;
  onClick?: () => void;
  $width?: DimensionValue;
  $iconName?: IconName;
  disabled?: boolean;
}
