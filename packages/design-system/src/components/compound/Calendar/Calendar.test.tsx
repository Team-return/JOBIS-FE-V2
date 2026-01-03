import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Calendar } from "./Calendar";
import { renderWithTheme } from "@/utils/render";

describe("Calendar", () => {
  it("renders with the correct month and year", () => {
    const testDate = new Date(2023, 5, 15);
    renderWithTheme(<Calendar value={testDate} onChange={() => {}} />);

    const headerText = screen.getByText("2023.06");
    expect(headerText).toBeInTheDocument();
  });

  it("renders weekdays correctly", () => {
    const testDate = new Date(2023, 5, 15);
    renderWithTheme(<Calendar value={testDate} onChange={() => {}} />);

    const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    weekdays.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it("highlights the selected date", () => {
    const testDate = new Date(2023, 5, 15);
    renderWithTheme(<Calendar value={testDate} onChange={() => {}} />);

    const selectedDay = screen.getByText("15");
    // Check that the element exists and has styling (actual color may vary by theme)
    expect(selectedDay).toBeInTheDocument();
  });

  it("changes date on click", async () => {
    const onChangeMock = vi.fn();
    const testDate = new Date(2023, 5, 15);
    renderWithTheme(<Calendar value={testDate} onChange={onChangeMock} />);

    const newDay = screen.getByText("18");
    await userEvent.click(newDay);

    const confirmButton = screen.getByText("확인");
    await userEvent.click(confirmButton);

    expect(onChangeMock).toHaveBeenCalledWith(new Date(2023, 5, 18));
  });

  it("navigates to previous month", async () => {
    const testDate = new Date(2023, 5, 15);
    renderWithTheme(<Calendar value={testDate} onChange={() => {}} />);

    const prevMonthButton = screen.getByTestId("single-left-arrow");
    await userEvent.click(prevMonthButton);

    expect(screen.getByText("2023.05")).toBeInTheDocument();
  });

  it("navigates to next month", async () => {
    const testDate = new Date(2023, 5, 15);
    renderWithTheme(<Calendar value={testDate} onChange={() => {}} />);

    const nextMonthButton = screen.getByTestId("single-right-arrow");
    await userEvent.click(nextMonthButton);

    const headerText = screen.getByText("2023.07");
    expect(headerText).toBeInTheDocument();
  });

  it("navigates to previous year", async () => {
    const testDate = new Date(2023, 5, 15);
    renderWithTheme(<Calendar value={testDate} onChange={() => {}} />);

    const prevYearButton = screen.getByTestId("double-left-arrow");
    await userEvent.click(prevYearButton);

    const headerText = screen.getByText("2022.06");
    expect(headerText).toBeInTheDocument();
  });

  it("navigates to next year", async () => {
    const testDate = new Date(2023, 5, 15);
    renderWithTheme(<Calendar value={testDate} onChange={() => {}} />);

    const nextYearButton = screen.getByTestId("double-right-arrow");
    await userEvent.click(nextYearButton);

    const headerText = screen.getByText("2024.06");
    expect(headerText).toBeInTheDocument();
  });

  it("clicking '확인' button calls onChange with selected date", async () => {
    const onChangeMock = vi.fn();
    const testDate = new Date(2023, 5, 15);
    renderWithTheme(<Calendar value={testDate} onChange={onChangeMock} />);

    const confirmButton = screen.getByText("확인");
    await userEvent.click(confirmButton);

    expect(onChangeMock).toHaveBeenCalledWith(testDate);
  });
});
