import styled from "@emotion/styled";
import type { Props } from "./Flex.types";
import { type ParentProps, parseValue } from "@/utils";

const Container = styled.div<Props>`
  display: ${({ $inline }) => ($inline ? "inline-flex" : "flex")};
  flex-direction: ${({ $direction = "row" }) => $direction};
  align-items: ${({ $align = "stretch" }) => $align};
  justify-content: ${({ $justify = "flex-start" }) => $justify};
  flex-wrap: ${({ $wrap }) => ($wrap ? "wrap" : "nowrap")};
  ${({ $gap }) => $gap && `gap: ${parseValue($gap)};`}
`;

export const Flex = ({ children, ...props }: ParentProps<Props>) => {
  return <Container {...props}>{children}</Container>;
};
