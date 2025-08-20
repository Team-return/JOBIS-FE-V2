import type { RadiusValue, SpacingValue, BorderValue } from "@/utils";

export interface Props {
  $shadow?: boolean;
  $radius?: RadiusValue;
  $bg?: string;
  $border?: BorderValue;
  $padding?: SpacingValue;
}
