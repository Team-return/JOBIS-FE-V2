import { useState } from "react";
import styled from "@emotion/styled";
import { Icon } from "@/components";
import type { DropdownProps } from "./Dropdown.types";
import { Text } from "@/components";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TriggerButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 120px;
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[50]};
  border-radius: 8px;
  background: #fff;
  cursor: pointer;

  ${({ $isOpen }) =>
    $isOpen &&
    `
    border-color: ${"#000"};
  `}
`;

const Options = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.12);
  border-radius: 8px;
  background: #fff;
  list-style: none;
  padding: 4px 0;
  margin: 0;
  z-index: 10;
  color: ${({ theme }) => theme.color.grayScale[50]};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Option = styled.li<{ $selected: boolean }>`
  padding: 8px 16px;
  cursor: pointer;
  ${({ $selected, theme }) =>
    $selected &&
    `
    background: ${theme.color.grayScale[20]};
    font-weight: bold;
  `}
  &:hover {
    color: ${({ theme }) => theme.color.primary[30]};
  }
`;

export const Dropdown = ({
  $options,
  onChange,
  placeholder
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
    setIsOpen(false);
  };

  const selectedLabel = $options.find(o => o.value === selected)?.label;

  return (
    <Wrapper>
      <TriggerButton $isOpen={isOpen} onClick={() => setIsOpen(prev => !prev)}>
        <Text $size="body3" $weight="regular" $color="#7F7F7F">
          {selectedLabel || placeholder || "선택"}
        </Text>
        <Icon
          icon={isOpen ? "ChevronUp" : "ChevronDown"}
          size={20}
          color="#7F7F7F"
        />
      </TriggerButton>
      {isOpen && (
        <Options>
          {$options.map(opt => (
            <Option
              key={opt.value}
              $selected={opt.value === selected}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </Option>
          ))}
        </Options>
      )}
    </Wrapper>
  );
};
