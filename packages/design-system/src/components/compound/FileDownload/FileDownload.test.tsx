import { fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, describe, it, vi } from "vitest";
import { FileDownload } from "./FileDownload";
import { renderWithTheme } from "@/utils/render";

describe("FileDownload", () => {
  it("renders correctly with a label", () => {
    renderWithTheme(<FileDownload label="MyFile.pdf" fileUrl="/mock.pdf" />);
    const component = screen.getByRole("button");
    expect(component).toBeInTheDocument();
    expect(screen.getByText("MyFile.pdf")).toBeInTheDocument();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("downloads the file under its label when clicked", async () => {
    const fetchMock = vi.fn(async () => new Response("pdf"));
    vi.stubGlobal("fetch", fetchMock);
    URL.createObjectURL = vi.fn(() => "blob:http://localhost/1");
    URL.revokeObjectURL = vi.fn();
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    renderWithTheme(<FileDownload label="MyFile.pdf" fileUrl="/mock.pdf" />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(clickSpy).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith("/mock.pdf", { cache: "no-store" });
    const link = clickSpy.mock.instances[0] as unknown as HTMLAnchorElement;
    expect(link.download).toBe("MyFile.pdf");
  });

  it("does not render a remove button without onRemove", () => {
    renderWithTheme(<FileDownload label="MyFile.pdf" fileUrl="/mock.pdf" />);
    expect(screen.queryByLabelText("MyFile.pdf 삭제")).not.toBeInTheDocument();
  });

  it("calls onRemove when the remove button is clicked", () => {
    const onRemove = vi.fn();
    renderWithTheme(
      <FileDownload
        label="MyFile.pdf"
        fileUrl="/mock.pdf"
        onRemove={onRemove}
      />
    );

    fireEvent.click(screen.getByLabelText("MyFile.pdf 삭제"));

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("does not trigger a download when the remove button is clicked", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderWithTheme(
      <FileDownload label="MyFile.pdf" fileUrl="/mock.pdf" onRemove={vi.fn()} />
    );

    fireEvent.click(screen.getByLabelText("MyFile.pdf 삭제"));

    expect(fetchMock).not.toHaveBeenCalled();
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
