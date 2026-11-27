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
  // 서버는 `PATCH /bookmarks/{recruitment-id}`로 북마크를 켜고 끈다
  path: ({ recruitmentId }) => `/${recruitmentId}`,
  method: "patch"
});
