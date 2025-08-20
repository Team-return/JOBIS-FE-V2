import styled from "@emotion/styled";
import { parseValue, parseList } from "@/utils";
import type { Props } from "./Image.types";

const Component = styled.img<Props>`
  width: ${({ width }) => (width ? parseValue(width) : "auto")};
  height: ${({ height }) => (height ? parseValue(height) : "auto")};
  border-radius: ${({ $radius }) => ($radius ? parseList($radius) : "0")};
  object-fit: ${({ $fit }) => $fit || "cover"};
`;

export const Image = ({ src, alt, ...props }: Props) => {
  return <Component src={src} alt={alt} {...props} />;
};
