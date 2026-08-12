import { create } from "zustand";

interface AuthState {
  email: string;
  password: string;
  isVerified: boolean;

  setAuthInfo: (info: Partial<Pick<AuthState, "email" | "password">>) => void;
  setVerified: (status: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  email: "",
  password: "",
  isVerified: false,

  setAuthInfo: info =>
    set(state => ({
      ...state,
      ...info
    })),

  setVerified: status =>
    set({
      isVerified: status
    }),

  reset: () =>
    set({
      email: "",
      password: "",
      isVerified: false
    })
}));
