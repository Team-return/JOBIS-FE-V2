import * as icons from "../../../assets/icons";
import { Props } from "./Icon.types";

export const Icon = ({ icon, size = 28, color }: Props) => {
  const SvgIcon = icons[icon];

  return <SvgIcon width={size} height={size} fill={color} />;
};
