import type { ImgHTMLAttributes } from "react";
import * as icons from "../../../assets/icons";

export type IconName = keyof typeof icons;

export interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  icon: IconName;
  size?: number;
}
