import styled from "@emotion/styled";
import type { Props } from "./Box.types";
import { type ParentProps, parseValue, parseList } from "@/utils";

const Component = styled.div<Props>`
  ${({ width }) => width && `width: ${parseValue(width)};`}
  ${({ height }) => height && `height: ${parseValue(height)};`}
  ${({ $padding }) => $padding && `padding: ${parseList($padding)};`}
  ${({ $margin }) => $margin && `margin: ${parseList($margin)};`}
  ${({ $bg }) => $bg && `background: ${$bg};`}
  ${({ $border }) => $border && `border: ${$border};`}
  ${({ $radius }) => $radius && `border-radius: ${parseList($radius)};`}
`;

export const Box = ({ children, ...props }: ParentProps<Props>) => {
  return <Component {...props}>{children}</Component>;
};
