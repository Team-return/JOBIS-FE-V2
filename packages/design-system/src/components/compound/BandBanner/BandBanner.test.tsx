import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { renderWithTheme } from "@/utils/render";
import { BandBanner } from "./BandBanner";
import type { Props } from "./BandBanner.type";

describe("BandBanner", () => {
  const props: Props = {
    onClick: vi.fn()
  };

  it("renders banner image with accessible alt text", () => {
    renderWithTheme(<BandBanner {...props} />);

    expect(
      screen.getByRole("img", { name: "배너 배경 이미지" })
    ).toBeInTheDocument();
  });
});
