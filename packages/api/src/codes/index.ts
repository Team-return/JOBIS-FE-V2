import type {
  CodeListResponse,
  CreateCodeRequest,
  CreateCodeResponse
} from "./types";
import { createQueryHook, createMutationHook } from "@/create-hook";
import { codesKeys } from "./keys";

const DOMAIN = "/codes";

export { codesKeys };

export const useCodeList = (
  type: string,
  keyword?: string,
  parentCode?: number
) => {
  return createQueryHook<
    { type: string; keyword?: string; parent_code?: number },
    CodeListResponse
  >({
    domain: DOMAIN,
    queryKey: () => codesKeys.codeList(type, keyword, parentCode)
  })({
    type,
    keyword,
    parent_code: parentCode
  });
};

export const useCreateCode = createMutationHook<
  CreateCodeRequest,
  CreateCodeResponse
>({
  domain: DOMAIN,
  method: "post"
});
