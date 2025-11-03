export interface Props {
  label?: string;
  $checked?: boolean;
  onChange?: (value: boolean) => void;
  $labelColor?: string;
  $labelSize?: "body1" | "body2" | "body3" | "caption";
  $labelWeight?: "regular" | "bold";
}
