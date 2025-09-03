export interface Props {
  options: {
    label: string;
    value: string;
    checked?: boolean;
  }[];
  onChange?: (value: string | null) => boolean | void;
}
