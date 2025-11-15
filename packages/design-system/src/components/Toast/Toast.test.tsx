import { describe, it, expect, vi, afterEach } from "vitest";
import React, { act } from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "@/utils";
import { Toast } from "./Toast";
import { ToastManager } from "./ToastManager";
import { useToast } from "@/hooks";
import { useToastStore } from "@/hooks/useToast";

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

  describe("Toast with useToast", () => {
    afterEach(() => {
      useToastStore.setState({ toasts: [] });
      const root = document.getElementById("toast-root");
      if (root) root.remove();
      vi.useRealTimers();
    });

    const TestComponent = ({
      label = "Hello Toast",
      type = "success" as const
    }: {
      label?: string;
      type?: "success" | "error" | "warning" | "info";
    }) => {
      const { open } = useToast();

      const openToast = () => {
        open(<Toast $label={label} $type={type} />);
      };

      return <button onClick={openToast}>Open Toast</button>;
    };

    const Manager = () => ToastManager() as unknown as React.ReactElement;

    const renderTestComponent = () => {
      renderWithTheme(
        <>
          <TestComponent />
          <Manager />
        </>
      );
    };

    it("should open and show the toast", () => {
      renderTestComponent();
      fireEvent.click(screen.getByText("Open Toast"));
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("should auto-dismiss after default duration", () => {
      vi.useFakeTimers();
      renderTestComponent();
      fireEvent.click(screen.getByText("Open Toast"));
      expect(screen.getByRole("alert")).toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(3000);
      });
      expect(screen.queryAllByRole("alert")).toHaveLength(0);
      vi.useRealTimers();
    });

    it("should stack multiple toasts", () => {
      vi.useFakeTimers();
      renderTestComponent();
      fireEvent.click(screen.getByText("Open Toast"));
      fireEvent.click(screen.getByText("Open Toast"));
      fireEvent.click(screen.getByText("Open Toast"));
      const alerts = screen.getAllByRole("alert");
      expect(alerts.length).toBeGreaterThanOrEqual(3);
      act(() => {
        vi.advanceTimersByTime(3000);
      });
      expect(screen.queryAllByRole("alert")).toHaveLength(0);
      vi.useRealTimers();
    });
  });
});
