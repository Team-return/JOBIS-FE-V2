import { useMutation, useQuery } from "@tanstack/react-query";
import type { BookmarksResponse } from "./types";
import { instance } from "@/instance";

const DOMAIN = "/bookmarks";

export const useBookmarks = () => {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const { data } = await instance.get<BookmarksResponse>(DOMAIN);
      return data;
    }
  });
};

export const useToggleBookmark = (recruitmentId: number) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/${recruitmentId}`);
    }
  });
};
