import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "@/utils";
import { Dropdown } from "./Dropdown";

const options = [
  { label: "프론트엔드", value: "frontend" },
  { label: "백엔드", value: "backend" },
  { label: "디자이너", value: "designer" }
];

describe("Dropdown", () => {
  it("should render with placeholder", () => {
    renderWithTheme(<Dropdown options={options} $placeholder="분야 선택" />);
    expect(screen.getByText("분야 선택")).toBeInTheDocument();
  });

  it("should open options when clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Dropdown options={options} />);
    const button = screen.getByRole("button");

    await user.click(button);

    expect(screen.getByText("프론트엔드")).toBeInTheDocument();
    expect(screen.getByText("백엔드")).toBeInTheDocument();
  });

  it("should select an option and call onChange", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    renderWithTheme(<Dropdown options={options} onChange={handleChange} />);
    const button = screen.getByRole("button");

    await user.click(button);
    const option = screen.getByText("백엔드");
    await user.click(option);

    expect(handleChange).toHaveBeenCalledWith("backend");
    expect(button).toHaveTextContent("백엔드");
  });

  it("should close after selecting option", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Dropdown options={options} />);
    const button = screen.getByRole("button");

    await user.click(button);
    const option = screen.getByText("디자이너");
    await user.click(option);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
