import { useMutation } from "@tanstack/react-query";
import type { LoginRequest, LoginResponse } from "./types";
import type { MutationOptions } from "@/QueryProvider";
import { instance } from "@/instance";

const DOMAIN = "/auth";

export const useCompanyLogin = (
  options?: MutationOptions<LoginRequest, LoginResponse>
) => {
  return useMutation({
    mutationFn: async request => {
      const { data } = await instance.post<LoginResponse>(
        `${DOMAIN}/company`,
        request
      );
      return data;
    },
    ...options
  });
};

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

export const useSendAuthCode = (
  options?: MutationOptions<{ email: string; codeType: string }>
) => {
  return useMutation({
    mutationFn: async ({ email, codeType }) => {
      await instance.post(`${DOMAIN}/code`, {
        email,
        auth_code_type: codeType
      });
    },
    ...options
  });
};
