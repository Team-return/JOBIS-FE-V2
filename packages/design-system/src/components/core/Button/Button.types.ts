import { type ComponentPropsWithoutRef } from "react";
import type { SpacingValue } from "@/utils";
import type { JOBISTheme } from "@/themes";

export const buttonVariants = ["contained", "outline"] as const;
export const buttonSizes = ["lg", "md", "sm"] as const;

export type ButtonVariant = (typeof buttonVariants)[number];
export type ButtonSize = (typeof buttonSizes)[number];

export interface Props
  extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $padding?: SpacingValue;
  $progressing?: boolean;
  $hoverDisabled?: boolean;
  /** 글자 크기·굵기. 기본은 body2·bold */
  $textSize?: keyof JOBISTheme["font"];
  $textWeight?: keyof JOBISTheme["fontWeight"];
}
