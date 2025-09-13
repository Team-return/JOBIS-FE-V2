import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "@/utils";
import { Search } from "./Search";

describe("Search", () => {
  it("should render with a placeholder", () => {
    renderWithTheme(<Search placeholder="검색어를 입력하세요" />);
    expect(
      screen.getByPlaceholderText("검색어를 입력하세요")
    ).toBeInTheDocument();
  });

  it("should display the value", () => {
    renderWithTheme(<Search value="react" />);
    expect(screen.getByDisplayValue("react")).toBeInTheDocument();
  });

  it("should call onChange handler when user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    renderWithTheme(<Search onChange={handleChange} placeholder="검색" />);
    const input = screen.getByPlaceholderText("검색");

    await user.type(input, "hello");

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenLastCalledWith("hello");
  });

  describe("Icon", () => {
    it("should render search icon", () => {
      renderWithTheme(<Search placeholder="with-icon" />);
      const icon = screen.getByRole("img");
      expect(icon).toBeInTheDocument();
    });

    it("should not be clickable if no onClick passed", async () => {
      const user = userEvent.setup();
      renderWithTheme(<Search placeholder="no-click-icon" />);
      const icon = screen.getByRole("img");

      await user.click(icon);

      expect(icon).toBeInTheDocument();
    });
  });
});
