import { useMutation } from "@tanstack/react-query";
import type { LoginRequest, LoginResponse } from "./types";
import type { MutationOptions } from "@/QueryProvider";
import { instance } from "@/instance";

const DOMAIN = "/auth";

export const useCompanyLogin = (
  request: LoginRequest,
  options?: MutationOptions<LoginRequest, LoginResponse>
) => {
  return useMutation({
    mutationFn: async () => {
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
  email: string,
  code: string,
  options?: MutationOptions<void>
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/code?email=${email}&auth_code=${code}`);
    },
    ...options
  });
};

export const useSendAuthCode = (
  email: string,
  codeType: string,
  options?: MutationOptions<void>
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.post(`${DOMAIN}/code`, {
        email,
        auth_code_type: codeType
      });
    },
    ...options
  });
};
