import { useQuery, useMutation } from "@tanstack/react-query";
import { instance } from "./instance";
import type { QueryOptions, MutationOptions } from "./QueryProvider";
import { queryClient } from "./query-client";

type QueryKeyFactory<TParams> = (params: TParams) => unknown[];

interface QueryHookConfig<TParams> {
  path: string | ((params: TParams) => string);
  queryKey: QueryKeyFactory<TParams>;
}

interface MutationHookConfig<TRequest> {
  path: string | ((request: TRequest) => string);
  method: "post" | "patch" | "delete" | "put";
}

interface IdMutationHookConfig {
  path: string;
  method: "post" | "patch" | "delete" | "put";
}

type QueryHook<TParams, TResponse> = {
  (
    params?: TParams,
    options?: QueryOptions<TResponse>
  ): ReturnType<typeof useQuery<TResponse, number>>;
  prefetch: (
    params?: TParams,
    options?: QueryOptions<TResponse>
  ) => Promise<void>;
};

const resolvePath = <T>(
  path: string | ((args: T) => string),
  args?: T
): string => {
  if (path === "/") return "";
  return typeof path === "function" ? path(args as T) : path;
};

export const createDomainApi = (domain: string) => {
  const createQueryHook = <TParams, TResponse>({
    path,
    queryKey
  }: QueryHookConfig<TParams>) => {
    const buildQueryOptions = (
      params?: TParams,
      options?: QueryOptions<TResponse>
    ) => ({
      queryKey: queryKey(params as TParams),
      queryFn: async () => {
        const resolvedPath = resolvePath(path, params);
        const { data } = await instance.get<TResponse>(
          `${domain}${resolvedPath}`,
          {
            params:
              typeof params === "object" && params !== null ? params : undefined
          }
        );
        return data;
      },
      ...options
    });

    const hook = ((params?: TParams, options?: QueryOptions<TResponse>) => {
      return useQuery({
        ...buildQueryOptions(params, options)
      });
    }) as QueryHook<TParams, TResponse>;

    hook.prefetch = async (
      params?: TParams,
      options?: QueryOptions<TResponse>
    ) => {
      await queryClient.prefetchQuery(buildQueryOptions(params, options));
    };

    return hook;
  };

  const createMutationHook = <TRequest, TResponse = void>({
    path,
    method
  }: MutationHookConfig<TRequest>) => {
    return (options?: MutationOptions<TRequest, TResponse>) => {
      return useMutation({
        mutationFn: async (request: TRequest) => {
          const resolvedPath = resolvePath(path, request);
          const { data } = await instance<TResponse>({
            method,
            url: `${domain}${resolvedPath}`,
            data: request
          });
          return data;
        },
        ...options
      });
    };
  };

  const createIdMutationHook = <TRequest, TResponse = void>({
    path,
    method
  }: IdMutationHookConfig) => {
    return (
      id: number | string,
      options?: MutationOptions<TRequest, TResponse>
    ) => {
      return useMutation({
        mutationFn: async (request: TRequest) => {
          // path가 "/"면 `/notices//1`처럼 슬래시가 겹치므로 비운다
          const url = `${domain}${path === "/" ? "" : path}/${id}`;
          const { data } = await instance<TResponse>({
            method,
            url,
            data: request
          });
          return data;
        },
        ...options
      });
    };
  };

  return {
    createQueryHook,
    createMutationHook,
    createIdMutationHook
  };
};
