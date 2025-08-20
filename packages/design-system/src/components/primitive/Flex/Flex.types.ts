import { PixelValue } from "@/utils";

export interface Props {
  $gap?: PixelValue;
  $direction?: "row" | "column" | "row-reverse" | "column-reverse";
  $align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  $justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  $wrap?: boolean;
  $inline?: boolean;
}
