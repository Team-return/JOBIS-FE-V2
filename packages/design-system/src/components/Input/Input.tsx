import styled from "@emotion/styled";
import { type ChangeEvent, useId } from "react";
import { Text } from "@/components";
import { parseValue } from "@/utils";
import type { Props } from "./Input.types";

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  ${({ theme }) => `
    color: ${theme.color.grayScale[90]};
    font-weight: ${theme.fontWeight.regular};
    font-size: ${theme.font.body3.fontSize};
    line-height: ${theme.font.body3.lineHeight};
  `}
`;

const StyledInput = styled.input<Omit<Props, "onChange" | "$label">>`
  width: ${({ $width }) => parseValue($width || "100%")};
  height: 48px;
  padding: 0 16px;
  border: 1px solid
    ${({ theme, $errorMessage }) =>
      $errorMessage ? theme.color.subColor.red[20] : "transparent"};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.grayScale[20]};
  color: ${({ theme }) => theme.color.grayScale[80]};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme, $errorMessage }) =>
      $errorMessage ? theme.color.subColor.red[20] : theme.color.primary[20]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.grayScale[50]};
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.color.grayScale[50]};
    background-color: ${({ theme }) => theme.color.grayScale[30]};
    color: ${({ theme }) => theme.color.grayScale[60]};
    cursor: not-allowed;
  }
`;

export const Input = ({
  $label,
  value,
  onChange,
  $errorMessage,
  ...props
}: Props) => {
  const id = useId();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <Wrapper>
      {$label && <Label htmlFor={id}>{$label}</Label>}
      <StyledInput
        id={id}
        value={value}
        onChange={handleChange}
        $errorMessage={$errorMessage}
        aria-invalid={!!$errorMessage}
        {...props}
      />
      {$errorMessage && (
        <Text $span $size="body3" $weight="regular" $color="#E74C3C">
          {$errorMessage}
        </Text>
      )}
    </Wrapper>
  );
};
