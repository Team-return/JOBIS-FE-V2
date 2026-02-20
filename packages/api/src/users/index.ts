import type { LoginRequest, LoginResponse } from "./types";
import { createMutationHook } from "@/create-hook";

const DOMAIN = "/users";

export const useLogin = createMutationHook<LoginRequest, LoginResponse>({
  domain: `${DOMAIN}/login`,
  method: "post"
});
