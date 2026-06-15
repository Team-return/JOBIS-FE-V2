import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { type Props } from "./Button.types";
import { Text } from "../Text";
import { parseList, TextProps } from "@/utils";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
`;

const Spinner = styled.div`
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background: conic-gradient(
    from 180deg at 50% 50%,
    #ffffff 0deg,
    rgba(255, 255, 255, 0) 360deg
  );
  animation: ${spin} 1s linear infinite;
  -webkit-mask: radial-gradient(
    farthest-side,
    transparent calc(100% - 3px),
    #fff 0
  );
  mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #fff 0);
`;

const Component = styled.button<Props>`
  cursor: pointer;
  border: 1px solid transparent;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  white-space: nowrap;
  transition:
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  user-select: none;

  ${({ $size = "md" }) => {
    switch ($size) {
      case "lg":
        return `
        height: 48px;
        padding: 0 147px;
        font-size: 16px;
        border-radius: 12px;
        `;
      case "md":
        return `
            height: 48px;
            padding: 0 40px;
            font-size: 16px;
            border-radius: 8px;
            `;
      case "sm":
        return `
              height:36px;
              padding: 8px 12px;
              border-radius: 8px;
              font-size: 14px;              
        `;
    }
  }}
  ${({ $padding }) => $padding && `padding: ${parseList($padding)};`}

  ${({ $progressing }) =>
    $progressing &&
    `
      pointer-events: none;
      cursor: wait;
  `}

  ${({ $variant = "contained", $hoverDisabled, theme }) => {
    const primaryColor = theme.color.primary[20];
    const primaryHoverColor = theme.color.primary[30];
    const primaryFocusColor = theme.color.primary[40];
    const textColor = theme.color.grayScale[10];
    const outlineHoverBgColor = theme.color.primary[10];

    switch ($variant) {
      case "contained":
        return `
          background-color: ${primaryColor};
          color: ${textColor};
  
          &:hover {
            ${!$hoverDisabled && `background-color: ${primaryHoverColor};`}
          }
  
          &:focus-visible {
            background-color: ${primaryFocusColor};
          }
  
          &:disabled {
            background-color: ${theme.color.grayScale[40]};
            color: ${theme.color.grayScale[60]};
            cursor: not-allowed;
          }
        `;

      case "outline":
        return `
          background-color: transparent;
          color: ${primaryColor};
          border-color: ${primaryColor};
  
          &:hover {
            ${!$hoverDisabled && `background-color: ${outlineHoverBgColor};`}
          }
  
          &:focus-visible {
            background-color: ${primaryColor};
            border-color: ${primaryFocusColor};
            color: ${textColor};
          }
  
          &:disabled {
            border: 1px solid ${theme.color.grayScale[50]};
            background-color: ${theme.color.grayScale[30]};
            color: ${theme.color.grayScale[50]};
            cursor: not-allowed;
          }
        `;
    }
  }}
`;

export const Button = ({
  children,
  $variant = "contained",
  $progressing = false,
  disabled,
  ...rest
}: TextProps<Props>) => {
  const isProgressing = $variant === "contained" && $progressing;

  return (
    <Component
      disabled={disabled}
      $progressing={isProgressing}
      $variant={$variant}
      {...rest}
    >
      {isProgressing ? (
        <>
          <Spinner />
          <Text $span $size="body2" $weight="bold" $color="inherit">
            {children}
          </Text>
        </>
      ) : (
        <Text $span $size="body2" $weight="bold" $color="inherit">
          {children}
        </Text>
      )}
    </Component>
  );
};
