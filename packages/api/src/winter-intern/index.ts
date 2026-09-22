import { useQuery } from "@tanstack/react-query";
import type { WinterInternStatusResponse } from "./types";
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
      const { data } = await instance.get<WinterInternStatusResponse>(DOMAIN);
      return data.winter_intern;
    },
    ...options
  });
};
