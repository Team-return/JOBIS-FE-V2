import styled from "@emotion/styled";
import { useTheme } from "@/hooks";
import { type ChangeEvent, useId } from "react";
import { Text } from "@/components";
import { parseValue } from "@/utils";
import type { Props } from "./TextArea.types";

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

const TextAreaWrapper = styled.div<
  Pick<Props, "$width" | "$height" | "$errorMessage" | "disabled">
>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: ${({ $width }) => parseValue($width || "100%")};
  ${({ $height }) => ($height ? `height: ${parseValue($height)};` : "")}
  padding: 12px 16px;
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

const StyledTextArea = styled.textarea`
  flex-grow: 1;
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => theme.color.grayScale[80]};
  font-size: ${({ theme }) => theme.font.body2.fontSize};
  line-height: ${({ theme }) => theme.font.body2.lineHeight};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-family: inherit;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.color.grayScale[50]};
  }
`;

export const TextArea = ({
  $label,
  value,
  onChange,
  $errorMessage,
  $width,
  $height,
  onKeyDown,
  placeholder,
  disabled,
  rows = 4,
  maxLength
}: Props) => {
  const { currentTheme: theme } = useTheme();
  const id = useId();
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <Wrapper>
      {$label && <Label htmlFor={id}>{$label}</Label>}
      <TextAreaWrapper
        $width={$width}
        $height={$height}
        $errorMessage={$errorMessage}
        disabled={disabled}
      >
        <StyledTextArea
          id={id}
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-invalid={!!$errorMessage}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
        />
      </TextAreaWrapper>
      {$errorMessage && (
        <Text
          $span
          $size="body3"
          $weight="regular"
          $color={theme.color.subColor.red[20]}
        >
          {$errorMessage}
        </Text>
      )}
    </Wrapper>
  );
};
