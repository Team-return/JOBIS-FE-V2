import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  StudentMyResponse,
  UpdateStudentProfileRequest,
  StudentSignupRequest,
  StudentSignupResponse,
  ChangePwByEmailRequest,
  ChangePwRequest
} from "./types";
import type { QueryOptions, MutationOptions } from "@/QueryProvider";
import { createQueryHook, createMutationHook } from "@/create-hook";
import { instance } from "@/instance";
import { studentsKeys } from "./keys";

const DOMAIN = "/students";

export { studentsKeys };

export const useStudentMy = createQueryHook<void, StudentMyResponse>({
  domain: `${DOMAIN}/my`,
  queryKey: studentsKeys.studentMy
});

export const useStudentExists = (
  gcn?: string,
  name?: string,
  options?: QueryOptions<boolean>
) => {
  return useQuery({
    queryKey: studentsKeys.studentExists(gcn, name),
    queryFn: async () => {
      try {
        await instance.get(`${DOMAIN}/exists`, { params: { gcn, name } });
      } catch {
        return false;
      }
      return true;
    },
    ...options
  });
};

export const useUpdateStudentProfile = createMutationHook<
  UpdateStudentProfileRequest,
  void
>({
  domain: `${DOMAIN}/profile`,
  method: "patch"
});

export const useStudentSignup = createMutationHook<
  StudentSignupRequest,
  StudentSignupResponse
>({
  domain: DOMAIN,
  method: "post"
});

export const useChangePwByEmail = createMutationHook<
  ChangePwByEmailRequest,
  void
>({
  domain: `${DOMAIN}/forgotten_password`,
  method: "patch"
});

export const useChangePw = createMutationHook<ChangePwRequest, void>({
  domain: `${DOMAIN}/password`,
  method: "patch"
});

export const useCheckPw = (options?: MutationOptions<{ password: string }>) => {
  return useMutation({
    mutationFn: async ({ password }) => {
      await instance.get(`${DOMAIN}/password`, { params: { password } });
    },
    ...options
  });
};
