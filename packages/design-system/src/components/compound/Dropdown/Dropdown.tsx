import { useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@/hooks";
import { Icon, Text } from "@/components";
import type { Props } from "./Dropdown.types";
import { Search } from "../Search";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TriggerButton = styled.button<
  Pick<Props, "isOpen" | "$width" | "$color" | "$isNoneBorder">
>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  font-size: ${({ theme }) => theme.font.body3.fontSize};
  line-height: ${({ theme }) => theme.font.body3.lineHeight};
  border: 1px solid
    ${({ theme, $color }) => $color || theme.color.grayScale[50]};
  ${({ $isNoneBorder }) =>
    $isNoneBorder &&
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
  color: ${({ theme }) => theme.color.grayScale[60]};
  white-space: nowrap;
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
  min-width: 100%;
  width: max-content;
  max-height: 320px;
  overflow-y: auto;
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.12);
  border-radius: 8px;
  background: ${({ theme }) => theme.color.grayScale[10]};
  list-style: none;
  padding: 8px 0;
  margin: 0;
  z-index: 10;
  color: ${({ theme }) => theme.color.grayScale[60]};
  font-size: ${({ theme }) => theme.font.caption.fontSize};
  line-height: ${({ theme }) => theme.font.caption.lineHeight};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DefaultOption = styled.li<{ $selected: boolean }>`
  white-space: nowrap;
  padding: 8px 22px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.primary[30]};
  }

  ${({ $selected, theme }) =>
    $selected &&
    `
      color: ${theme.color.primary[20]};
    `}
`;

/* supportJob 스타일 */
const SupportJobOptions = styled.div`
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.12);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.grayScale[10]};
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 399px;
  padding: 20px;
  height: 392px;
`;

const SupportJobTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
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
  type,
  $width,
  isOpen: externalIsOpen,
  onToggle,
  $color,
  value: externalValue,
  options,
  $isNoneBorder,
  $defaultValue
}: Props) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const [internalSelected, setInternalSelected] = useState<string | null>(
    $defaultValue ? $defaultValue : null
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

  const selectedLabel = options.find(o => o.value === selected)?.label;
  const filteredOptions =
    type === "supportJob"
      ? options.filter(opt =>
          opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;
  const { currentTheme: theme } = useTheme();

  const getDisplayText = () => {
    return selectedLabel || $placeholder || "선택";
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
        $isNoneBorder={$isNoneBorder}
      >
        {getDisplayText()}
        <Icon
          icon={isOpen ? "ChevronUp" : "ChevronDown"}
          size={16}
          fillColor={$color || theme.color.grayScale[60]}
        />
      </TriggerButton>

      {isOpen && (
        <OptionsWrapper>
          {type === undefined && (
            <DefaultOptions>
              {options.map(opt => {
                return (
                  <DefaultOption
                    key={opt.value}
                    $selected={opt.value === selected}
                    onClick={() => handleSelect(opt.value)}
                  >
                    {opt.label}
                  </DefaultOption>
                );
              })}
            </DefaultOptions>
          )}

          {type === "supportJob" && (
            <SupportJobOptions>
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
                  flexShrink: 0,
                  backgroundColor: theme.color.grayScale[40]
                }}
              />
              {/* 태그가 많으면 패널 밖으로 넘치지 않고 이 영역만 스크롤된다 */}
              <SupportJobTagList>
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
              </SupportJobTagList>
            </SupportJobOptions>
          )}
        </OptionsWrapper>
      )}
    </Wrapper>
  );
};
