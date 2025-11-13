import { useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@/hooks";
import { Flex, Icon, Text } from "@/components";
import type { Props } from "./Dropdown.types";
import { Search } from "../Search";
import { Checkbox } from "../Checkbox";
import { Button } from "../Button";
import { Calendar } from "../Calendar";

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
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.12);
  border-radius: 8px;
  width: 398px;
  background-color: ${({ theme }) => theme.color.grayScale[10]};
`;

const DateContainer = styled.div<{ $disabled?: boolean }>`
  width: 135px;
  padding: 8px;
  border-radius: 6px;
  background-color: ${({ theme, $disabled }) =>
    $disabled ? theme.color.grayScale[30] : theme.color.grayScale[20]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
`;
const DateInput = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  width: 76px;
  font-size: ${({ theme }) => theme.font.body3.fontSize};
  color: ${({ theme }) => theme.color.grayScale[50]};
  &::placeholder {
    color: ${({ theme }) => theme.color.grayScale[50]};
  }
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Dropdown = ({
  options,
  onChange,
  $placeholder,
  types,
  $width,
  checked,
  onCheckChange
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // period type state
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [calendarFor, setCalendarFor] = useState<"start" | "end" | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
    setIsOpen(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}.${month}.${day}`;
  };

  const handleDateChange = (date: Date) => {
    if (calendarFor === "start") {
      setStartDate(date);
    } else if (calendarFor === "end") {
      setEndDate(date);
    }
    setCalendarFor(null);
  };

  const handlePeriodSubmit = () => {
    setIsOpen(false);
  };

  const selectedLabel = options.find(o => o.value === selected)?.label;
  const filteredOptions =
    types === "supportJob"
      ? options.filter(opt =>
          opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;
  const { currentTheme } = useTheme();
  return (
    <Wrapper>
      <TriggerButton
        $isOpen={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
        $width={typeof $width === "number" ? `${$width}px` : $width}
      >
        <Text
          $size="body3"
          $weight="regular"
          $color={currentTheme.color.grayScale[60]}
        >
          {selectedLabel || $placeholder || "선택"}
        </Text>
        <Icon
          icon={isOpen ? "ChevronUp" : "ChevronDown"}
          size={20}
          fillColor={currentTheme.color.grayScale[60]}
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
                  IconFillColor={currentTheme.color.grayScale[60]}
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
                          $color={currentTheme.color.subColor.blue[30]}
                        >
                          {opt.label}
                        </Text>
                      </SupportJobTag>
                    ))
                  ) : (
                    <Text
                      $size="body3"
                      $weight="regular"
                      $color={currentTheme.color.grayScale[60]}
                    >
                      검색 결과가 없습니다.
                    </Text>
                  )}
                </Flex>
              </Flex>
            </SupportJobOptions>
          )}

          {types === "period" && (
            <PeriodOptions>
              <Flex $direction="column" $gap={24}>
                <Flex $justify="space-between" $align="center">
                  <Flex $align="center" $gap={8}>
                    <Text $size="h6" $weight="bold">
                      모집기간
                    </Text>
                    <Icon
                      icon="Refresh"
                      size={24}
                      strokeColor="#444444"
                      fillColor="#ffffff"
                    />
                  </Flex>
                  <Icon
                    icon="Close"
                    size={24}
                    fillColor="#7F7F7F"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      calendarFor ? setCalendarFor(null) : setIsOpen(false)
                    }
                  />
                </Flex>
                <Flex $direction="column" $gap={8}>
                  <Flex $align="center" $justify="space-between">
                    <DateContainer
                      $disabled={checked}
                      onClick={() => !checked && setCalendarFor("start")}
                    >
                      <DateInput
                        type="text"
                        placeholder="yyyy.mm.dd"
                        readOnly
                        value={formatDate(startDate)}
                      />
                      <Icon icon="Date" size={24} />
                    </DateContainer>
                    <Text
                      $size="h5"
                      $weight="regular"
                      $color={currentTheme.color.grayScale[60]}
                    >
                      ~
                    </Text>
                    <DateContainer
                      $disabled={checked}
                      onClick={() => !checked && setCalendarFor("end")}
                    >
                      <DateInput
                        type="text"
                        placeholder="yyyy.mm.dd"
                        readOnly
                        value={formatDate(endDate)}
                      />
                      <Icon icon="Date" size={24} />
                    </DateContainer>
                  </Flex>
                  <Checkbox
                    label="상시모집"
                    $labelSize="body2"
                    $labelWeight="regular"
                    $labelColor="#7F7F7F"
                    $checked={checked}
                    onChange={(isChecked: boolean) => {
                      onCheckChange?.(isChecked);
                      if (isChecked) {
                        setStartDate(null);
                        setEndDate(null);
                      }
                    }}
                  />
                </Flex>
                <Flex $justify="flex-end">
                  <Button
                    $size="md"
                    $variant="contained"
                    onClick={handlePeriodSubmit}
                  >
                    확인
                  </Button>
                </Flex>
              </Flex>
              {calendarFor && (
                <CalendarWrapper>
                  <Calendar
                    value={
                      (calendarFor === "start" ? startDate : endDate) ||
                      new Date()
                    }
                    onChange={handleDateChange}
                  />
                </CalendarWrapper>
              )}
            </PeriodOptions>
          )}
        </OptionsWrapper>
      )}
    </Wrapper>
  );
};
