import type { BookmarksResponse } from "./types";
import { createQueryHook, createMutationHook } from "@/create-hook";
import { bookmarksKeys } from "./keys";

const DOMAIN = "/bookmarks";

export { bookmarksKeys };

export const useBookmarks = createQueryHook<void, BookmarksResponse>({
  domain: DOMAIN,
  queryKey: bookmarksKeys.bookmarks
});

export const useToggleBookmark = createMutationHook<
  { recruitmentId: number },
  void
>({
  domain: DOMAIN,
  method: "patch"
});
