import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { type ButtonProps } from "./button.types";
import { Text } from "@/components";

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

const Component = styled.button<Omit<ButtonProps, "children">>`
  //ButtonProps가 ComponentPropsWithoutRef<"button">를 확장하면서 ReactNode childeren과 string children이 생겨 충돌이 발생 이를 해결하기 위해 추가
  cursor: pointer;
  border: 1px solid transparent;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition:
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  user-select: none;

  ${({ $buttonSize }) => {
    switch ($buttonSize) {
      case "md":
        return `
          height: 48px;
          padding: 0 40px;
          font-size: 16px;
          border-radius: 8px;
        `;
      case "lg":
        return `
          height: 48px;
          padding: 0 147px;
          font-size: 16px;
          border-radius: 12px;
        `;
    }
  }}

  ${({ $progressing }) =>
    $progressing &&
    `
      pointer-events: none;
      cursor: wait;
  `}

  ${({ $variant, theme }) => {
    const primaryColor = theme.color.primary[20];
    const primaryHoverColor = "#C7D1FF";
    const primaryFocusColor = theme.color.primary[40];
    const textColor = theme.color.grayScale[10];
    const outlineHoverBgColor = theme.color.primary[20];

    if ($variant === "contained") {
      return `
        background-color: ${primaryColor};
        color: ${textColor};

        &:hover {
          background-color: ${primaryHoverColor};
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
    }

    if ($variant === "outline") {
      return `
        background-color: transparent;
        color: ${primaryColor};
        border-color: ${primaryColor};

        &:hover {
          background-color: ${outlineHoverBgColor};
          color: ${textColor};
        }

        &:focus-visible {
          background-color: ${primaryFocusColor};
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
}: ButtonProps) => {
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
