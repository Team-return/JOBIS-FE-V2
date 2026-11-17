export const formatDate = (date?: Date | string): string | undefined => {
  if (!date) return undefined;
  // new Date("YYYY-MM-DD")는 UTC 자정이라 서쪽 시간대에서 하루 앞당겨지므로 그 형식만 현지 날짜로 읽는다
  const dateObj =
    typeof date === "string" ? (parseLocalDate(date) ?? new Date(date)) : date;
  // toISOString은 UTC 기준이라 한국 시간 자정에 고른 날짜가 하루 전날로 바뀐다
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * YYYY-MM-DD를 그 날 자정(현지 시간)으로 읽는다. new Date("YYYY-MM-DD")는 UTC 자정이라 formatDate와 어긋난다.
 * 형식이 다르거나 2026-02-30처럼 없는 날짜면 다른 날로 넘기지 않고 null을 돌려준다
 */
export const parseLocalDate = (value: string): Date | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const [year, month, day] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
    ? date
    : null;
};

export const booleanToYN = (value: boolean): string => {
  return value ? "Y" : "N";
};

const ABSOLUTE_URL = /^https?:\/\//i;
const UPLOAD_UUID_PREFIX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-/i;

/**
 * 업로드 API는 `EXTENSION_FILE/{uuid}-{파일명}` 상대 경로를 돌려주므로
 * 화면에서 열거나 내려받을 때는 FILE_URL을 앞에 붙여야 한다.
 */
export const toFileUrl = (url: string): string =>
  ABSOLUTE_URL.test(url) ? url : `${import.meta.env.FILE_URL}/${url}`;

/**
 * 학생이 `github.com/abc`처럼 스킴 없이 적은 링크는 그대로 열면 현재 사이트 기준 상대 경로가 되므로 https://를 붙인다.
 * `javascript:` 같은 스킴은 열지 않도록 http(s)가 아니면 null을 돌려준다
 */
export const toExternalUrl = (url: string): string | null => {
  const trimmed = url.trim();
  if (!trimmed) return null;

  // `notion.so/page?redirect=https://...`처럼 주소 중간의 ://는 스킴이 아니므로 맨 앞에서만 찾는다
  const hasScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed);
  // `mailto:` 같은 다른 스킴에 https://를 붙이면 엉뚱한 주소가 되므로 막는다 (`localhost:3000` 같은 호스트:포트는 제외)
  const hasOtherScheme =
    !hasScheme &&
    /^[a-z][a-z0-9+.-]*:/i.test(trimmed) &&
    !/^[^/?#:]+:\d+(?:[/?#]|$)/.test(trimmed);
  if (hasOtherScheme) return null;

  const withScheme = hasScheme
    ? trimmed
    : `https://${trimmed.replace(/^\/+/, "")}`;

  try {
    const parsed = new URL(withScheme);
    return parsed.protocol === "http:" || parsed.protocol === "https:"
      ? parsed.href
      : null;
  } catch {
    return null;
  }
};

/** 저장된 경로에서 업로드할 때 붙은 uuid 접두사를 떼어 원래 파일명만 돌려준다 */
export const getUploadedFileName = (url: string): string => {
  const path = url.split("?")[0];
  let decoded = path;

  try {
    decoded = decodeURIComponent(path);
  } catch {
    // 인코딩이 깨진 경로는 원본을 그대로 쓴다
  }

  const fileName = decoded.split("/").pop() || url;

  return fileName.replace(UPLOAD_UUID_PREFIX, "") || fileName;
};

const ERROR_REASON: Record<number, string> = {
  400: "요청 값이 올바르지 않습니다.",
  403: "권한이 없습니다.",
  404: "대상을 찾을 수 없습니다."
};

/**
 * API가 던진 상태 코드로 실패 이유를 붙인다. 모르는 코드면 기본 문구만 쓴다.
 * 화면마다 같은 코드의 뜻이 다르면 reasons로 그 화면의 문구를 넘긴다
 */
export const getErrorMessage = (
  error: unknown,
  fallback: string,
  reasons: Record<number, string> = {}
): string => {
  const reason =
    typeof error === "number"
      ? (reasons[error] ?? ERROR_REASON[error])
      : undefined;
  return reason ? `${fallback} ${reason}` : fallback;
};
