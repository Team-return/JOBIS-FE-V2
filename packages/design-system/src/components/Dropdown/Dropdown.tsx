import { useState } from "react";
import styled from "@emotion/styled";
import { Flex, Icon, Text } from "@/components";
import { Props } from "./Dropdown.types";
import { Search } from "../Search/Search";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TriggerButton = styled.button<{ $isOpen: boolean; $width?: string }>`
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
  width: ${({ $width }) => $width};
  ${({ $isOpen }) =>
    $isOpen &&
    `
      border-color: #000;
    `}
`;

const OptionsWrapper = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  z-index: 10;
`;

const DefaultOptions = styled.ul`
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

const DefaultOption = styled.li<{ $selected: boolean }>`
  padding: 8px 16px;
  cursor: pointer;

  ${({ $selected, theme }) =>
    $selected &&
    `
      color: ${theme.color.primary[30]};
    `}
`;

/* supportJob 스타일 */
const SupportJobOptions = styled.div`
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.12);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.grayScale[10]};
  display: flex;
  flex-direction: column;
  width: 399px;
  padding: 20px;
  height: 392px;
`;

const SupportJobTag = styled.button<{ $selected: boolean }>`
  padding: 6px 16px;
  border-radius: 100px;
  background: ${({ theme }) => theme.color.subColor.blue[20]};
  width: fit-content;
  cursor: pointer;
  border: none;
`;

/* period 스타일 */
const PeriodOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: ${({ theme }) => theme.color.grayScale[10]};
  border-radius: 8px;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[30]};
  border-radius: 6px;
`;

export const Dropdown = ({
  options,
  onChange,
  $placeholder,
  types,
  $width
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
    setIsOpen(false);
  };

  const selectedLabel = options.find(o => o.value === selected)?.label;
  const filteredOptions =
    types === "supportJob"
      ? options.filter(opt =>
          opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;
  return (
    <Wrapper>
      <TriggerButton
        $isOpen={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
        $width={typeof $width === "number" ? `${$width}px` : $width}
      >
        <Text $size="body3" $weight="regular" $color="#7F7F7F">
          {selectedLabel || $placeholder || "선택"}
        </Text>
        <Icon
          icon={isOpen ? "ChevronUp" : "ChevronDown"}
          size={20}
          color="#7F7F7F"
        />
      </TriggerButton>

      {isOpen && (
        <OptionsWrapper>
          {types === undefined && (
            <DefaultOptions>
              {options.map(opt => (
                <DefaultOption
                  key={opt.value}
                  $selected={opt.value === selected}
                  onClick={() => handleSelect(opt.value)}
                >
                  {opt.label}
                </DefaultOption>
              ))}
            </DefaultOptions>
          )}

          {types === "supportJob" && (
            <SupportJobOptions>
              <Flex $direction="column" $gap={16}>
                <Search
                  $width={359}
                  placeholder="검색어를 입력해주세요"
                  onChange={value => setSearchTerm(value)}
                  value={searchTerm}
                />
                <div style={{ height: "1px", backgroundColor: "#E5E5E5" }} />
                <Flex $wrap $gap={10}>
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map(opt => (
                      <SupportJobTag
                        key={opt.value}
                        $selected={opt.value === selected}
                        onClick={() => handleSelect(opt.value)}
                      >
                        <Text
                          $size="caption"
                          $weight="regular"
                          $color="#237BC9"
                        >
                          {opt.label}
                        </Text>
                      </SupportJobTag>
                    ))
                  ) : (
                    <Text $size="body3" $weight="regular" $color="#7F7F7F">
                      검색 결과가 없습니다.
                    </Text>
                  )}
                </Flex>
              </Flex>
            </SupportJobOptions>
          )}

          {types === "period" && (
            <PeriodOptions>
              <DateInput type="date" />
              <DateInput type="date" />
            </PeriodOptions>
          )}
        </OptionsWrapper>
      )}
    </Wrapper>
  );
};
