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

const DOMAIN = "/students";

export const useStudentMy = (options?: QueryOptions<StudentMyResponse>) => {
  return useQuery({
    queryKey: ["student-my"],
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
    queryKey: ["student-exists", gcn, name],
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
  request: StudentSignupRequest,
  options?: MutationOptions<StudentSignupRequest, StudentSignupResponse>
) => {
  return useMutation({
    mutationFn: async () => {
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
  request: ChangePwByEmailRequest,
  options?: MutationOptions<void>
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/forgotten_password`, request);
    },
    ...options
  });
};

export const useChangePw = (
  request: ChangePwRequest,
  options?: MutationOptions<void>
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/password`, request);
    },
    ...options
  });
};

export const useCheckPw = (
  password: string,
  options?: MutationOptions<void>
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.get(`${DOMAIN}/password`, { params: { password } });
    },
    ...options
  });
};
