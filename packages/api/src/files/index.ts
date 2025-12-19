import { useMutation } from "@tanstack/react-query";
import type { MutationOptions } from "@/QueryProvider";
import { config } from "..";
import axios from "axios";

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
