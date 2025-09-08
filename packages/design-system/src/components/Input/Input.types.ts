export interface Props {
  $label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  $width?: string;
  disabled?: boolean;
  $isError?: boolean;
  $errorMessage?: string;
}
