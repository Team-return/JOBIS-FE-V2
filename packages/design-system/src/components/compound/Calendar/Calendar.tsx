import { Text, Button } from "@/components";
import type { Props } from "./Calendar.types";
import styled from "@emotion/styled";
import { useState, useMemo, useEffect } from "react";
import { useTheme } from "@/hooks";

const Component = styled.div`
  width: 398px;
  height: 374px;
  padding: 24px 23px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: ${({ theme }) => theme.color.grayScale[10]};
  box-shadow: 0px 4px 20px 0px rgba(112, 144, 176, 0.12);
`;

const Header = styled.div`
  width: 100%;
  height: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Arrow = ({
  direction,
  double = false,
  onClick
}: {
  direction: "left" | "right";
  double?: boolean;
  onClick: () => void;
}) => {
  if (direction === "left") {
    return double ? (
      <svg
        onClick={onClick}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ cursor: "pointer" }}
        data-testid="double-left-arrow"
      >
        <path
          d="M18.75 4.5L11.25 12L18.75 19.5M12.75 4.5L5.25 12L12.75 19.5"
          stroke="#7F7F7F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg
        onClick={onClick}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ cursor: "pointer" }}
        data-testid="single-left-arrow"
      >
        <path
          d="M15.75 19.5L8.25 12L15.75 4.5"
          stroke="#7F7F7F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  } else {
    return double ? (
      <svg
        onClick={onClick}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ cursor: "pointer" }}
        data-testid="double-right-arrow"
      >
        <path
          d="M5.25 4.5L12.75 12L5.25 19.5M11.25 4.5L18.75 12L11.25 19.5"
          stroke="#7F7F7F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg
        onClick={onClick}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ cursor: "pointer" }}
        data-testid="single-right-arrow"
      >
        <path
          d="M8.25 4.5L15.75 12L8.25 19.5"
          stroke="#7F7F7F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  gap: 5px;
`;

const Tr = styled.tr`
  display: flex;
  margin-bottom: 4px;
  gap: 5px;
`;

const Th = styled.th`
  width: 46px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Td = styled.td<{
  $isToday?: boolean;
  $isSelected?: boolean;
  $isCurrentMonth?: boolean;
}>`
  width: 46px;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[40]};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${({ $isToday, theme }) =>
    $isToday &&
    `
      border: 1px solid ${theme.color.primary[20]};
      color: ${theme.color.primary[20]};
    `}

  ${({ $isSelected, theme }) =>
    $isSelected &&
    `
      background-color: ${theme.color.primary[20]};
      color: ${theme.color.grayScale[10]};
    `}

  ${({ $isCurrentMonth, theme }) =>
    !$isCurrentMonth &&
    `
      background-color: ${theme.color.grayScale[30]};
      color: ${theme.color.grayScale[50]};
    `}
`;

const Footer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
`;

const pad = (number: number) => `${number < 10 ? "0" : ""}${number}`;

export const Calendar = ({ value, onChange }: Props) => {
  const normalizeDate = (date: Date): Date => {
    if (date instanceof Date) {
      return date;
    }
    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) {
      return new Date();
    }
    return newDate;
  };

  const [date, setDate] = useState<Date>(() => normalizeDate(value));
  const [view, setView] = useState<Date>(() => normalizeDate(value));
  const { currentTheme: theme } = useTheme();

  useEffect(() => {
    const normalizedValue = normalizeDate(value);
    setDate(normalizedValue);
    setView(normalizedValue);
  }, [value]);

  const today = new Date();
  const todayString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  const { headerText, calendarDays } = useMemo(() => {
    const viewYear = view.getFullYear();
    const viewMonth = view.getMonth();
    const headerText = `${viewYear}.${pad(viewMonth + 1)}`;

    const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
    const lastDayOfMonth = new Date(viewYear, viewMonth + 1, 0);

    const firstDayOfWeek = firstDayOfMonth.getDay();
    const adjustedFirstDayOfWeek =
      firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const prevMonthLastDate = new Date(viewYear, viewMonth, 0).getDate();

    const days = [];

    for (let i = 0; i < adjustedFirstDayOfWeek; i++) {
      const day = prevMonthLastDate - adjustedFirstDayOfWeek + i + 1;
      days.push({
        date: new Date(viewYear, viewMonth - 1, day),
        isCurrentMonth: false,
        day
      });
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push({
        date: new Date(viewYear, viewMonth, i),
        isCurrentMonth: true,
        day: i
      });
    }

    const remainingDays = 35 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(viewYear, viewMonth + 1, i),
        isCurrentMonth: false,
        day: i
      });
    }

    return { viewYear, viewMonth, headerText, calendarDays: days };
  }, [view]);

  const handleDateClick = (clickedDate: Date, isCurrentMonth: boolean) => {
    setDate(clickedDate);
    if (!isCurrentMonth) {
      setView(clickedDate);
    }
  };

  const handlePrevYear = () => {
    setView(prev => new Date(prev.getFullYear() - 1, prev.getMonth(), 1));
  };

  const handlePrevMonth = () => {
    setView(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setView(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleNextYear = () => {
    setView(prev => new Date(prev.getFullYear() + 1, prev.getMonth(), 1));
  };

  return (
    <Component>
      <Header>
        <HeaderControls>
          <Arrow direction="left" double onClick={handlePrevYear} />
          <Arrow direction="left" onClick={handlePrevMonth} />
        </HeaderControls>
        <Text $size="h6" $weight="bold">
          {headerText}
        </Text>
        <HeaderControls>
          <Arrow direction="right" onClick={handleNextMonth} />
          <Arrow direction="right" double onClick={handleNextYear} />
        </HeaderControls>
      </Header>
      <Table>
        <Thead>
          <Tr>
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(label => (
              <Th key={label}>
                <Text
                  $size="caption"
                  $weight="bold"
                  $color={theme.color.grayScale[60]}
                >
                  {label}
                </Text>
              </Th>
            ))}
          </Tr>
        </Thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, weekIndex) => (
            <Tr key={weekIndex}>
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const dayInfo = calendarDays[weekIndex * 7 + dayIndex];
                const dateString = `${dayInfo.date.getFullYear()}-${dayInfo.date.getMonth()}-${dayInfo.date.getDate()}`;
                const isToday = dateString === todayString;
                const isSelected =
                  date.getFullYear() === dayInfo.date.getFullYear() &&
                  date.getMonth() === dayInfo.date.getMonth() &&
                  date.getDate() === dayInfo.date.getDate();

                return (
                  <Td
                    key={dayIndex}
                    $isToday={isToday}
                    $isSelected={isSelected}
                    $isCurrentMonth={dayInfo.isCurrentMonth}
                    onClick={() =>
                      handleDateClick(dayInfo.date, dayInfo.isCurrentMonth)
                    }
                  >
                    <Text
                      $size="body2"
                      $color={
                        isSelected
                          ? theme.color.grayScale[10]
                          : isToday
                            ? theme.color.primary[20]
                            : theme.color.grayScale[60]
                      }
                    >
                      {pad(dayInfo.day)}
                    </Text>
                  </Td>
                );
              })}
            </Tr>
          ))}
        </tbody>
      </Table>
      <Footer>
        <Button onClick={() => onChange(date)}>확인</Button>
      </Footer>
    </Component>
  );
};
