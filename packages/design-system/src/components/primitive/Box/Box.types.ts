import type {
  RadiusValue,
  BorderValue,
  DimensionValue,
  SpacingValue
} from "@/utils";

export interface Props {
  width?: DimensionValue;
  height?: DimensionValue;
  $padding?: SpacingValue;
  $margin?: SpacingValue;
  $bg?: string;
  $border?: BorderValue;
  $radius?: RadiusValue;
}
