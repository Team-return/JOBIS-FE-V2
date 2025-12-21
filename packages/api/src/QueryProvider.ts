import { createElement, type ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
  type UseQueryOptions,
  type UseMutationOptions
} from "@tanstack/react-query";
import { config } from "./config";

export type QueryOptions<T> = Omit<
  UseQueryOptions<T, number>,
  "queryKey" | "queryFn"
>;

export type MutationOptions<Request, Response = void> = Omit<
  UseMutationOptions<Response, number, Request, unknown>,
  "mutationFn"
>;

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: config.staleTime,
      gcTime: config.gcTime,
      retry: 1
    }
  }
});

export const query = {
  async prefetch(queryKey: unknown[]) {
    await client.prefetchQuery({
      queryKey
    });
  },
  async invalidate(queryKey: unknown[]) {
    await client.invalidateQueries({ queryKey });
  },
  remove(queryKey: unknown[]) {
    client.removeQueries({ queryKey });
  }
} as const;

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return createElement(QueryClientProvider, { client }, children);
};
