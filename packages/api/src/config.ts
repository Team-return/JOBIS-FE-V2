import type { AxiosError } from "axios";

interface Config {
  readonly baseUrl: string;
  readonly timeout: number;
  readonly staleTime: number;
  readonly gcTime: number;
  onServerError?: (error: AxiosError) => void;
  onTimeout?: (error: AxiosError) => void;
  onTokenExpired?: () => void;
}

export const config: Config = {
  baseUrl: import.meta.env.BASE_URL!,
  timeout: 10000,
  staleTime: 60000,
  gcTime: 600000,
  onServerError: error => {
    console.error("서버 상태가 원활하지 않습니다.", error);
  },
  onTimeout: error => {
    console.error("서버 응답이 지연되고 있습니다.", error);
  }
};