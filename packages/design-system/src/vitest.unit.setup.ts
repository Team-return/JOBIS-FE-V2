import { expect, afterEach } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";

expect.extend(matchers);

// globals가 꺼져 있으면 testing-library 자동 cleanup이 등록되지 않아
// 테스트 사이에 DOM이 쌓인다
afterEach(cleanup);

// Node 22+ 가 전역 localStorage 자리를 선점하는데 --localstorage-file 없이는 값이 비어 있다.
// vitest jsdom 환경은 이미 전역에 있는 키를 jsdom window에서 옮기지 않아
// jsdom의 Storage가 주입되지 못하므로 직접 채워준다
if (!globalThis.localStorage) {
  const store = new Map<string, string>();
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, String(value));
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
      clear: () => store.clear(),
      key: (index: number) => [...store.keys()][index] ?? null,
      get length() {
        return store.size;
      }
    }
  });
}
