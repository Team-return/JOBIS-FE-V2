import styled from "@emotion/styled";
import type { Props } from "./Grid.types";
import { type ParentProps, parseValue } from "@/utils";

const Component = styled.div<Props>`
  display: grid;
  ${({ $columns }) => $columns && `grid-template-columns: ${$columns};`}
  ${({ $rows }) => $rows && `grid-template-rows: ${$rows};`}
  ${({ $gap }) => $gap && `gap: ${parseValue($gap)};`}
`;

export const Grid = ({ children, ...props }: ParentProps<Props>) => {
  return <Component {...props}>{children}</Component>;
};
