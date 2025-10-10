import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ApplicationState } from "./ApplicationState";
import { renderWithTheme } from "@/utils";
import { lightTheme } from "@/themes";

describe("ApplicationState", () => {
  const defaultProps = {
    types: "passed" as const,
    imgUrl:
      "https://jobis-store.s3.ap-northeast-2.amazonaws.com/company_logo/vivar.png",
    companyName: "비바리퍼블리카",
    date: "2025.09.28"
  };

  it("should render all text content correctly", () => {
    renderWithTheme(<ApplicationState {...defaultProps} />);

    expect(screen.getByText(defaultProps.companyName)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.date)).toBeInTheDocument();
    expect(screen.getByText("합격")).toBeInTheDocument();
  });

  it("should render the company logo correctly", () => {
    renderWithTheme(<ApplicationState {...defaultProps} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", defaultProps.imgUrl);
  });

  it("should apply correct styles for 'passed' status", () => {
    renderWithTheme(<ApplicationState {...defaultProps} types="passed" />);

    const statusTextElement = screen.getByText("합격");
    const statusContainerElement = statusTextElement.parentElement;

    const expectedTextColor = lightTheme.color.subColor.green[20];
    expect(statusTextElement).toHaveStyle(`color: ${expectedTextColor}`);

    const expectedBgColor = lightTheme.color.subColor.green[10];
    expect(statusContainerElement).toHaveStyle(
      `background-color: ${expectedBgColor}`
    );
  });

  it("should apply correct styles for 'failed' status", () => {
    renderWithTheme(<ApplicationState {...defaultProps} types="failed" />);

    const statusTextElement = screen.getByText("탈락");
    const statusContainerElement = statusTextElement.parentElement;

    const expectedTextColor = lightTheme.color.subColor.red[20];
    expect(statusTextElement).toHaveStyle(`color: ${expectedTextColor}`);

    const expectedBgColor = lightTheme.color.subColor.red[10];
    expect(statusContainerElement).toHaveStyle(
      `background-color: ${expectedBgColor}`
    );
  });
});
