import { useMutation, useQuery } from "@tanstack/react-query";
import type { BookmarksResponse } from "./types";
import type { QueryOptions, MutationOptions } from "@/QueryProvider";
import { instance } from "@/instance";

const DOMAIN = "/bookmarks";

export const useBookmarks = (options?: QueryOptions<BookmarksResponse>) => {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const { data } = await instance.get<BookmarksResponse>(DOMAIN);
      return data;
    },
    ...options
  });
};

export const useToggleBookmark = (
  options?: MutationOptions<{ recruitmentId: number }>
) => {
  return useMutation({
    mutationFn: async ({ recruitmentId }) => {
      await instance.patch(`${DOMAIN}/${recruitmentId}`);
    },
    ...options
  });
};
