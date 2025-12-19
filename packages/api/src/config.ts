import type { AxiosError } from "axios";

interface Config {
  baseUrl: string;
  timeout: number;
  staleTime: number;
  gcTime: number;
  onServerError?: (error: AxiosError) => void;
}

export const config: Config = {
  baseUrl: import.meta.env.BASE_URL!,
  timeout: 10000,
  staleTime: 60000,
  gcTime: 600000,
  onServerError: error => {
    console.error("서버 상태가 원활하지 않습니다.", error);
  }
};
