import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  StudentMyResponse,
  UpdateStudentProfileRequest,
  StudentSignupRequest,
  StudentSignupResponse,
  ChangePwByEmailRequest,
  ChangePwRequest
} from "./types";
import { instance } from "@/instance";

const DOMAIN = "/students";

export const useStudentMy = () => {
  return useQuery({
    queryKey: ["student-my"],
    queryFn: async () => {
      const { data } = await instance.get<StudentMyResponse>(`${DOMAIN}/my`);
      return data;
    }
  });
};

export const useStudentExists = (gcn?: string, name?: string) => {
  return useQuery({
    queryKey: ["student-exists", gcn, name],
    queryFn: async () => {
      try {
        await instance.get(`${DOMAIN}/exists`, { params: { gcn, name } });
      } catch {
        return false;
      }
      return true;
    }
  });
};

export const useUpdateStudentProfile = () => {
  return useMutation({
    mutationFn: async (request: UpdateStudentProfileRequest) => {
      await instance.patch(`${DOMAIN}/profile`, request);
    }
  });
};

export const useStudentSignup = (request: StudentSignupRequest) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await instance.post<StudentSignupResponse>(
        DOMAIN,
        request
      );
      return data;
    }
  });
};

export const useChangePwByEmail = (request: ChangePwByEmailRequest) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/forgotten_password`, request);
    }
  });
};

export const useChangePw = (request: ChangePwRequest) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/password`, request);
    }
  });
};

export const useCheckPw = (password: string) => {
  return useMutation({
    mutationFn: async () => {
      await instance.get(`${DOMAIN}/password`, { params: { password } });
    }
  });
};
