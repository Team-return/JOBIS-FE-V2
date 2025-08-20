import styled from "@emotion/styled";
import type { Props } from "./Stack.types";
import { type ParentProps, parseValue } from "@/utils";

const Component = styled.div<Props>`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  ${({ $direction = "column" }) => `flex-direction: ${$direction};`}
  ${({ $gap }) => $gap && `gap: ${parseValue($gap)};`}
`;

export const Stack = ({ children, ...props }: ParentProps<Props>) => {
  return <Component {...props}>{children}</Component>;
};
