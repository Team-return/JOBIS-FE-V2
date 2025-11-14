import * as icons from "../../../assets/icons";
import { Props, IconName } from "./Icon.types";

const WHITE_FILL_ICONS: readonly IconName[] = [
  "ToastError",
  "ToastWarning",
  "ToastSuccess",
  "ToastInfo",
  "Refresh"
] as const;

export const Icon = ({
  icon,
  size = 28,
  fillColor,
  strokeColor,
  ...props
}: Props) => {
  const SvgIcon = icons[icon];

  const defaultFillColor = WHITE_FILL_ICONS.includes(icon)
    ? fillColor || "#ffffff"
    : fillColor;

  const defaultStrokeColor =
    icon === "Refresh" ? strokeColor || "#000000" : strokeColor;

  return (
    <SvgIcon
      width={size}
      height={size}
      fill={defaultFillColor}
      stroke={defaultStrokeColor}
      aria-label={icon}
      role="img"
      {...props}
    />
  );
};
