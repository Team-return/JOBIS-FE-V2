export interface Props {
  start: number;
  end: number;
  current: number;
  onChange: (value: number) => void;
}
