import type { PixelValue } from "@/utils";

export interface Props {
  $columns?: string;
  $rows?: string;
  $gap?: PixelValue | [PixelValue, PixelValue];
}