import { useMutation, useQuery } from "@tanstack/react-query";
import type { WinterInternStatusResponse } from "./types";
import type { QueryOptions, MutationOptions } from "@/QueryProvider";
import { instance } from "@/instance";
import { winterInternKeys } from "./keys";

const DOMAIN = "/winter-intern";

export { winterInternKeys };

export const useToggleWinterIntern = (options?: MutationOptions<void>) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(DOMAIN);
    },
    ...options
  });
};

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
