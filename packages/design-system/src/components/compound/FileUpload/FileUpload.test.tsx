import { fireEvent, screen } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import { FileUpload } from "./FileUpload";
import { renderWithTheme } from "@/utils/render";

describe("FileUpload", () => {
  it("renders correctly with a label", () => {
    renderWithTheme(<FileUpload label="파일 추가하기" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("파일 추가하기")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    renderWithTheme(<FileUpload label="파일 추가하기" onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    renderWithTheme(
      <FileUpload label="업로드 중..." onClick={handleClick} disabled />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
