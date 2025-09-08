import { useQuery, useMutation } from "@tanstack/react-query";
import type {
  CodeListResponse,
  CreateCodeRequest,
  CreateCodeResponse
} from "./types";
import { instance } from "@/instance";

const DOMAIN = "/codes";

export const useCodeList = (
  type: string,
  keyword?: string,
  parentCode?: number
) => {
  return useQuery({
    queryKey: ["code-list", type, keyword, parentCode],
    queryFn: async () => {
      const { data } = await instance.get<CodeListResponse>(DOMAIN, {
        params: { type, keyword, parent_code: parentCode }
      });
      return data;
    }
  });
};

export const useCreateCode = () => {
  return useMutation({
    mutationFn: async (request: CreateCodeRequest) => {
      const { data } = await instance.post<CreateCodeResponse>(DOMAIN, request);
      return data;
    }
  });
};
