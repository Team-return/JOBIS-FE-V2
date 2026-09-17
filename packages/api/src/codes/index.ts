import type {
  CodeListResponse,
  CreateCodeRequest,
  CreateCodeResponse
} from "./types";
import { createDomainApi } from "@/create-hook";
import { codesKeys } from "./keys";

const DOMAIN = "/codes";
const { createQueryHook, createMutationHook } = createDomainApi(DOMAIN);

export { codesKeys };

export const useCodeList = createQueryHook<
  { type: string; keyword?: string; parent_code?: number },
  CodeListResponse
>({
  path: "/",
  queryKey: codesKeys.codeList
});

export const useCreateCode = createMutationHook<
  CreateCodeRequest,
  CreateCodeResponse
>({
  path: "/",
  method: "post"
});
