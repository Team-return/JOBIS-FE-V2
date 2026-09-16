import type { IconName } from "@/components/core/Icon/Icon.types";
import type { DimensionValue } from "@/utils/type";
import type { KeyboardEvent } from "react";

export interface Props {
  $label?: string;
  value?: string;
  onChange?: (value: string) => void;
  onIconClick?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  $width?: DimensionValue;
  disabled?: boolean;
  $errorMessage?: string;
  $iconName?: IconName;
  type?: "text" | "password";
  autoComplete?:
    | "email"
    | "username"
    | "name"
    | "tel"
    | "address-line1"
    | "postal-code"
    | "current-password"
    | "new-password"
    | "off";
  fillColor?: string;
  maxLength?: number;
  $variant?: "filled" | "underline";
}
