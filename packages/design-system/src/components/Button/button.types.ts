import { type ComponentPropsWithoutRef } from "react";

export const buttonVariants = ["contained", "outline"] as const;
export const buttonSizes = ["md", "lg"] as const;

export type ButtonVariant = (typeof buttonVariants)[number];
export type ButtonSize = (typeof buttonSizes)[number];

export interface ButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  children: string;
  $variant?: ButtonVariant;
  $buttonSize?: ButtonSize;
  $progressing?: boolean;
}
