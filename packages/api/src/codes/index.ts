import { useQuery, useMutation } from "@tanstack/react-query";
import type {
  CodeListResponse,
  CreateCodeRequest,
  CreateCodeResponse
} from "./types";
import type { QueryOptions, MutationOptions } from "@/QueryProvider";
import { instance } from "@/instance";

const DOMAIN = "/codes";

export const useCodeList = (
  type: string,
  keyword?: string,
  parentCode?: number,
  options?: QueryOptions<CodeListResponse>
) => {
  return useQuery({
    queryKey: ["code-list", type, keyword, parentCode],
    queryFn: async () => {
      const { data } = await instance.get<CodeListResponse>(DOMAIN, {
        params: { type, keyword, parent_code: parentCode }
      });
      return data;
    },
    ...options
  });
};

export const useCreateCode = (
  options?: MutationOptions<CreateCodeRequest, CreateCodeResponse>
) => {
  return useMutation({
    mutationFn: async request => {
      const { data } = await instance.post<CreateCodeResponse>(DOMAIN, request);
      return data;
    },
    ...options
  });
};
