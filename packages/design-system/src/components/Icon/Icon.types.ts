import type { ImgHTMLAttributes } from "react";
import * as icons from "../../../assets/icons";

export type IconName = keyof typeof icons;

export interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * 아이콘 이름
   */
  icon: IconName;
  /**
   * 아이콘 크기
   * @default 28
   */
  size?: number;
}
