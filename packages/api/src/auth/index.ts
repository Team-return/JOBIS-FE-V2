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
