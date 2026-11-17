import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Icon, Text } from "@/components";
import { useTheme } from "@/hooks";
import { Calendar } from "../Calendar";
import type { Props } from "./DateField.types";

const Wrapper = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Field = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.grayScale[20]};
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  outline: none;
  font-family: inherit;
  font-size: ${({ theme }) => theme.font.body2.fontSize};
  line-height: 24px;
  color: ${({ theme }) => theme.color.grayScale[80]};
  &::placeholder {
    color: ${({ theme }) => theme.color.grayScale[60]};
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

const CalendarPopover = styled.div<{ $align: "left" | "right" }>`
  position: absolute;
  top: calc(100% + 8px);
  ${({ $align }) => `${$align}: 0;`}
  z-index: 1;
  border-radius: 8px;
  box-shadow: 0px 4px 20px 0px rgba(112, 144, 176, 0.12);
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

const formatDate = (date: Date) =>
  [
    date.getFullYear(),
    `0${date.getMonth() + 1}`.slice(-2),
    `0${date.getDate()}`.slice(-2)
  ].join(".");

export const DateField = ({
  label,
  value,
  onChange,
  disabled = false,
  calendarAlign = "left"
}: Props) => {
  const { currentTheme: theme } = useTheme();
  // 입력 중인 글자. null이면 고른 날짜를 그대로 보여 준다
  const [text, setText] = useState<string | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);
  const calendarButtonRef = useRef<HTMLButtonElement>(null);

  // 달력이 떠 있으면 Escape와 바깥 클릭으로 달력만 닫는다
  useEffect(() => {
    if (!isCalendarOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.isComposing) return;
      // 모달 같은 바깥 Escape 처리까지 닫히지 않도록 먼저 받아 멈춘다
      event.stopPropagation();
      setIsCalendarOpen(false);
      calendarButtonRef.current?.focus();
    };
    const handleMouseDown = (event: MouseEvent) => {
      if (!fieldRef.current?.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isCalendarOpen]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextText = formatTypedDate(event.target.value);
    setText(nextText);
    onChange(parseTypedDate(nextText));
  };

  return (
    <Wrapper>
      <Text $size="body3" $color={theme.color.grayScale[80]}>
        {label}
      </Text>
      <Field ref={fieldRef}>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="YYYY.MM.DD"
          aria-label={label}
          disabled={disabled}
          value={text ?? (value ? formatDate(value) : "")}
          onChange={handleChange}
          // 덜 입력했거나 없는 날짜면 비워 둔다
          onBlur={() => setText(null)}
        />
        <CalendarButton
          ref={calendarButtonRef}
          type="button"
          aria-label={`${label} 달력 열기`}
          aria-expanded={isCalendarOpen}
          disabled={disabled}
          onClick={() => setIsCalendarOpen(prev => !prev)}
        >
          <Icon icon="CalendarOutline" size={24} aria-hidden />
        </CalendarButton>
        {isCalendarOpen && (
          <CalendarPopover $align={calendarAlign}>
            <Calendar
              value={value ?? new Date()}
              onChange={date => {
                setText(null);
                onChange(date);
                setIsCalendarOpen(false);
              }}
            />
          </CalendarPopover>
        )}
      </Field>
    </Wrapper>
  );
};
