import { useMutation } from "@tanstack/react-query";
import type { MutationOptions } from "@/QueryProvider";
import { config } from "@/config";
import { instance } from "@/instance";
import axios from "axios";

export type FileUploadType = "LOGO_IMAGE" | "EXTENSION_FILE";

interface PresignedUrl {
  file_path: string;
  pre_signed_url: string;
}

/**
 * presigned URL을 발급받아 S3로 직접 올리고, 저장된 경로 목록을 돌려준다.
 * 반환값은 `EXTENSION_FILE/{uuid}-{파일명}` 형태의 상대 경로이며,
 * 화면에 노출할 때는 `import.meta.env.FILE_URL`을 앞에 붙여 사용한다.
 */
export const useUploadFiles = (
  type: FileUploadType,
  options?: MutationOptions<File[], string[]>
) =>
  useMutation({
    ...options,
    mutationFn: async (files: File[]) => {
      const { data } = await instance.post<{ urls: PresignedUrl[] }>(
        "/files/pre-signed",
        { files: files.map(file => ({ type, file_name: file.name })) }
      );

      // presigned URL에는 서명이 들어있어 Authorization 헤더를 붙이면 안 되므로
      // 인터셉터가 걸린 instance 대신 순수 axios로 올린다.
      await Promise.all(
        data.urls.map(({ pre_signed_url }, index) =>
          axios.put(pre_signed_url, files[index], {
            headers: {
              "Content-Type": files[index].type || "application/octet-stream"
            },
            // 기본 timeout(10초)으로는 조금만 큰 파일도 업로드 도중에 끊긴다
            timeout: 60000
          })
        )
      );

      return data.urls.map(({ file_path }) => file_path);
    }
  });

export const getFile = async (url: string) => {
  const res = await axios.get(`${config.baseUrl}${encodeURI(url)}`, {
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "application/pdf",
      "Accept": "application/pdf"
    }
  });
  return res;
};

export const usePresignLogoFile = (options?: MutationOptions<File, string>) => {
  const presign = async (targetFile: File) => {
    const logo = {
      type: "LOGO_IMAGE",
      file_name: targetFile.name
    };
    const { data } = await axios.post<{
      urls: {
        file_path: string;
        pre_signed_url: string;
      }[];
    }>(`${config.baseUrl}/files/pre-signed`, {
      files: [logo]
    });
    return { data, presignedFile: targetFile };
  };
  return useMutation({
    ...options,
    mutationFn: file =>
      presign(file).then(({ data, presignedFile }) => {
        const url = data.urls[0];

        return new Promise<string>(resolve => {
          axios
            .put(url.pre_signed_url, presignedFile)
            .then(() => resolve(`${import.meta.env.FILE_URL}${url.file_path}`));
        });
      })
  });
};
