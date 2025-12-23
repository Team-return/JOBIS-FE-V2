import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "./Pagination";
import { renderWithTheme } from "@/utils/render";
import { lightTheme } from "@/themes";

describe("Pagination", () => {
  const defaultProps = {
    start: 1,
    end: 10,
    current: 1,
    onChange: vi.fn()
  };

  it("should render page numbers correctly for the first group", () => {
    renderWithTheme(<Pagination {...defaultProps} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.queryByText("4")).not.toBeInTheDocument();
  });

  it("should render page numbers correctly for a middle group", () => {
    renderWithTheme(<Pagination {...defaultProps} current={5} />);
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.queryByText("3")).not.toBeInTheDocument();
    expect(screen.queryByText("7")).not.toBeInTheDocument();
  });

  it("should highlight the current page", () => {
    renderWithTheme(<Pagination {...defaultProps} current={2} />);
    const currentPageElement = screen.getByText("2");
    expect(currentPageElement).toHaveStyle(
      `color: ${lightTheme.color.grayScale[90]}`
    );

    const otherPageElement = screen.getByText("1");
    expect(otherPageElement).toHaveStyle(
      `color: ${lightTheme.color.grayScale[60]}`
    );
  });

  it("should call onChange when a page number is clicked", () => {
    const handleChange = vi.fn();
    renderWithTheme(<Pagination {...defaultProps} onChange={handleChange} />);
    const page2 = screen.getByText("2");
    fireEvent.click(page2);
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it("should call onChange with the correct page when next group button is clicked", () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <Pagination {...defaultProps} current={3} onChange={handleChange} />
    );
    const nextButton = screen.getByRole("img", { name: /chevronright/i });
    fireEvent.click(nextButton);
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it("should call onChange with the correct page when prev group button is clicked", () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <Pagination {...defaultProps} current={5} onChange={handleChange} />
    );
    const prevButton = screen.getByRole("img", { name: /chevronleft/i });
    fireEvent.click(prevButton);
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it("should disable prev button on the first group", () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <Pagination {...defaultProps} current={1} onChange={handleChange} />
    );
    const prevButton = screen.getByRole("img", { name: /chevronleft/i });
    expect(prevButton).toHaveStyle("cursor: not-allowed");
    fireEvent.click(prevButton);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("should disable next button on the last group", () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <Pagination
        {...defaultProps}
        end={3}
        current={1}
        onChange={handleChange}
      />
    );
    const nextButton = screen.getByRole("img", { name: /chevronright/i });
    expect(nextButton).toHaveStyle("cursor: not-allowed");
    fireEvent.click(nextButton);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
