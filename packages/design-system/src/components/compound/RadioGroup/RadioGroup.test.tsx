import { fireEvent, screen } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import { RadioGroup } from "./RadioGroup";
import { renderWithTheme } from "@/utils";

describe("RadioGroup", () => {
  const mockOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" }
  ];

  it("renders correctly with default props", () => {
    renderWithTheme(<RadioGroup options={mockOptions} />);

    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("renders radio with initial checked state", () => {
    const optionsWithChecked = [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2", checked: true },
      { label: "Option 3", value: "option3" }
    ];

    renderWithTheme(<RadioGroup options={optionsWithChecked} />);

    const checkedRadio = screen.getByRole("radio", { checked: true });
    const uncheckedRadios = screen.getAllByRole("radio", {
      checked: false
    });

    expect(checkedRadio).toBeInTheDocument();
    expect(uncheckedRadios).toHaveLength(2);
  });

  it("handles multiple checked options by selecting the first one", () => {
    const optionsWithMultipleChecked = [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2", checked: true },
      { label: "Option 3", value: "option3", checked: true }
    ];

    renderWithTheme(<RadioGroup options={optionsWithMultipleChecked} />);

    const checkedRadio = screen.getByRole("radio", { checked: true });
    expect(checkedRadio).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("calls onChange handler when radio is clicked", async () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <RadioGroup options={mockOptions} onChange={handleChange} />
    );

    const firstRadio = screen.getAllByRole("radio")[0];
    fireEvent.click(firstRadio);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("option1");
  });

  it("updates checked state correctly when different radio is clicked", () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <RadioGroup options={mockOptions} onChange={handleChange} />
    );

    const radios = screen.getAllByRole("radio");

    fireEvent.click(radios[0]);
    expect(handleChange).toHaveBeenCalledWith("option1");

    fireEvent.click(radios[1]);
    expect(handleChange).toHaveBeenCalledWith("option2");
  });

  it("does not update state when onChange returns false", () => {
    const handleChange = vi.fn(() => false);
    renderWithTheme(
      <RadioGroup options={mockOptions} onChange={handleChange} />
    );

    const radios = screen.getAllByRole("radio");
    const firstRadio = radios[0];

    expect(firstRadio).not.toBeChecked();

    fireEvent.click(firstRadio);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("option1");

    expect(firstRadio).not.toBeChecked();
  });
});
