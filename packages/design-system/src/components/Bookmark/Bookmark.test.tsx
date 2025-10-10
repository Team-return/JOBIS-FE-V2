import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Bookmark } from "./Bookmark";
import { renderWithTheme } from "@/utils";

describe("Bookmark", () => {
  it("renders correctly", () => {
    renderWithTheme(<Bookmark $checked={false} />);
    const bookmarkElement = screen.getByLabelText("bookmark");
    expect(bookmarkElement).toBeInTheDocument();
  });

  it("handles onClick event", async () => {
    const handleClick = vi.fn();
    renderWithTheme(<Bookmark $checked={false} onClick={handleClick} />);
    const bookmarkElement = screen.getByLabelText("bookmark");
    await userEvent.click(bookmarkElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders correctly when checked", () => {
    renderWithTheme(<Bookmark $checked={true} />);
    const bookmarkElement = screen.getByLabelText("bookmark");
    expect(bookmarkElement).toBeInTheDocument();
  });

  it("renders correctly when unchecked", () => {
    renderWithTheme(<Bookmark $checked={false} />);
    const bookmarkElement = screen.getByLabelText("bookmark");
    expect(bookmarkElement).toBeInTheDocument();
  });
});
