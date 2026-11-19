// 클릭 직후 해제하면 일부 브라우저에서 저장이 끊겨 FileSaver.js와 같은 여유를 둔다
const REVOKE_DELAY_MS = 40_000;

/**
 * S3처럼 출처가 다른 주소는 a 태그 download 속성이 무시돼 브라우저가 파일을 열어 버린다.
 * blob으로 받아 같은 출처 주소로 바꾼 뒤 내려받고, 받지 못하면 새 탭으로 연다
 */
export const downloadFile = async (url: string, fileName: string) => {
  try {
    // 캐시된 응답에 CORS 헤더가 없으면 fetch가 막히므로 매번 새로 받는다
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`${res.status}`);

    const blobUrl = URL.createObjectURL(await res.blob());
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), REVOKE_DELAY_MS);
  } catch {
    window.open(url, "_blank", "noopener");
  }
};
