import type { SVGProps } from "react";
import * as icons from "../../../icons";

export type IconName = keyof typeof icons;

export interface Props extends SVGProps<SVGSVGElement> {
  icon: IconName;
  size?: number;
  strokeColor?: string;
  fillColor?: string;
}
