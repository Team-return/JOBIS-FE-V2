export interface Props {
  options: {
    label: string;
    value: string;
    checked?: boolean;
  }[];
  onChange?: (values: string[]) => boolean | void;
}
