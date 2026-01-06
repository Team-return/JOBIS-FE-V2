import { useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@/hooks";
import { Flex, Icon, Text } from "@/components";
import type { Props } from "./Dropdown.types";
import { Search } from "../Search";
import { Checkbox } from "../Checkbox";
import { Button } from "../../core/Button";
import { Calendar } from "../Calendar";

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
  border: 1px solid
    ${({ theme, $color }) => $color || theme.color.grayScale[50]};
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
  width: 100%;
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
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
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
  onCheckChange,
  isOpen: externalIsOpen,
  onToggle,
  $color
}: Props) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const [selected, setSelected] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = checked !== undefined ? checked : internalChecked;
  const [tempChecked, setTempChecked] = useState(false);

  const closeDropdown = () => {
    if (onToggle) {
      onToggle(false);
    } else {
      setInternalIsOpen(false);
    }
  };

  // period type state
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);
  const [calendarFor, setCalendarFor] = useState<"start" | "end" | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
    closeDropdown();
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
      setTempStartDate(date);
    } else if (calendarFor === "end") {
      setTempEndDate(date);
    }
    setCalendarFor(null);
  };

  const handlePeriodSubmit = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    if (checked === undefined) {
      setInternalChecked(tempChecked);
    }
    onCheckChange?.(tempChecked);

    // period 타입일 때 onChange에 날짜 정보 전달
    if (onChange) {
      onChange({
        startDate: tempStartDate,
        endDate: tempEndDate,
        isConstant: tempChecked
      });
    }

    closeDropdown();
  };

  const selectedLabel = options.find(o => o.value === selected)?.label;
  const filteredOptions =
    types === "supportJob"
      ? options.filter(opt =>
          opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;
  const { currentTheme: theme } = useTheme();

  const getDisplayText = () => {
    if (types === "period") {
      if (isChecked) return "상시모집";
      if (startDate && endDate) {
        return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
      }
      if (startDate) return formatDate(startDate);
      if (endDate) return formatDate(endDate);
    }
    return selectedLabel || $placeholder || "선택";
  };

  return (
    <Wrapper>
      <TriggerButton
        isOpen={isOpen}
        onClick={() => {
          const newValue = !isOpen;
          if (newValue && types === "period") {
            // 드롭다운이 열릴 때 현재 날짜와 체크 상태를 임시 state에 복사
            setTempStartDate(startDate);
            setTempEndDate(endDate);
            setTempChecked(isChecked);
          }
          if (onToggle) {
            onToggle(newValue);
          } else {
            setInternalIsOpen(newValue);
          }
        }}
        $width={typeof $width === "number" ? `${$width}px` : $width}
        $color={$color}
      >
        <Text
          $size="body3"
          $weight="regular"
          $color={$color || theme.color.grayScale[60]}
        >
          {getDisplayText()}
        </Text>
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
                    filteredOptions.map(opt => (
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
                      strokeColor={theme.color.grayScale[70]}
                      fillColor={theme.color.grayScale[10]}
                    />
                  </Flex>
                  <Icon
                    icon="Close"
                    size={24}
                    fillColor={theme.color.grayScale[60]}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      calendarFor ? setCalendarFor(null) : closeDropdown()
                    }
                  />
                </Flex>
                <Flex $direction="column" $gap={8}>
                  <Flex $align="center" $justify="space-between">
                    <DateContainer
                      $disabled={tempChecked}
                      onClick={() => !tempChecked && setCalendarFor("start")}
                    >
                      <DateInput
                        type="text"
                        placeholder="YYYY.MM.DD"
                        readOnly
                        value={formatDate(tempStartDate)}
                      />
                      <Icon icon="Date" size={24} />
                    </DateContainer>
                    <Text
                      $size="h5"
                      $weight="regular"
                      $color={theme.color.grayScale[60]}
                    >
                      ~
                    </Text>
                    <DateContainer
                      $disabled={tempChecked}
                      onClick={() => !tempChecked && setCalendarFor("end")}
                    >
                      <DateInput
                        type="text"
                        placeholder="YYYY.MM.DD"
                        readOnly
                        value={formatDate(tempEndDate)}
                      />
                      <Icon icon="Date" size={24} />
                    </DateContainer>
                  </Flex>
                  <Checkbox
                    label="상시모집"
                    $labelSize="body2"
                    $labelWeight="regular"
                    $labelColor={theme.color.grayScale[60]}
                    $checked={tempChecked}
                    onChange={(newChecked: boolean) => {
                      setTempChecked(newChecked);
                      if (newChecked) {
                        setTempStartDate(null);
                        setTempEndDate(null);
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
                      (calendarFor === "start" ? tempStartDate : tempEndDate) ||
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
