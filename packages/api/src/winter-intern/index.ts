import { useQuery } from "@tanstack/react-query";
import type { QueryOptions } from "@/QueryProvider";
import { createDomainApi } from "@/create-hook";
import { instance } from "@/instance";
import { winterInternKeys } from "./keys";

const DOMAIN = "/winter-intern";
const { createMutationHook } = createDomainApi(DOMAIN);

export { winterInternKeys };

export const useToggleWinterIntern = createMutationHook<void, void>({
  path: "/",
  method: "patch"
});

export const useWinterInternStatus = (options?: QueryOptions<boolean>) => {
  return useQuery({
    queryKey: winterInternKeys.winterInternStatus(),
    queryFn: async () => {
      // 서버가 객체로 감싸지 않고 true/false를 그대로 준다
      const { data } = await instance.get<boolean>(DOMAIN);
      return data;
    },
    ...options
  });
};
