import { QueryClient } from "@tanstack/react-query";
import { config } from "./config";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: config.staleTime,
      gcTime: config.gcTime,
      retry: 1
    }
  }
});
