import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CompanyTypeClip } from "./CompanyTypeClip";
import { renderWithTheme } from "@/utils";

describe("CompanyTypeClip", () => {
  it("renders correctly with participation type", () => {
    renderWithTheme(<CompanyTypeClip $type="participation" />);
    const clipElement = screen.getByText("참여기업");
    expect(clipElement).toBeInTheDocument();
  });

  it("renders correctly with leader type", () => {
    renderWithTheme(<CompanyTypeClip $type="leader" />);
    const clipElement = screen.getByText("선도기업");
    expect(clipElement).toBeInTheDocument();
  });
});
