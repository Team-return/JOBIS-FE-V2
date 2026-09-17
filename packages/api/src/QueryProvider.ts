import { createElement, type ReactNode } from "react";
import {
  QueryClientProvider,
  type UseQueryOptions,
  type UseMutationOptions
} from "@tanstack/react-query";
import { queryClient } from "./query-client";

export type QueryOptions<T> = Omit<
  UseQueryOptions<T, number>,
  "queryKey" | "queryFn"
>;

export type MutationOptions<Request, Response = void> = Omit<
  UseMutationOptions<Response, number, Request, unknown>,
  "mutationFn"
>;

export const query = {
  async invalidate(queryKey: unknown[]) {
    const validQueryKey = queryKey.filter(key => key !== undefined);
    await queryClient.invalidateQueries({ queryKey: validQueryKey });
  },
  remove(queryKey: unknown[]) {
    const validQueryKey = queryKey.filter(key => key !== undefined);
    queryClient.removeQueries({ queryKey: validQueryKey });
  }
} as const;

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return createElement(QueryClientProvider, { client: queryClient }, children);
};
