import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CompanyTypeChip } from "./CompanyTypeChip";
import { renderWithTheme } from "@/utils";

describe("CompanyTypeClip", () => {
  it("renders correctly with participation type", () => {
    renderWithTheme(<CompanyTypeChip $type="participation" />);
    const clipElement = screen.getByText("참여기업");
    expect(clipElement).toBeInTheDocument();
  });

  it("renders correctly with leader type", () => {
    renderWithTheme(<CompanyTypeChip $type="leader" />);
    const clipElement = screen.getByText("선도기업");
    expect(clipElement).toBeInTheDocument();
  });
});
