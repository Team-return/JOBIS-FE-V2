import styled from "@emotion/styled";
import { type ParentProps, parseValue, parseList } from "@/utils";
import type { Props } from "./Container.types";

const Component = styled.div<Props>`
  width: 100%;
  ${({ $maxWidth }) => $maxWidth && `max-width: ${parseValue($maxWidth)};`}
  ${({ $padding }) => $padding && `padding: ${parseList($padding)};`}
  ${({ $bg }) => $bg && `background: ${$bg};`}
`;

export const Container = ({ children, ...props }: ParentProps<Props>) => {
  return <Component {...props}>{children}</Component>;
};
