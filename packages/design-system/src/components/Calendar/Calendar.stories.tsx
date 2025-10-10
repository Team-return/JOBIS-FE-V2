import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Calendar } from "./Calendar";
import { useState, useEffect } from "react";

const meta: Meta<typeof Calendar> = {
  title: "components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    value: {
      control: "date",
      description: "캘린더에 표시될 날짜"
    },
    onChange: {
      action: "changed",
      description: "날짜가 변경될 때 호출되는 이벤트 핸들러"
    }
  },
  args: {
    value: new Date(),
    onChange: fn()
  }
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const CalendarWrapper = ({ value }: { value: Date }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    if (value instanceof Date) return value;
    return new Date(value);
  });

  useEffect(() => {
    if (value instanceof Date) {
      setSelectedDate(value);
    } else {
      setSelectedDate(new Date(value));
    }
  }, [value]);

  return (
    <Calendar
      value={selectedDate}
      onChange={newDate => {
        setSelectedDate(newDate);
      }}
    />
  );
};

export const Default: Story = {
  render: args => <CalendarWrapper value={args.value} />
};

export const WithSpecificDate: Story = {
  args: {
    value: new Date(2023, 5, 15)
  },
  render: args => <CalendarWrapper value={args.value} />
};
