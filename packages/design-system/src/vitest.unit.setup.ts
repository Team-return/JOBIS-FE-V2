import { expect, afterEach } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";

expect.extend(matchers);

// globals가 꺼져 있으면 testing-library 자동 cleanup이 등록되지 않아
// 테스트 사이에 DOM이 쌓인다
afterEach(cleanup);
