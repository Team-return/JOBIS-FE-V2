import styled from "@emotion/styled";
import { type ChangeEvent, useId } from "react";
import { Icon } from "@/components";
import { parseValue } from "@/utils";
import type { Props } from "./Search.types";

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
`;

const InputWrapper = styled.div<Pick<Props, "$width">>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: ${({ $width }) => parseValue($width || "100%")};
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[50]};
  border-radius: 8px;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  ${({ theme }) => `
    color: ${theme.color.grayScale[60]};
    font-weight: ${theme.fontWeight.regular};
    font-size: ${theme.font.body3.fontSize};
    line-height: ${theme.font.body3.lineHeight};
  `}
  &::placeholder {
    color: ${({ theme }) => theme.color.grayScale[60]};
  }
`;

const IconWrapper = styled.div<{ onClick?: () => void }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.1);
  }
`;

export const Search = ({
  value,
  onChange,
  $width,
  onIconClick,
  ...props
}: Props) => {
  const id = useId();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <Wrapper>
      <InputWrapper $width={$width}>
        <StyledInput id={id} value={value} onChange={handleChange} {...props} />
        <IconWrapper onClick={onIconClick}>
          <Icon icon={"Search"} size={24} role="img" />
        </IconWrapper>
      </InputWrapper>
    </Wrapper>
  );
};
