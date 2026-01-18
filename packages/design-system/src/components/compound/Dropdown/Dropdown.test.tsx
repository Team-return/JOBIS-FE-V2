import { describe, it, expect, vi } from "vitest";
import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "@/utils/render";
import { Dropdown } from "./Dropdown";
import { PeriodDropdown } from "./PeriodDropdown";

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

  it("works in controlled mode with isOpen and onToggle", async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn();

    renderWithTheme(
      <Dropdown
        options={options}
        isOpen={false}
        onToggle={handleToggle}
        $placeholder="제어 모드"
      />
    );

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    expect(handleToggle).toHaveBeenCalledWith(true);

    // Simulate parent updating isOpen
    renderWithTheme(
      <Dropdown
        options={options}
        isOpen={true}
        onToggle={handleToggle}
        $placeholder="제어 모드"
      />
    );

    expect(screen.getByText("프론트엔드")).toBeInTheDocument();
  });

  it("works in uncontrolled mode without isOpen prop", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Dropdown options={options} />);

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    expect(screen.getByText("프론트엔드")).toBeInTheDocument();
  });

  it("resets internal state when value becomes undefined", () => {
    renderWithTheme(<Dropdown options={options} value="backend" />);

    expect(screen.getByText("백엔드")).toBeInTheDocument();

    cleanup();

    renderWithTheme(<Dropdown options={options} value={undefined} />);

    expect(screen.queryByText("백엔드")).not.toBeInTheDocument();
  });
});

describe("DropdownPeriod", () => {
  it("renders with placeholder text", () => {
    renderWithTheme(<PeriodDropdown $placeholder="기간 설정" />);
    expect(screen.getByText("기간 설정")).toBeInTheDocument();
  });

  it("opens and shows period options when clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme(<PeriodDropdown />);
    const trigger = screen.getByRole("button");

    await user.click(trigger);

    expect(screen.getByText("모집기간")).toBeInTheDocument();
    expect(screen.getByText("상시모집")).toBeInTheDocument();
  });

  it("toggles 상시모집 checkbox", async () => {
    const user = userEvent.setup();
    const handleCheckChange = vi.fn();

    renderWithTheme(
      <PeriodDropdown checked={false} onCheckChange={handleCheckChange} />
    );

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("displays selected dates in the trigger button", async () => {
    const testValue = {
      startDate: new Date(2024, 0, 1),
      endDate: new Date(2024, 11, 31),
      isConstant: false
    };

    renderWithTheme(<PeriodDropdown value={testValue} />);

    expect(screen.getByText("2024.01.01 ~ 2024.12.31")).toBeInTheDocument();
  });

  it("displays 상시모집 when checked is true", () => {
    renderWithTheme(
      <PeriodDropdown
        checked={true}
        value={{
          startDate: null,
          endDate: null,
          isConstant: true
        }}
      />
    );

    expect(screen.getByText("상시모집")).toBeInTheDocument();
  });

  it("calls onChange with period value when 확인 button is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    renderWithTheme(<PeriodDropdown onChange={handleChange} />);

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    const confirmButton = screen.getByRole("button", { name: "확인" });
    await user.click(confirmButton);

    expect(handleChange).toHaveBeenCalledWith({
      startDate: null,
      endDate: null,
      isConstant: true
    });
  });

  it("closes dropdown when 확인 button is clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme(<PeriodDropdown />);

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    expect(screen.getByText("모집기간")).toBeInTheDocument();

    const confirmButton = screen.getByRole("button", { name: "확인" });
    await user.click(confirmButton);

    expect(screen.queryByText("모집기간")).not.toBeInTheDocument();
  });

  it("works in controlled mode with isOpen and onToggle", async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn();

    renderWithTheme(<PeriodDropdown isOpen={false} onToggle={handleToggle} />);

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    expect(handleToggle).toHaveBeenCalledWith(true);
  });

  it("resets internal state when value becomes undefined", () => {
    const testValue = {
      startDate: new Date(2024, 0, 1),
      endDate: new Date(2024, 11, 31),
      isConstant: false
    };

    renderWithTheme(<PeriodDropdown value={testValue} />);

    expect(screen.getByText("2024.01.01 ~ 2024.12.31")).toBeInTheDocument();

    cleanup();

    renderWithTheme(<PeriodDropdown value={undefined} />);

    expect(screen.queryByText(/2024\.01\.01/)).not.toBeInTheDocument();
  });
});
