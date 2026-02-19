import styled from "@emotion/styled";
import type { Props } from "./Grid.types";
import { type ParentProps, parseList } from "@/utils";

const Component = styled.div<Props>`
  display: grid;
  ${({ $columns }) => $columns && `grid-template-columns: ${$columns};`}
  ${({ $rows }) => $rows && `grid-template-rows: ${$rows};`}
  ${({ $gap }) => $gap && `gap: ${parseList($gap)};`}
`;

export const Grid = ({ children, ...props }: ParentProps<Props>) => {
  return <Component {...props}>{children}</Component>;
};
