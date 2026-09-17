import type { BookmarksResponse } from "./types";
import { createDomainApi } from "@/create-hook";
import { bookmarksKeys } from "./keys";

const DOMAIN = "/bookmarks";
const { createQueryHook, createMutationHook } = createDomainApi(DOMAIN);

export { bookmarksKeys };

export const useBookmarks = createQueryHook<void, BookmarksResponse>({
  path: "/",
  queryKey: bookmarksKeys.bookmarks
});

export const useToggleBookmark = createMutationHook<
  { recruitmentId: number },
  void
>({
  path: "/",
  method: "patch"
});
