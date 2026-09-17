import type { LoginRequest, LoginResponse } from "./types";
import { createDomainApi } from "@/create-hook";

const DOMAIN = "/users";
const { createMutationHook } = createDomainApi(DOMAIN);

export const useLogin = createMutationHook<LoginRequest, LoginResponse>({
  path: "/login",
  method: "post"
});
