import { DimensionValue, RadiusValue } from "@/utils";

export interface Props {
  src: string;
  alt: string;
  width?: DimensionValue;
  height?: DimensionValue;
  $radius?: RadiusValue;
  $fit?: "cover" | "contain";
}
