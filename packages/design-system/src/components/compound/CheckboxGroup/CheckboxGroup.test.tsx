import { fireEvent, screen } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import { CheckboxGroup } from "./CheckboxGroup";
import { renderWithTheme } from "@/utils";

describe("CheckboxGroup", () => {
  const mockOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" }
  ];

  it("renders correctly with default props", () => {
    renderWithTheme(<CheckboxGroup options={mockOptions} />);

    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("renders checkboxes with initial checked state", () => {
    const optionsWithChecked = [
      { label: "Option 1", value: "option1", checked: true },
      { label: "Option 2", value: "option2", checked: false },
      { label: "Option 3", value: "option3" }
    ];

    renderWithTheme(<CheckboxGroup options={optionsWithChecked} />);

    const checkedCheckbox = screen.getByRole("checkbox", { checked: true });
    const uncheckedCheckboxes = screen.getAllByRole("checkbox", {
      checked: false
    });

    expect(checkedCheckbox).toBeInTheDocument();
    expect(uncheckedCheckboxes).toHaveLength(2);
  });

  it("calls onChange handler when checkbox is clicked", async () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <CheckboxGroup options={mockOptions} onChange={handleChange} />
    );

    const firstCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(firstCheckbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(["option1"]);
  });

  it("updates checked state correctly when multiple checkboxes are clicked", () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <CheckboxGroup options={mockOptions} onChange={handleChange} />
    );

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[0]);
    expect(handleChange).toHaveBeenCalledWith(["option1"]);

    fireEvent.click(checkboxes[1]);
    expect(handleChange).toHaveBeenCalledWith(["option1", "option2"]);

    fireEvent.click(checkboxes[0]);
    expect(handleChange).toHaveBeenCalledWith(["option2"]);
  });

  it("does not update state when onChange returns false", () => {
    const handleChange = vi.fn(() => false);
    renderWithTheme(
      <CheckboxGroup options={mockOptions} onChange={handleChange} />
    );

    const checkboxes = screen.getAllByRole("checkbox");

    checkboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked();
    });

    fireEvent.click(checkboxes[0]);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(["option1"]);

    expect(checkboxes[0]).not.toBeChecked();
  });
});
