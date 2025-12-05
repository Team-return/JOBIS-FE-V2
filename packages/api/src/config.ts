interface Config {
  timeout: number;
  staleTime: number;
  gcTime: number;
  onServerError: (error: unknown) => void;
}

export const config: Config = {
  timeout: 10000,
  staleTime: 60000,
  gcTime: 600000,
  onServerError: (error: unknown) => {
    console.error("서버 상태가 원활하지 않습니다.", error);
  }
};
