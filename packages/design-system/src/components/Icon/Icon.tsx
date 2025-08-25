import styled from "@emotion/styled";
import * as icons from "../../../assets/icons";
import { Props, IconName } from "./Icon.types";

const IconImg = styled.img``;

const iconComponents = icons as Record<IconName, string>;

export const Icon = ({ icon, size = 28, ...props }: Props) => {
  const src = iconComponents[icon];
  return <IconImg src={src} alt={icon} width={size} height={size} {...props} />;
};
