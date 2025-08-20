import styled from "@emotion/styled";
import { type ParentProps, parseList } from "@/utils";
import type { Props } from "./Surface.types";

const Component = styled.div<Props>`
  ${({ $bg }) => $bg && `background: ${$bg};`}
  ${({ $shadow }) =>
    $shadow && "box-shadow: 0px 4px 20px 0px rgba(112, 144, 176, 0.12);"}
  ${({ $radius }) => $radius && `border-radius: ${parseList($radius)};`}
  ${({ $border }) => $border && `border: ${$border};`}
  ${({ $padding }) => $padding && `padding: ${parseList($padding)};`}
`;

export const Surface = ({ children, ...props }: ParentProps<Props>) => {
  return <Component {...props}>{children}</Component>;
};
