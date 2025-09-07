import { useMutation, useQuery } from "@tanstack/react-query";
import type { WinterInternStatusResponse } from "./types";
import { instance } from "@/instance";

const DOMAIN = "/winter-intern";

export const useToggleWinterIntern = () => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(DOMAIN);
    }
  });
};

export const useWinterInternStatus = () => {
  return useQuery({
    queryKey: ["winter-intern-status"],
    queryFn: async () => {
      const { data } = await instance.get<WinterInternStatusResponse>(DOMAIN);
      return data.winter_intern;
    }
  });
};
