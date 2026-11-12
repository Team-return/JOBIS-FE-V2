import { describe, it, expect, vi } from "vitest";
import { screen, cleanup, within } from "@testing-library/react";
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
    renderWithTheme(<Dropdown options={options} type="supportJob" />);

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    const input = screen.getByPlaceholderText("검색어를 입력해주세요");
    await user.type(input, "백엔드");

    expect(screen.getByText("백엔드")).toBeInTheDocument();
    expect(screen.queryByText("프론트엔드")).not.toBeInTheDocument();
  });

  it("marks the selected supportJob tag and clears it when clicked again", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    renderWithTheme(
      <Dropdown
        options={options}
        type="supportJob"
        $defaultValue="backend"
        isOpen
        onChange={handleChange}
      />
    );

    // 열기 버튼도 고른 값(백엔드)을 이름으로 가지므로 패널 안에서만 찾는다
    const panel = within(screen.getByRole("dialog"));

    expect(panel.getByRole("button", { name: "백엔드" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(panel.getByRole("button", { name: "프론트엔드" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );

    await user.click(panel.getByRole("button", { name: "백엔드" }));
    expect(handleChange).toHaveBeenLastCalledWith("");

    expect(panel.getByRole("button", { name: "백엔드" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );

    await user.click(panel.getByRole("button", { name: "프론트엔드" }));
    expect(handleChange).toHaveBeenLastCalledWith("frontend");
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

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Dropdown options={options} $placeholder="상태변경" />);

    const trigger = screen.getByRole("button", { name: "상태변경" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });

  it("keeps focus on another field when closed with Escape", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <>
        <Dropdown options={options} $placeholder="상태" />
        <input aria-label="검색" />
      </>
    );

    await user.click(screen.getByRole("button", { name: "상태" }));
    const input = screen.getByRole("textbox", { name: "검색" });
    input.focus();
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it("asks the parent to close on Escape in controlled mode", async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn();
    renderWithTheme(
      <Dropdown options={options} isOpen onToggle={handleToggle} />
    );

    await user.keyboard("{Escape}");

    expect(handleToggle).toHaveBeenCalledWith(false);
  });

  it("exposes options as a listbox with the selected option marked", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Dropdown options={options} value="backend" />);

    const trigger = screen.getByRole("button", { name: "백엔드" });
    await user.click(trigger);

    const listbox = screen.getByRole("listbox");
    expect(trigger).toHaveAttribute("aria-controls", listbox.id);
    expect(screen.getByRole("option", { name: "백엔드" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("option", { name: "디자이너" })).toHaveAttribute(
      "aria-selected",
      "false"
    );
  });

  it("moves focus to the selected option on open with a roving tabindex", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Dropdown options={options} value="backend" />);

    const trigger = screen.getByRole("button", { name: "백엔드" });
    await user.click(trigger);

    expect(screen.getByRole("listbox")).toHaveAttribute(
      "aria-labelledby",
      trigger.id
    );
    const selectedOption = screen.getByRole("option", { name: "백엔드" });
    expect(selectedOption).toHaveFocus();
    expect(selectedOption).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("option", { name: "프론트엔드" })).toHaveAttribute(
      "tabindex",
      "-1"
    );
    expect(screen.getByRole("option", { name: "디자이너" })).toHaveAttribute(
      "tabindex",
      "-1"
    );
  });

  it("moves between options with arrow, Home and End keys", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Dropdown options={options} />);

    await user.click(screen.getByRole("button"));
    const [frontend, backend, designer] = screen.getAllByRole("option");
    expect(frontend).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(backend).toHaveFocus();
    await user.keyboard("{End}");
    expect(designer).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(designer).toHaveFocus();
    await user.keyboard("{Home}");
    expect(frontend).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(frontend).toHaveFocus();
  });

  it("opens from the trigger with ArrowDown", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Dropdown options={options} $placeholder="분야" />);

    screen.getByRole("button", { name: "분야" }).focus();
    await user.keyboard("{ArrowDown}");

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "프론트엔드" })).toHaveFocus();
  });

  it("selects an option with Enter and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    renderWithTheme(<Dropdown options={options} onChange={handleChange} />);

    const trigger = screen.getByRole("button");
    await user.click(trigger);
    await user.keyboard("{End}{Enter}");

    expect(handleChange).toHaveBeenCalledWith("designer");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("selects an option with Space without reopening the list", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    renderWithTheme(<Dropdown options={options} onChange={handleChange} />);

    const trigger = screen.getByRole("button");
    await user.click(trigger);
    await user.keyboard("{ArrowDown}[Space]");

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("backend");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes when Tab moves focus out of the list", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <>
        <Dropdown options={options} />
        <button type="button">다음</button>
      </>
    );

    await user.click(screen.getAllByRole("button")[0]);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.tab();

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
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

  it("applies dates typed into the inputs without opening the calendar", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    renderWithTheme(<PeriodDropdown onChange={handleChange} />);

    await user.click(screen.getByRole("button"));

    const startInput = screen.getByLabelText("모집 시작일");
    await user.click(startInput);
    expect(screen.queryByText("MON")).not.toBeInTheDocument();

    await user.type(startInput, "20261008");
    expect(startInput).toHaveValue("2026.10.08");

    await user.type(screen.getByLabelText("모집 종료일"), "2026.10.31");
    await user.click(screen.getByRole("button", { name: "확인" }));

    expect(handleChange).toHaveBeenCalledWith({
      startDate: new Date(2026, 9, 8),
      endDate: new Date(2026, 9, 31),
      isConstant: false
    });
  });

  it("clears a typed date that does not exist on blur", async () => {
    const user = userEvent.setup();

    renderWithTheme(<PeriodDropdown />);

    await user.click(screen.getByRole("button"));

    const startInput = screen.getByLabelText("모집 시작일");
    await user.type(startInput, "20260230");
    await user.tab();

    expect(startInput).toHaveValue("");
  });

  it("closes the calendar first and then the panel on Escape", async () => {
    const user = userEvent.setup();

    renderWithTheme(<PeriodDropdown />);

    const trigger = screen.getByRole("button", { name: "기간 설정" });
    await user.click(trigger);
    await user.click(
      screen.getByRole("button", { name: "모집 시작일 달력 열기" })
    );
    expect(screen.getByText("MON")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("MON")).not.toBeInTheDocument();
    expect(screen.getByText("모집기간")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "모집 시작일 달력 열기" })
    ).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("모집기간")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("labels the reset and close buttons", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    renderWithTheme(<PeriodDropdown onChange={handleChange} />);

    await user.click(screen.getByRole("button"));
    expect(
      screen.getByRole("dialog", { name: "모집기간 설정" })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "모집기간 초기화" }));
    expect(screen.getByRole("checkbox")).not.toBeChecked();

    await user.click(screen.getByRole("button", { name: "모집기간 닫기" }));
    expect(screen.queryByText("모집기간")).not.toBeInTheDocument();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("opens the calendar only from the calendar icon", async () => {
    const user = userEvent.setup();

    renderWithTheme(<PeriodDropdown />);

    await user.click(screen.getByRole("button"));
    await user.click(
      screen.getByRole("button", { name: "모집 시작일 달력 열기" })
    );

    expect(screen.getByText("MON")).toBeInTheDocument();
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
