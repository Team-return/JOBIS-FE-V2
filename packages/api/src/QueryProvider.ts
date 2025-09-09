import { createElement, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      gcTime: 600000,
      retry: 1
    }
  }
});

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return createElement(QueryClientProvider, { client }, children);
};
