import styled from "@emotion/styled";
import { useTheme } from "@/hooks";
import { type ChangeEvent, useId } from "react";
import { Text, Icon } from "@/components";
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

const InputWrapper = styled.div<
  Pick<Props, "$width" | "$errorMessage" | "disabled">
>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: ${({ $width }) => parseValue($width || "100%")};
  height: 48px;
  padding: 0 16px;
  border: 1px solid
    ${({ theme, $errorMessage }) =>
      $errorMessage ? theme.color.subColor.red[20] : "transparent"};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.grayScale[20]};

  &:focus-within {
    outline: none;
    border-color: ${({ theme, $errorMessage }) =>
      $errorMessage ? theme.color.subColor.red[20] : theme.color.primary[20]};
  }

  ${({ theme, disabled }) =>
    disabled &&
    `
    border: 1px solid ${theme.color.grayScale[50]};
    background-color: ${theme.color.grayScale[30]};
    cursor: not-allowed;

    & > * {
      color: ${theme.color.grayScale[60]};
      cursor: not-allowed;
    }
  `}
`;

const StyledInput = styled.input`
  flex-grow: 1;
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => theme.color.grayScale[80]};
  font-size: ${({ theme }) => theme.font.body2.fontSize};
  line-height: ${({ theme }) => theme.font.body2.lineHeight};
  font-weight: ${({ theme }) => theme.fontWeight.regular};

  &::placeholder {
    color: ${({ theme }) => theme.color.grayScale[50]};
  }
`;

const IconWrapper = styled.div<{ onClick?: () => void }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
`;

export const Input = ({
  $label,
  value,
  onChange,
  $errorMessage,
  $width,
  $iconName,
  onIconClick,
  onKeyDown,
  disabled,
  type = "text",
  autoComplete,
  ...props
}: Props) => {
  const { currentTheme } = useTheme();
  const id = useId();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <Wrapper>
      {$label && <Label htmlFor={id}>{$label}</Label>}
      <InputWrapper
        $width={$width}
        $errorMessage={$errorMessage}
        disabled={disabled}
      >
        <StyledInput
          id={id}
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          aria-invalid={!!$errorMessage}
          disabled={disabled}
          type={type}
          autoComplete={autoComplete}
          {...props}
        />
        {$iconName && (
          <IconWrapper onClick={onIconClick}>
            <Icon icon={$iconName} size={24} role="img" />
          </IconWrapper>
        )}
      </InputWrapper>
      {$errorMessage && (
        <Text
          $span
          $size="body3"
          $weight="regular"
          $color={currentTheme.color.subColor.red[20]}
        >
          {$errorMessage}
        </Text>
      )}
    </Wrapper>
  );
};
