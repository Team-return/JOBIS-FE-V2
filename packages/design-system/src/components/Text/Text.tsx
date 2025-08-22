import styled from "@emotion/styled";
import type { Props } from "./Text.types";
import type { TextProps } from "@/utils";
import type { ComponentType } from "react";

type TextElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
type TextComponent = ComponentType<TextProps<Props>>;

const parseSize = (size: Props["$size"], isSpan?: boolean): TextElement => {
  if (isSpan) return "span";

  if (size.startsWith("h")) return size as TextElement;

  return "p";
};

const cache: Partial<Record<TextElement, ComponentType<Props>>> = {};

const createComponent = (element: TextElement): TextComponent => {
  cache[element] = styled(element)<Props>`
    color: ${({ theme, $color }) =>
      $color ? $color : theme.color.grayScale[90]};
    font-weight: ${({ theme, $weight }) =>
      $weight ? theme.fontWeight[$weight] : theme.fontWeight.regular};
    font-size: ${({ theme, $size }) => theme.font[$size].fontSize};
    line-height: ${({ theme, $size }) => theme.font[$size].lineHeight};
    ${({ $align }) => $align && `text-align: ${$align};`}
  `;
  return cache[element] as TextComponent;
};

export const Text = ({
  children,
  $size,
  $span,
  $color,
  $align,
  $weight
}: TextProps<Props>) => {
  const element = parseSize($size, $span);

  const Component = cache[element] || createComponent(element);

  return (
    <Component $size={$size} $color={$color} $align={$align} $weight={$weight}>
      {children}
    </Component>
  );
};
