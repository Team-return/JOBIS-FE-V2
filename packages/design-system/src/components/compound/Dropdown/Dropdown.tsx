import { useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@/hooks";
import { Flex, Icon, Text } from "@/components";
import type { Props } from "./Dropdown.types";
import { Search } from "../Search";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TriggerButton = styled.button<
  Pick<Props, "isOpen" | "$width" | "$color" | "isNoneBorder">
>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 7px;
  border: 1px solid
    ${({ theme, $color }) => $color || theme.color.grayScale[50]};
  ${({ isNoneBorder }) =>
    isNoneBorder &&
    `
      border: none;
    `}
  border-radius: 8px;
  background: ${({ theme }) => theme.color.grayScale[10]};
  cursor: pointer;
  min-width: ${({ $width }) => $width};
  ${({ isOpen, theme }) =>
    isOpen &&
    `
      border-color: ${theme.color.grayScale[90]};
    `}
`;

const OptionsWrapper = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  z-index: 10;
`;

const DefaultOptions = styled.ul<Pick<Props, "$optionsWidth">>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: ${({ $optionsWidth }) => $optionsWidth}px;
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.12);
  border-radius: 8px;
  background: ${({ theme }) => theme.color.grayScale[10]};
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

  &:hover {
    color: ${({ theme }) => theme.color.primary[30]};
  }

  &:hover svg {
    fill: ${({ theme }) => theme.color.primary[30]};
  }

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

export const Dropdown = ({
  onChange,
  $placeholder,
  types,
  $width,
  $optionsWidth,
  isOpen: externalIsOpen,
  onToggle,
  $color,
  value: externalValue,
  options,
  isNoneBorder,
  isValueDefault
}: Props) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const [internalSelected, setInternalSelected] = useState<string | null>(
    isValueDefault ? (options[0]?.value ?? null) : null
  );
  const selected =
    externalValue !== undefined ? externalValue : internalSelected;
  const [searchTerm, setSearchTerm] = useState("");

  const closeDropdown = () => {
    if (onToggle) {
      onToggle(false);
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleSelect = (value: string) => {
    if (externalValue === undefined) {
      setInternalSelected(value);
    }
    onChange?.(value);
    closeDropdown();
  };

  const selectedValue = options.find(o => o.value === selected)?.value;
  const selectedLabel = options.find(o => o.value === selected)?.label;
  const filteredOptions =
    types === "supportJob"
      ? options.filter(opt =>
          opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;
  const { currentTheme: theme } = useTheme();

  const getDisplayText = () => {
    const inOrder = selectedValue?.split("-")[1];

    if (inOrder === undefined) {
      return (
        <Flex
          $gap={2}
          $align="center"
          style={{ color: theme.color.grayScale[60] }}
        >
          {selectedLabel || $placeholder || "선택"}
        </Flex>
      );
    }
    const isAsc = inOrder === "asc";

    return (
      <Flex
        $gap={2}
        $align="center"
        style={{ color: theme.color.grayScale[60] }}
      >
        {selectedLabel}
        <Icon
          icon={isAsc ? "SortAsc" : "SortDesc"}
          size={13}
          fillColor={theme.color.grayScale[60]}
        />
      </Flex>
    );
  };

  return (
    <Wrapper>
      <TriggerButton
        isOpen={isOpen}
        onClick={() => {
          const newValue = !isOpen;
          if (onToggle) {
            onToggle(newValue);
          } else {
            setInternalIsOpen(newValue);
          }
        }}
        $width={typeof $width === "number" ? `${$width}px` : $width}
        $color={$color}
        isNoneBorder={isNoneBorder}
      >
        {getDisplayText()}
        <Icon
          icon={isOpen ? "ChevronUp" : "ChevronDown"}
          size={20}
          fillColor={$color || theme.color.grayScale[60]}
        />
      </TriggerButton>

      {isOpen && (
        <OptionsWrapper>
          {types === undefined && (
            <DefaultOptions $optionsWidth={$optionsWidth}>
              {options.map(opt => {
                const inOrder = opt.value?.split("-")[1];
                console.log(inOrder);

                return (
                  <DefaultOption
                    key={opt.value}
                    $selected={opt.value === selected}
                    onClick={() => handleSelect(opt.value)}
                  >
                    <Flex $gap={2} $justify="flex-end" $align="center">
                      {opt.label}
                      {inOrder && (
                        <Icon
                          size={13}
                          icon={inOrder === "asc" ? "SortAsc" : "SortDesc"}
                          fillColor={
                            opt.value === selected
                              ? theme.color.primary[30]
                              : theme.color.grayScale[60]
                          }
                        />
                      )}
                    </Flex>
                  </DefaultOption>
                );
              })}
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
                  IconFillColor={theme.color.grayScale[60]}
                />
                <div
                  style={{
                    height: "1px",
                    backgroundColor: theme.color.grayScale[40]
                  }}
                />
                <Flex $wrap $gap={10}>
                  {filteredOptions.length > 0 ? (
                    filteredOptions?.map(opt => (
                      <SupportJobTag
                        key={opt.value}
                        $selected={opt.value === selected}
                        onClick={() => handleSelect(opt.value)}
                      >
                        <Text
                          $size="caption"
                          $weight="regular"
                          $color={theme.color.subColor.blue[30]}
                        >
                          {opt.label}
                        </Text>
                      </SupportJobTag>
                    ))
                  ) : (
                    <Text
                      $size="body3"
                      $weight="regular"
                      $color={theme.color.grayScale[60]}
                    >
                      검색 결과가 없습니다.
                    </Text>
                  )}
                </Flex>
              </Flex>
            </SupportJobOptions>
          )}
        </OptionsWrapper>
      )}
    </Wrapper>
  );
};
