import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

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
