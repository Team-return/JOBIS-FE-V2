import { useMutation } from "@tanstack/react-query";
import type { LoginRequest, LoginResponse } from "./types";
import type { MutationOptions } from "@/QueryProvider";
import { createMutationHook } from "@/create-hook";
import { instance } from "@/instance";

const DOMAIN = "/auth";

export const useCompanyLogin = createMutationHook<LoginRequest, LoginResponse>({
  domain: `${DOMAIN}/company`,
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
  { email: string; codeType: string },
  void
>({
  domain: `${DOMAIN}/code`,
  method: "post"
});
