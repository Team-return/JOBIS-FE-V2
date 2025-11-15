import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/utils";
import { Toast } from "./Toast";

describe("Toast", () => {
  it("should render the label", () => {
    renderWithTheme(<Toast $label="Hello!" $type="info" />);
    expect(screen.getByText("Hello!")).toBeInTheDocument();
  });

  it("should render the success icon when $type is success", () => {
    renderWithTheme(<Toast $label="Success!" $type="success" />);
    expect(
      screen.getByRole("img", { name: "ToastSuccess" })
    ).toBeInTheDocument();
  });

  it("should render the error icon when $type is error", () => {
    renderWithTheme(<Toast $label="Error!" $type="error" />);
    expect(screen.getByRole("img", { name: "ToastError" })).toBeInTheDocument();
  });

  it("should render the warning icon when $type is warning", () => {
    renderWithTheme(<Toast $label="Warning!" $type="warning" />);
    expect(
      screen.getByRole("img", { name: "ToastWarning" })
    ).toBeInTheDocument();
  });

  it("should render the info icon when $type is info", () => {
    renderWithTheme(<Toast $label="Info!" $type="info" />);
    expect(screen.getByRole("img", { name: "ToastInfo" })).toBeInTheDocument();
  });
});
