import styled from "@emotion/styled";
import { Props } from "./Skeleton.types";
import { parseList, parseValue } from "@/utils";
import { keyframes } from "@emotion/react";

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const Container = styled.div<Props>`
  ${({ width }) => width && `width: ${parseValue(width)};`}
  ${({ height }) => height && `height: ${parseValue(height)};`}
  ${({ $radius }) => $radius && `border-radius: ${parseList($radius)};`}
  background-color: ${({ theme }) => theme.color.grayScale[40]};
  animation: ${shimmer} 1.5s ease-in-out infinite;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 468px 100%;
  background-repeat: no-repeat;
`;

export const Skeleton = ({ width, height, $radius }: Props) => {
  return <Container width={width} height={height} $radius={$radius} />;
};
