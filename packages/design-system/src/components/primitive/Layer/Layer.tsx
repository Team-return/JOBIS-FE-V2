import styled from "@emotion/styled";
import type { Props } from "./Layer.types";
import { type ParentProps } from "@/utils";

const Component = styled.div<Props>`
  position: relative;
  ${({ $level }) => $level !== undefined && `z-index: ${$level};`}
`;

export const Layer = ({ children, ...props }: ParentProps<Props>) => {
  return <Component {...props}>{children}</Component>;
};
