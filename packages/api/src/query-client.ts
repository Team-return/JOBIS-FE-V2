import { QueryClient } from "@tanstack/react-query";
import { config } from "./config";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: config.staleTime,
      gcTime: config.gcTime,
      // 인터셉터가 상태 코드를 숫자로 그대로 throw 한다.
      // 4xx는 다시 보내도 결과가 같으므로 재시도하지 않는다
      retry: (failureCount, error) => {
        const status = error as unknown as number;

        if (typeof status === "number" && status >= 400 && status < 500) {
          return false;
        }

        return failureCount < 1;
      }
    }
  }
});
