import type { ReactNode } from "react";

export type ParentProps<T extends object> = T & { children?: ReactNode };
export type TextProps<T extends object> = T & { children?: string };
export type PixelValue = number | `${number}px`;
export type DimensionValue = PixelValue | `${number}%`;
export type BorderValue =
  | `${PixelValue} ${"solid" | "dashed" | "dotted"} ${string}`
  | "none";
export type SpacingValue =
  | PixelValue
  | [PixelValue]
  | [PixelValue, PixelValue]
  | [PixelValue, PixelValue, PixelValue]
  | [PixelValue, PixelValue, PixelValue, PixelValue];
export type RadiusValue =
  | DimensionValue
  | [DimensionValue]
  | [DimensionValue, DimensionValue]
  | [DimensionValue, DimensionValue, DimensionValue]
  | [DimensionValue, DimensionValue, DimensionValue, DimensionValue];
