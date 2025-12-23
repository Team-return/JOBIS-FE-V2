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
import { instance } from "@/instance";
import { studentsKeys } from "./keys";

const DOMAIN = "/students";

export { studentsKeys };

export const useStudentMy = (options?: QueryOptions<StudentMyResponse>) => {
  return useQuery({
    queryKey: studentsKeys.studentMy(),
    queryFn: async () => {
      const { data } = await instance.get<StudentMyResponse>(`${DOMAIN}/my`);
      return data;
    },
    ...options
  });
};

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

export const useUpdateStudentProfile = (
  options?: MutationOptions<UpdateStudentProfileRequest>
) => {
  return useMutation({
    mutationFn: async (request: UpdateStudentProfileRequest) => {
      await instance.patch(`${DOMAIN}/profile`, request);
    },
    ...options
  });
};

export const useStudentSignup = (
  options?: MutationOptions<StudentSignupRequest, StudentSignupResponse>
) => {
  return useMutation({
    mutationFn: async request => {
      const { data } = await instance.post<StudentSignupResponse>(
        DOMAIN,
        request
      );
      return data;
    },
    ...options
  });
};

export const useChangePwByEmail = (
  options?: MutationOptions<ChangePwByEmailRequest>
) => {
  return useMutation({
    mutationFn: async request => {
      await instance.patch(`${DOMAIN}/forgotten_password`, request);
    },
    ...options
  });
};

export const useChangePw = (options?: MutationOptions<ChangePwRequest>) => {
  return useMutation({
    mutationFn: async request => {
      await instance.patch(`${DOMAIN}/password`, request);
    },
    ...options
  });
};

export const useCheckPw = (options?: MutationOptions<{ password: string }>) => {
  return useMutation({
    mutationFn: async ({ password }) => {
      await instance.get(`${DOMAIN}/password`, { params: { password } });
    },
    ...options
  });
};
