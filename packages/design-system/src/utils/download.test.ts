import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { downloadFile } from "./download";

const FILE_URL = "https://bucket.s3.amazonaws.com/EXTENSION_FILE/uuid-a.pdf";

describe("downloadFile", () => {
  let clicked: { href: string; download: string }[];

  beforeEach(() => {
    clicked = [];
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
      this: HTMLAnchorElement
    ) {
      clicked.push({ href: this.href, download: this.download });
    });
    URL.createObjectURL = vi.fn(() => "blob:http://localhost/1");
    URL.revokeObjectURL = vi.fn();
    vi.spyOn(window, "open").mockImplementation(() => null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("다른 출처 파일을 blob 주소로 바꿔 파일명대로 내려받는다", async () => {
    const fetchMock = vi.fn(async () => new Response("pdf"));
    vi.stubGlobal("fetch", fetchMock);

    await downloadFile(FILE_URL, "이력서.pdf");

    expect(fetchMock).toHaveBeenCalledWith(FILE_URL, { cache: "no-store" });
    expect(clicked).toEqual([
      { href: "blob:http://localhost/1", download: "이력서.pdf" }
    ]);
    expect(window.open).not.toHaveBeenCalled();
  });

  it("응답 본문을 blob 주소로 만들고 저장할 시간을 둔 뒤 해제한다", async () => {
    vi.useFakeTimers();
    const blob = new Blob(["pdf"], { type: "application/pdf" });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: true, blob: async () => blob }))
    );

    await downloadFile(FILE_URL, "이력서.pdf");

    expect(URL.createObjectURL).toHaveBeenCalledWith(blob);
    vi.advanceTimersByTime(39_999);
    expect(URL.revokeObjectURL).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:http://localhost/1");
    vi.useRealTimers();
  });

  it("받아오지 못하면 새 탭으로 연다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("Failed to fetch");
      })
    );

    await downloadFile(FILE_URL, "이력서.pdf");

    expect(clicked).toEqual([]);
    expect(window.open).toHaveBeenCalledWith(FILE_URL, "_blank", "noopener");
  });

  it("응답이 실패면 오류 본문을 파일로 저장하지 않고 새 탭으로 연다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("denied", { status: 403 }))
    );

    await downloadFile(FILE_URL, "이력서.pdf");

    expect(clicked).toEqual([]);
    expect(window.open).toHaveBeenCalledWith(FILE_URL, "_blank", "noopener");
  });
});
