import { type Plugin, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// 스토리북 상호작용 테스트와 별개로 *.test.tsx 유닛 테스트를 실행한다.
// storybookTest 플러그인이 include를 스토리 파일로 고정하므로 설정을 분리했다.
export default defineConfig({
  plugins: [tsconfigPaths() as Plugin, react() as Plugin[]],
  test: {
    name: "unit",
    include: ["src/**/*.test.@(ts|tsx)"],
    environment: "jsdom",
    setupFiles: ["src/vitest.unit.setup.ts"]
  }
});
