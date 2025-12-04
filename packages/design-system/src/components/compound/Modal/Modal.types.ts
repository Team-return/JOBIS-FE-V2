export interface Props {
  title: string;
  content: string;
  onConfirm: () => void;
  onClose: () => void;
  disableBackdropClick?: boolean;
  disableEscapeKey?: boolean;
}
