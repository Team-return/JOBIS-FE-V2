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
