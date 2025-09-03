import { type ComponentPropsWithoutRef } from "react";

export const buttonVariants = ["contained", "outline"] as const;
export const buttonSizes = ["md", "lg"] as const;

export type ButtonVariant = (typeof buttonVariants)[number];
export type ButtonSize = (typeof buttonSizes)[number];

export interface Props
  extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  // children: string; << TextProps에서 확장하므로 제외
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $progressing?: boolean;
}
