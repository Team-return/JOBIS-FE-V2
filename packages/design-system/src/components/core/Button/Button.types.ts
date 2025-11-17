import { type ComponentPropsWithoutRef } from "react";

export const buttonVariants = ["contained", "outline"] as const;
export const buttonSizes = ["lg", "md", "sm"] as const;

export type ButtonVariant = (typeof buttonVariants)[number];
export type ButtonSize = (typeof buttonSizes)[number];

export interface Props
  extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $progressing?: boolean;
}
