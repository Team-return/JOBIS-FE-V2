import * as icons from "../../../icons";
import { Props, IconName } from "./Icon.types";
import { useTheme } from "@/hooks";

const WHITE_FILL_ICONS: readonly IconName[] = [
  "ToastError",
  "ToastWarning",
  "ToastSuccess",
  "ToastInfo",
  "Refresh"
] as const;

export const Icon = ({
  icon,
  size,
  width = 20,
  height = 20,
  fillColor,
  strokeColor,
  ...props
}: Props) => {
  const { currentTheme } = useTheme();
  const SvgIcon = icons[icon];
  if (size) {
    width = size;
    height = size;
  }

  const defaultFillColor = WHITE_FILL_ICONS.includes(icon)
    ? fillColor || currentTheme.color.grayScale[10]
    : fillColor;

  const defaultStrokeColor =
    icon === "Refresh" ? strokeColor || "#000000" : strokeColor;

  return (
    <SvgIcon
      {...props}
      width={width}
      height={height}
      fill={defaultFillColor}
      stroke={defaultStrokeColor}
      aria-label={icon}
      role="img"
      style={{
        width: size,
        height: size,
        ...props.style
      }}
    />
  );
};
