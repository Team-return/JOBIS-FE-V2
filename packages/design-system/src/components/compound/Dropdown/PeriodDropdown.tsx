import { useState, useEffect, type ChangeEvent } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@/hooks";
import { Flex, Icon, Text } from "@/components";
import type { PeriodDropdownProps } from "./Dropdown.types";
import { Checkbox } from "../Checkbox";
import { Button } from "../../core/Button";
import { Calendar } from "../Calendar";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TriggerButton = styled.button<
  Pick<PeriodDropdownProps, "isOpen" | "$width" | "$color">
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
  ${({ isOpen, theme, $color }) =>
    isOpen &&
    `
      border-color: ${$color || theme.color.grayScale[90]};
    `}
`;

const OptionsWrapper = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  z-index: 10;
`;

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
  gap: 8px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "text")};
`;

const DateInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  outline: none;
  font-family: inherit;
  font-size: ${({ theme }) => theme.font.body3.fontSize};
  color: ${({ theme }) => theme.color.grayScale[80]};
  &::placeholder {
    color: ${({ theme }) => theme.color.grayScale[50]};
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const CalendarButton = styled.button`
  display: flex;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

// 숫자만 남겨 YYYY.MM.DD 모양으로 점을 채운다
const formatTypedDate = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return [digits.slice(0, 4), digits.slice(4, 6), digits.slice(6, 8)]
    .filter(Boolean)
    .join(".");
};

// 다 입력했고 실제로 있는 날짜일 때만 Date로 바꾼다 (2026.02.30 같은 값은 거른다)
const parseTypedDate = (value: string): Date | null => {
  const match = /^(\d{4})\.(\d{2})\.(\d{2})$/.exec(value);
  if (!match) return null;

  const [year, month, day] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
    ? date
    : null;
};

const CalendarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const PeriodDropdown = ({
  onChange,
  $placeholder,
  $width,
  isOpen: externalIsOpen,
  onToggle,
  $color,
  value: externalValue,
  checked,
  onCheckChange
}: PeriodDropdownProps) => {
  const { currentTheme: theme } = useTheme();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = checked !== undefined ? checked : internalChecked;

  // 실제 적용된 날짜 상태
  const [startDate, setStartDate] = useState<Date | null>(
    externalValue?.startDate || null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    externalValue?.endDate || null
  );

  // 임시 날짜 상태 (확인 버튼 누르기 전)
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);
  const [tempChecked, setTempChecked] = useState(false);
  const [calendarFor, setCalendarFor] = useState<"start" | "end" | null>(null);
  // 입력 중인 글자. null이면 고른 날짜를 그대로 보여 준다
  const [startText, setStartText] = useState<string | null>(null);
  const [endText, setEndText] = useState<string | null>(null);

  // value가 undefined로 변경되면 내부 상태도 리셋
  useEffect(() => {
    if (externalValue === undefined) {
      setStartDate(null);
      setEndDate(null);
      setInternalChecked(false);
    }
  }, [externalValue]);

  const closeDropdown = () => {
    if (onToggle) {
      onToggle(false);
    } else {
      setInternalIsOpen(false);
    }
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
      setStartText(null);
    } else if (calendarFor === "end") {
      setTempEndDate(date);
      setEndText(null);
    }
    setCalendarFor(null);
  };

  const handleTypedDate =
    (
      setText: (text: string | null) => void,
      setDate: (date: Date | null) => void
    ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const text = formatTypedDate(event.target.value);
      setText(text);
      setDate(parseTypedDate(text));
    };

  const handlePeriodSubmit = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);

    if (checked === undefined) {
      setInternalChecked(tempChecked);
    }
    onCheckChange?.(tempChecked);

    if (onChange) {
      onChange({
        startDate: tempStartDate,
        endDate: tempEndDate,
        isConstant: tempChecked
      });
    }

    closeDropdown();
  };

  const getDisplayText = () => {
    if (isChecked) return "상시모집";
    if (startDate && endDate) {
      return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
    }
    if (startDate) return formatDate(startDate);
    if (endDate) return formatDate(endDate);
    return $placeholder || "기간 설정";
  };

  return (
    <Wrapper>
      <TriggerButton
        isOpen={isOpen}
        onClick={() => {
          const newValue = !isOpen;
          if (newValue) {
            setTempStartDate(startDate);
            setTempEndDate(endDate);
            setTempChecked(isChecked);
            setStartText(null);
            setEndText(null);
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
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setTempStartDate(null);
                      setTempEndDate(null);
                      setTempChecked(false);
                      setStartText(null);
                      setEndText(null);
                    }}
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
                  <DateContainer $disabled={tempChecked}>
                    <DateInput
                      type="text"
                      inputMode="numeric"
                      placeholder="YYYY.MM.DD"
                      aria-label="모집 시작일"
                      disabled={tempChecked}
                      value={startText ?? formatDate(tempStartDate)}
                      onChange={handleTypedDate(setStartText, setTempStartDate)}
                      // 덜 입력했거나 없는 날짜면 비워 둔다
                      onBlur={() => setStartText(null)}
                    />
                    <CalendarButton
                      type="button"
                      aria-label="모집 시작일 달력 열기"
                      disabled={tempChecked}
                      onClick={() => setCalendarFor("start")}
                    >
                      <Icon icon="Date" size={24} />
                    </CalendarButton>
                  </DateContainer>
                  <Text
                    $size="h5"
                    $weight="regular"
                    $color={theme.color.grayScale[60]}
                  >
                    ~
                  </Text>
                  <DateContainer $disabled={tempChecked}>
                    <DateInput
                      type="text"
                      inputMode="numeric"
                      placeholder="YYYY.MM.DD"
                      aria-label="모집 종료일"
                      disabled={tempChecked}
                      value={endText ?? formatDate(tempEndDate)}
                      onChange={handleTypedDate(setEndText, setTempEndDate)}
                      onBlur={() => setEndText(null)}
                    />
                    <CalendarButton
                      type="button"
                      aria-label="모집 종료일 달력 열기"
                      disabled={tempChecked}
                      onClick={() => setCalendarFor("end")}
                    >
                      <Icon icon="Date" size={24} />
                    </CalendarButton>
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
                      setStartText(null);
                      setEndText(null);
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
        </OptionsWrapper>
      )}
    </Wrapper>
  );
};
