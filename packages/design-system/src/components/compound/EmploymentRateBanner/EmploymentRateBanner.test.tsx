import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { renderWithTheme } from "@/utils/render";
import { EmploymentRateBanner } from "./EmploymentRateBanner";
import type { Props } from "./EmploymentRateBanner.type";

describe("EmploymentRateBanner", () => {
  const props: Props = {
    onClick: vi.fn()
  };

  it("renders banner image with accessible alt text", () => {
    renderWithTheme(<EmploymentRateBanner {...props} />);

    expect(
      screen.getByRole("img", { name: "배너 배경 이미지" })
    ).toBeInTheDocument();
  });
});
