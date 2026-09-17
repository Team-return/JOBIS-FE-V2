import * as icons from "../../../icons";
import { Props, IconName } from "./Icon.types";
import { useTheme } from "@/hooks";

const WHITE_FILL_ICONS: readonly IconName[] = [
  "ToastError",
  "ToastWarning",
  "ToastSuccess",
  "ToastInfo",
  "Print",
  "Refresh",
  "Speaker"
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
  const { currentTheme: theme } = useTheme();
  const SvgIcon = icons[icon];
  if (size) {
    width = size;
    height = size;
  }

  const defaultFillColor = WHITE_FILL_ICONS.includes(icon)
    ? theme.color.grayScale[10]
    : fillColor;

  const defaultStrokeColor =
    icon === "Refresh" ? strokeColor || theme.color.grayScale[90] : "";

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
