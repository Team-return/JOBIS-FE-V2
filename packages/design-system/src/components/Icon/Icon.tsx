import * as icons from "../../../assets/icons";
import { Props, IconName } from "./Icon.types";

const iconComponents = icons as Record<IconName, string>;

export const Icon = ({ icon, size = 28, ...props }: Props) => {
  const src = iconComponents[icon];
  return <img src={src} alt={icon} width={size} height={size} {...props} />;
};
