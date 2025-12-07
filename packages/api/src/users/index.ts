import { useMutation } from "@tanstack/react-query";
import type { LoginRequest, LoginResponse } from "./types";
import type { MutationOptions } from "@/QueryProvider";
import { instance } from "@/instance";

const DOMAIN = "/users";

export const useLogin = (
  options?: MutationOptions<LoginRequest, LoginResponse>
) => {
  return useMutation({
    mutationFn: async request => {
      const { data } = await instance.post<LoginResponse>(
        `${DOMAIN}/login`,
        request
      );
      return data;
    },
    ...options
  });
};
