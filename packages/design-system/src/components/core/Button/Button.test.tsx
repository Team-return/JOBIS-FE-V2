import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";
import { renderWithTheme } from "@/utils/render";

describe("Button", () => {
  it("renders correctly with children", () => {
    renderWithTheme(<Button>Click me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("handles onClick event", async () => {
    const handleClick = vi.fn();
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    await userEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    renderWithTheme(<Button disabled>Click me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeDisabled();
  });

  it("renders correctly with sm size", () => {
    renderWithTheme(<Button $size="sm">Small Button</Button>);
    const buttonElement = screen.getByRole("button", { name: /small button/i });
    expect(buttonElement).toBeInTheDocument();
  });

  describe("$hoverDisabled prop", () => {
    it("renders without error when $hoverDisabled is true", () => {
      renderWithTheme(<Button $hoverDisabled>No Hover</Button>);
      const buttonElement = screen.getByRole("button", { name: /no hover/i });
      expect(buttonElement).toBeInTheDocument();
    });

    it("renders without error when $hoverDisabled is false (default hover behavior)", () => {
      renderWithTheme(<Button $hoverDisabled={false}>With Hover</Button>);
      const buttonElement = screen.getByRole("button", { name: /with hover/i });
      expect(buttonElement).toBeInTheDocument();
    });

    it("renders correctly with outline variant and $hoverDisabled", () => {
      renderWithTheme(
        <Button $variant="outline" $hoverDisabled>
          Outline No Hover
        </Button>
      );
      const buttonElement = screen.getByRole("button", {
        name: /outline no hover/i
      });
      expect(buttonElement).toBeInTheDocument();
    });

    it("still fires click events when $hoverDisabled is true", async () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <Button $hoverDisabled onClick={handleClick}>
          Clickable
        </Button>
      );
      const buttonElement = screen.getByRole("button", { name: /clickable/i });
      await userEvent.click(buttonElement);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("$padding prop", () => {
    it("renders correctly with a numeric $padding value", () => {
      renderWithTheme(<Button $padding={16}>Padded Button</Button>);
      const buttonElement = screen.getByRole("button", {
        name: /padded button/i
      });
      expect(buttonElement).toBeInTheDocument();
    });

    it("renders correctly with a string $padding value", () => {
      renderWithTheme(<Button $padding="10px 20px">String Padded</Button>);
      const buttonElement = screen.getByRole("button", {
        name: /string padded/i
      });
      expect(buttonElement).toBeInTheDocument();
    });

    it("renders correctly with a 4-element array $padding value", () => {
      renderWithTheme(
        <Button $padding={[32, 779, 34, 32]}>Array Padded</Button>
      );
      const buttonElement = screen.getByRole("button", {
        name: /array padded/i
      });
      expect(buttonElement).toBeInTheDocument();
    });

    it("renders correctly with a 2-element array $padding value", () => {
      renderWithTheme(<Button $padding={[8, 16]}>Two-value Padded</Button>);
      const buttonElement = screen.getByRole("button", {
        name: /two-value padded/i
      });
      expect(buttonElement).toBeInTheDocument();
    });

    it("applies custom padding style when $padding is provided as array", () => {
      renderWithTheme(
        <Button $padding={[32, 779, 34, 32]}>Custom Padded</Button>
      );
      const buttonElement = screen.getByRole("button", {
        name: /custom padded/i
      });
      expect(buttonElement).toHaveStyle("padding: 32px 779px 34px 32px");
    });

    it("applies custom padding style when $padding is a number", () => {
      renderWithTheme(<Button $padding={24}>Numeric Padding</Button>);
      const buttonElement = screen.getByRole("button", {
        name: /numeric padding/i
      });
      expect(buttonElement).toHaveStyle("padding: 24px");
    });

    it("combines $padding with other props correctly", () => {
      renderWithTheme(
        <Button $variant="outline" $size="lg" $padding={[32, 779, 34, 32]}>
          Combined Props
        </Button>
      );
      const buttonElement = screen.getByRole("button", {
        name: /combined props/i
      });
      expect(buttonElement).toBeInTheDocument();
    });
  });

  describe("$padding and $hoverDisabled combined", () => {
    it("renders correctly with both $padding and $hoverDisabled props", () => {
      renderWithTheme(
        <Button $size="sm" $hoverDisabled $padding={[8, 12]}>
          작성하기 →
        </Button>
      );
      const buttonElement = screen.getByRole("button", { name: /작성하기/i });
      expect(buttonElement).toBeInTheDocument();
    });

    it("still handles click with both $padding and $hoverDisabled", async () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <Button $size="sm" $hoverDisabled $padding={[8, 12]} onClick={handleClick}>
          작성하기
        </Button>
      );
      const buttonElement = screen.getByRole("button", { name: /작성하기/i });
      await userEvent.click(buttonElement);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
