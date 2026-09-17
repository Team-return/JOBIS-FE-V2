import { IconName } from "@/components/core/Icon/Icon.types";

export interface Props {
  $width?: string;
  $color?: string;
  icon: IconName;
  onClick?: () => void;
  children: string;
}
