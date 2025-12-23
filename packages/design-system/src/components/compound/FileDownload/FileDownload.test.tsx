import { fireEvent, screen } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import { FileDownload } from "./FileDownload";
import { renderWithTheme } from "@/utils/render";

describe("FileDownload", () => {
  it("renders correctly with a label", () => {
    renderWithTheme(<FileDownload label="MyFile.pdf" fileUrl="/mock.pdf" />);
    const component = screen.getByRole("button");
    expect(component).toBeInTheDocument();
    expect(screen.getByText("MyFile.pdf")).toBeInTheDocument();
  });

  it("triggers file download when clicked", () => {
    // anchor 태그 생성 동작을 spy로 감시
    const createElementSpy = vi.spyOn(document, "createElement");
    renderWithTheme(<FileDownload label="MyFile.pdf" fileUrl="/mock.pdf" />);
    const component = screen.getByRole("button");

    fireEvent.click(component);

    expect(createElementSpy).toHaveBeenCalledWith("a");
    createElementSpy.mockRestore();
  });

  it("renders with underline style when done", () => {
    renderWithTheme(
      <FileDownload label="MyFile.pdf" fileUrl="/mock.pdf" $done />
    );
    const textElement = screen.getByText("MyFile.pdf");
    const styles = window.getComputedStyle(textElement);
    expect(styles.textDecorationLine).toBe("underline");
  });

  it("renders without underline style when not done", () => {
    renderWithTheme(
      <FileDownload label="MyFile.pdf" fileUrl="/mock.pdf" $done={false} />
    );
    const textElement = screen.getByText("MyFile.pdf");
    const styles = window.getComputedStyle(textElement);
    expect(styles.textDecorationLine).not.toBe("underline");
  });
});
