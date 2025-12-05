import { useMutation } from "@tanstack/react-query";
import type { MutationOptions } from "@/QueryProvider";
import axios from "axios";

export const getFile = async (url: string) => {
  const res = await axios.get(`${import.meta.env.BASE_URL}${encodeURI(url)}`, {
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "application/pdf",
      "Accept": "application/pdf"
    }
  });
  return res;
};

export const usePresignLogoFile = (
  getFileCallback: (arg: void) => File,
  options?: MutationOptions<string, string>
) => {
  const file = getFileCallback();
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
    }>(`${import.meta.env.VITE_BASE_URL}/files/pre-signed`, {
      files: [logo]
    });
    return { data, presignedFile: targetFile };
  };
  return useMutation({
    ...options,
    mutationFn: () =>
      presign(file).then(({ data, presignedFile }) => {
        const url = data.urls[0];

        return new Promise<string>(resolve => {
          axios
            .put(url.pre_signed_url, presignedFile)
            .then(() =>
              resolve(`${import.meta.env.VITE_FILE_URL}${url.file_path}`)
            );
        });
      })
  });
};
