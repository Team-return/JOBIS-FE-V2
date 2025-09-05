export type ToastType = "success" | "error" | "warning" | "info";

export interface Props {
  $label: string;
  $type?: ToastType;
}
