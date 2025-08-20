import styled from "@emotion/styled";
import type { ParentProps } from "@/utils";
import type { Props } from "./Visibility.types";

const Component = styled.div<Props>`
  ${({ $opacity }) => `opacity: ${$opacity};`}
  ${({ $invisible }) => $invisible && `visibility: hidden;`}
`;

export const Visibility = ({ children, ...props }: ParentProps<Props>) => {
  return <Component {...props}>{children}</Component>;
};
