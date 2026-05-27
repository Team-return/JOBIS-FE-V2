import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "@/utils/render";
import { ListSection } from "./ListSection";

describe("ListSection", () => {
  it("renders view-all button", () => {
    renderWithTheme(<ListSection />);

    expect(
      screen.getByRole("button", { name: "전체보기" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("ChevronRight")).toBeInTheDocument();
  });

  it("calls onClickViewAll when view-all clicked", async () => {
    const user = userEvent.setup();
    const onClickViewAll = vi.fn();
    renderWithTheme(<ListSection onClickViewAll={onClickViewAll} />);

    await user.click(screen.getByRole("button", { name: "전체보기" }));
    expect(onClickViewAll).toHaveBeenCalledTimes(1);
  });
});
