import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DateField } from "./DateField";
import { renderWithTheme } from "@/utils/render";

describe("DateField", () => {
  it("should format typed digits and report a real date", () => {
    const onChange = vi.fn();
    renderWithTheme(
      <DateField label="파견일자" value={null} onChange={onChange} />
    );

    const input = screen.getByRole("textbox", { name: "파견일자" });
    fireEvent.change(input, { target: { value: "20261201" } });

    expect(input).toHaveValue("2026.12.01");
    expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 11, 1));
  });

  it("should report null for a date that does not exist", () => {
    const onChange = vi.fn();
    renderWithTheme(
      <DateField label="파견일자" value={null} onChange={onChange} />
    );

    fireEvent.change(screen.getByRole("textbox", { name: "파견일자" }), {
      target: { value: "20260230" }
    });

    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it("should close only the calendar on Escape", () => {
    const onOuterEscape = vi.fn();
    window.addEventListener("keydown", onOuterEscape);
    renderWithTheme(
      <DateField label="파견일자" value={null} onChange={vi.fn()} />
    );

    const button = screen.getByRole("button", { name: "파견일자 달력 열기" });
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(document.body, { key: "Escape" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(onOuterEscape).not.toHaveBeenCalled();
    window.removeEventListener("keydown", onOuterEscape);
  });
});
