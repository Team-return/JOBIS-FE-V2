import styled from "@emotion/styled";
import type { Props } from "./Positioner.types";
import { type ParentProps, parseValue } from "@/utils";

const Component = styled.div<Props>`
  ${({ $position }) => $position && `position: ${$position};`}
  ${({ $top }) => $top && `top: ${parseValue($top)};`}
  ${({ $right }) => $right && `right: ${parseValue($right)};`}
  ${({ $bottom }) => $bottom && `bottom: ${parseValue($bottom)};`}
  ${({ $left }) => $left && `left: ${parseValue($left)};`}
`;

export const Positioner = ({ children, ...props }: ParentProps<Props>) => {
  return <Component {...props}>{children}</Component>;
};
