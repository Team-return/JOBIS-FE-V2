import { useMutation } from "@tanstack/react-query";
import type { LoginRequest, LoginResponse } from "./types";
import type { MutationOptions } from "@/QueryProvider";
import { createDomainApi } from "@/create-hook";
import { instance } from "@/instance";

const DOMAIN = "/auth";
const { createMutationHook } = createDomainApi(DOMAIN);

export const useCompanyLogin = createMutationHook<LoginRequest, LoginResponse>({
  path: "/company",
  method: "post"
});

export const useAuthCodeCheck = (
  options?: MutationOptions<{ email: string; code: string }>
) => {
  return useMutation({
    mutationFn: async ({ email, code }) => {
      await instance.patch(`${DOMAIN}/code?email=${email}&auth_code=${code}`);
    },
    ...options
  });
};

export const useSendAuthCode = createMutationHook<
  { email: string; auth_code_type: string },
  void
>({
  path: "/code",
  method: "post"
});
