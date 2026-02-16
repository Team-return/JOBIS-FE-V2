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

  return {
    searchParams,
    updateParams,
    resetParams,
    getParam,
    getParamAsNumber
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
