import type { JOBISTheme } from "@/themes";

export interface Props {
  $size: keyof JOBISTheme["font"];
  $weight?: keyof JOBISTheme["fontWeight"];
  $color?: string;
  $span?: boolean;
  $align?: "left" | "center" | "right" | "justify";
}
