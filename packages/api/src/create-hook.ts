import { useQuery, useMutation } from "@tanstack/react-query";
import { instance } from "./instance";
import type { QueryOptions, MutationOptions } from "./QueryProvider";

type QueryKeyFactory<TParams> = (params: TParams) => unknown[];

interface QueryHookConfig<TParams> {
  domain: string | ((params: TParams) => string);
  queryKey: QueryKeyFactory<TParams>;
}

interface MutationHookConfig<TRequest> {
  domain: string | ((request: TRequest) => string);
  method?: "post" | "patch" | "delete" | "put";
}

export const createQueryHook = <TParams, TResponse>({
  domain,
  queryKey
}: QueryHookConfig<TParams>) => {
  return (params?: TParams, options?: QueryOptions<TResponse>) => {
    return useQuery({
      queryKey: queryKey(params as TParams),
      queryFn: async () => {
        const url =
          typeof domain === "function" ? domain(params as TParams) : domain;
        const { data } = await instance.get<TResponse>(url, {
          params:
            typeof params === "object" && params !== null ? params : undefined
        });
        return data;
      },
      ...options
    });
  };
};

export const createMutationHook = <TRequest, TResponse = void>({
  domain,
  method = "post"
}: MutationHookConfig<TRequest>) => {
  return (options?: MutationOptions<TRequest, TResponse>) => {
    return useMutation({
      mutationFn: async (request: TRequest) => {
        const url = typeof domain === "function" ? domain(request) : domain;
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

/**
 * ID 를 인자로 받는 Mutation Hook 팩토리
 * domain 이 ID 를 포함하는 URL 을 동적으로 생성할 때 사용
 */
export const createIdMutationHook = <TRequest, TResponse = void>({
  domain,
  method = "post"
}: MutationHookConfig<TRequest>) => {
  return (
    id: number | string,
    options?: MutationOptions<TRequest, TResponse>
  ) => {
    return useMutation({
      mutationFn: async (request: TRequest) => {
        const url =
          typeof domain === "function" ? domain(request) : `${domain}/${id}`;
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
