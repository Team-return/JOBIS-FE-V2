import type { DimensionValue } from "@/utils/type";
import type { KeyboardEvent } from "react";

export interface Props {
  $label?: string;
  value?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  $width?: DimensionValue;
  $height?: DimensionValue;
  disabled?: boolean;
  $errorMessage?: string;
  rows?: number;
  maxLength?: number;
  $variant?: "filled" | "underline";
}
