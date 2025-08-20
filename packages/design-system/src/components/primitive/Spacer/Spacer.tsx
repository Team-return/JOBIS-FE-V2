import styled from "@emotion/styled";
import { Props } from "./Spacer.types";

const Component = styled.div<Props>`
  flex: ${({ $flex = 1 }) => $flex} 1 0px;
  align-self: stretch;
`;

export const Spacer = ({ $flex }: Props) => {
  return <Component $flex={$flex} />;
};
