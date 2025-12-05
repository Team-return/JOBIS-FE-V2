import { createElement, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./config";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: config.staleTime,
      gcTime: config.gcTime,
      retry: 1
    }
  }
});

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return createElement(QueryClientProvider, { client }, children);
};
