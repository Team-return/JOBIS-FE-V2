import type { DimensionValue } from "@/utils";

type Position = "static" | "relative" | "absolute" | "fixed" | "sticky";

export interface Props {
  $position?: Position;
  $top?: DimensionValue;
  $right?: DimensionValue;
  $bottom?: DimensionValue;
  $left?: DimensionValue;
}
