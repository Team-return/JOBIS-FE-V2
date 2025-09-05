export type ToastType = "success" | "error" | "warning" | "info";

import type { HTMLAttributes } from "react";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  label: string;
  $type?: ToastType;
}
