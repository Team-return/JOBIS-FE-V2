import type { SVGProps } from "react";
import * as icons from "../../../assets/icons";

export type IconName = keyof typeof icons;

export interface Props extends SVGProps<SVGSVGElement> {
  icon: IconName;
  size?: number;
  color?: string;
}
