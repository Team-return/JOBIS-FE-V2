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
