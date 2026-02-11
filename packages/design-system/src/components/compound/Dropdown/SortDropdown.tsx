import { useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@/hooks";
import { Flex, Icon } from "@/components";
import type { Props, SortDropdownProps } from "./Dropdown.types";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TriggerButton = styled.button<
  Pick<Props, "isOpen" | "$width" | "$color">
>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 7px;
  border: none;
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

const DefaultOptions = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 103px;
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.12);
  border-radius: 8px;
  background: ${({ theme }) => theme.color.grayScale[10]};
  list-style: none;
  padding: 4px 0;
  margin: 0;
  z-index: 10;
  color: ${({ theme }) => theme.color.grayScale[60]};
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

const SortIcon = styled(Icon)<{ $selected: boolean }>`
  fill: ${({ theme }) => theme.color.grayScale[60]};

  &:hover {
    fill: ${({ theme }) => theme.color.primary[30]};
  }

  ${({ $selected, theme }) =>
    $selected &&
    `
      fill: ${theme.color.primary[30]};
    `}
`;

export const SortDropdown = ({
  onChange,
  $placeholder,
  types,
  $width,
  isOpen: externalIsOpen,
  onToggle,
  $color,
  value: externalValue,
  isRecruitment
}: SortDropdownProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const [internalSelected, setInternalSelected] = useState<string | null>(
    "기본순"
  );
  const selected =
    externalValue !== undefined ? externalValue : internalSelected;

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

  const desc = isRecruitment
    ? { label: "공고마감", value: "공고마감-desc" }
    : { label: "설립일", value: "설립일-desc" };

  const asc = isRecruitment
    ? { label: "공고마감", value: "공고마감-asc" }
    : { label: "설립일", value: "설립일-asc" };

  const options = [
    { label: "기본순", value: "기본순" },
    { label: "매출", value: "매출" },
    { label: "직원", value: "직원-desc" },
    { label: "직원", value: "직원-asc" },
    desc,
    asc
  ];

  const selectedLabel = options.find(o => o.value === selected)?.label;
  const selectedValue = options.find(o => o.value === selected)?.value;
  const { currentTheme: theme } = useTheme();

  const getDisplayText = () => {
    const inOrder = selectedValue?.split("-")[1];

    if (
      selectedValue === "기본값" ||
      selectedValue === "매출" ||
      inOrder === undefined
    ) {
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
        <SortIcon
          icon={isAsc ? "SortAsc" : "SortDesc"}
          size={13}
          $selected={false}
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
            <DefaultOptions>
              <DefaultOption
                $selected={"기본순" === selected}
                onClick={() => handleSelect("기본순")}
              >
                기본순
              </DefaultOption>
              <DefaultOption
                $selected={"매출" === selected}
                onClick={() => handleSelect("매출")}
              >
                매출
              </DefaultOption>
              <DefaultOption
                $selected={"직원-desc" === selected}
                onClick={() => handleSelect("직원-desc")}
              >
                <Flex $gap={2} $justify="flex-end" $align="center">
                  직원
                  <SortIcon
                    icon="SortDesc"
                    size={13}
                    $selected={"직원-desc" === selected}
                  />
                </Flex>
              </DefaultOption>
              <DefaultOption
                $selected={"직원-asc" === selected}
                onClick={() => handleSelect("직원-asc")}
              >
                <Flex $gap={2} $justify="flex-end" $align="center">
                  직원
                  <SortIcon
                    icon="SortAsc"
                    size={13}
                    $selected={"직원-asc" === selected}
                  />
                </Flex>
              </DefaultOption>
              <DefaultOption
                $selected={
                  (isRecruitment ? "공고마감-desc" : "설립일-desc") === selected
                }
                onClick={() =>
                  handleSelect(isRecruitment ? "공고마감-desc" : "설립일-desc")
                }
              >
                <Flex $gap={2} $justify="flex-end" $align="center">
                  {isRecruitment ? "공고마감" : "설립일"}
                  <SortIcon
                    icon="SortDesc"
                    size={13}
                    $selected={"직원-desc" === selected}
                  />
                </Flex>
              </DefaultOption>
              <DefaultOption
                $selected={
                  (isRecruitment ? "공고마감-asc" : "설립일-asc") === selected
                }
                onClick={() =>
                  handleSelect(isRecruitment ? "공고마감-asc" : "설립일-asc")
                }
              >
                <Flex $gap={2} $justify="flex-end" $align="center">
                  {isRecruitment ? "공고마감" : "설립일"}
                  <SortIcon
                    icon="SortAsc"
                    size={13}
                    $selected={"직원-asc" === selected}
                  />
                </Flex>
              </DefaultOption>
            </DefaultOptions>
          )}
        </OptionsWrapper>
      )}
    </Wrapper>
  );
};
