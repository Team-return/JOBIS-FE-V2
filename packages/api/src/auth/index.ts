import { useMutation } from "@tanstack/react-query";
import type { LoginRequest, LoginResponse } from "./types";
import { instance } from "@/instance";

const DOMAIN = "/auth";

export const useCompanyLogin = (request: LoginRequest) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await instance.post<LoginResponse>(
        `${DOMAIN}/company`,
        request
      );
      return data;
    }
  });
};

export const useAuthCodeCheck = (email: string, code: string) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/code?email=${email}&auth_code=${code}`);
    }
  });
};

export const useSendAuthCode = (email: string, codeType: string) => {
  return useMutation({
    mutationFn: async () => {
      await instance.post(`${DOMAIN}/code`, {
        email,
        auth_code_type: codeType
      });
    }
  });
};
