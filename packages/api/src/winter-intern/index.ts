import { useMutation, useQuery } from "@tanstack/react-query";
import type { WinterInternStatusResponse } from "./types";
import type { QueryOptions, MutationOptions } from "@/QueryProvider";
import { instance } from "@/instance";

const DOMAIN = "/winter-intern";

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
    queryKey: ["winter-intern-status"],
    queryFn: async () => {
      const { data } = await instance.get<WinterInternStatusResponse>(DOMAIN);
      return data.winter_intern;
    },
    ...options
  });
};
