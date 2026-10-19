import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  bookmarksKeys,
  query,
  recruitmentsKeys,
  useToggleBookmark
} from "@jobis/api";
import { useToast } from "@jobis/design-system";

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = useCallback(
    (updates: Record<string, string | number | undefined>) => {
      setSearchParams(
        prev => {
          const newParams = new URLSearchParams(prev);

          Object.entries(updates).forEach(([key, value]) => {
            const standardKey = key
              .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
              .toLowerCase();

            if (value !== undefined && value !== null && value !== "") {
              newParams.set(standardKey, String(value));
            } else {
              newParams.delete(standardKey);
            }
          });

          return newParams;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const resetParams = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const getParam = useCallback(
    (key: string): string | undefined => {
      return searchParams.get(key) ?? undefined;
    },
    [searchParams]
  );

  const getParamAsNumber = useCallback(
    (key: string, defaultValue: number = 1): number => {
      const value = searchParams.get(key);
      return value ? parseInt(value, 10) : defaultValue;
    },
    [searchParams]
  );

  // page=0·음수·숫자가 아닌 값은 서버가 거절해 목록이 비므로 첫 페이지로 본다
  const getPageParam = useCallback((): number => {
    const page = Number(searchParams.get("page"));
    return Number.isInteger(page) && page >= 1 ? page : 1;
  }, [searchParams]);

  return {
    searchParams,
    updateParams,
    resetParams,
    getParam,
    getParamAsNumber,
    getPageParam
  };
};

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * 모집의뢰서 카드 북마크 토글.
 * 서버 응답과 목록 재조회를 기다리는 동안에도 아이콘이 바로 바뀌도록
 * 누른 카드의 상태를 잠시 덮어써 두고, 재조회가 끝나면 서버 값으로 돌아간다.
 */
export const useBookmarkToggle = () => {
  const { error } = useToast();
  const [overrides, setOverrides] = useState<Record<number, boolean>>({});
  const { mutateAsync } = useToggleBookmark();

  const clearOverride = useCallback((recruitmentId: number) => {
    setOverrides(prev => {
      const next = { ...prev };
      delete next[recruitmentId];
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (recruitmentId: number, serverValue: boolean) =>
      overrides[recruitmentId] ?? serverValue,
    [overrides]
  );

  const toggle = useCallback(
    async (recruitmentId: number, current: boolean) => {
      // 요청 중에 또 누르면 서버와 화면 상태가 엇갈리므로 무시한다
      if (recruitmentId in overrides) return;

      setOverrides(prev => ({ ...prev, [recruitmentId]: !current }));

      // mutate의 호출별 콜백은 다른 카드를 연달아 누르면 앞 요청 것이 버려지므로
      // 요청마다 끝까지 기다리는 mutateAsync를 쓴다
      try {
        await mutateAsync({ recruitmentId });
      } catch {
        clearOverride(recruitmentId);
        error("북마크를 변경하지 못했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      await Promise.all([
        query.invalidate(recruitmentsKeys.recruitmentList()),
        query.invalidate(bookmarksKeys.bookmarks()),
        query.invalidate(recruitmentsKeys.recruitmentDetail(recruitmentId))
      ]);
      clearOverride(recruitmentId);
    },
    [overrides, mutateAsync, clearOverride, error]
  );

  return { isBookmarked, toggle };
};
