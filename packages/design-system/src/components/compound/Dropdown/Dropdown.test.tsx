import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "@/utils/render";
import { Dropdown } from "./Dropdown";

const options = [
  { label: "프론트엔드", value: "frontend" },
  { label: "백엔드", value: "backend" },
  { label: "디자이너", value: "designer" }
];

describe("Dropdown", () => {
  it("renders with placeholder text", () => {
    renderWithTheme(<Dropdown options={options} $placeholder="분야 선택" />);
    expect(screen.getByText("분야 선택")).toBeInTheDocument();
  });

  it("opens and shows options when clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Dropdown options={options} />);
    const trigger = screen.getByRole("button");

    await user.click(trigger);

    expect(screen.getByText("프론트엔드")).toBeInTheDocument();
    expect(screen.getByText("백엔드")).toBeInTheDocument();
    expect(screen.getByText("디자이너")).toBeInTheDocument();
  });

  it("selects option and triggers onChange", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    renderWithTheme(<Dropdown options={options} onChange={handleChange} />);

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    const backendOption = screen.getByText("백엔드");
    await user.click(backendOption);

    expect(handleChange).toHaveBeenCalledWith("backend");
    expect(trigger).toHaveTextContent("백엔드");
  });

  it("closes options after selecting an item", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Dropdown options={options} />);
    const trigger = screen.getByRole("button");

    await user.click(trigger);
    await user.click(screen.getByText("디자이너"));

    expect(screen.queryByText("프론트엔드")).not.toBeInTheDocument();
  });

  it("renders supportJob type and filters with search input", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Dropdown options={options} types="supportJob" />);

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    const input = screen.getByPlaceholderText("검색어를 입력해주세요");
    await user.type(input, "백엔드");

    expect(screen.getByText("백엔드")).toBeInTheDocument();
    expect(screen.queryByText("프론트엔드")).not.toBeInTheDocument();
  });

  it("renders period type and toggles checkbox", async () => {
    const user = userEvent.setup();
    const handleCheckChange = vi.fn();

    renderWithTheme(
      <Dropdown
        options={options}
        types="period"
        checked={false}
        onCheckChange={handleCheckChange}
      />
    );

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(handleCheckChange).toHaveBeenCalledWith(true);
  });
});
