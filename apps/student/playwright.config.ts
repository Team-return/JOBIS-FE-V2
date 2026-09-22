import { defineConfig, devices } from "playwright/test";
import path from "path";
import process from "process";

// BASE_URL과 로그인 계정(E2E_STUDENT_ID, E2E_STUDENT_PASSWORD)을 루트 .env에서 읽는다
try {
  process.loadEnvFile(path.join(import.meta.dirname, "../../.env"));
} catch {
  // .env가 없으면 이미 주입된 환경 변수를 사용한다
}

// 스테이징 API CORS가 허용하는 로컬 origin(5173, 5174, 3000) 중 vite 기본 포트와 겹치지 않는 포트
const PORT = 3000;

export default defineConfig({
  testDir: "./e2e",
  workers: 1,
  reporter: "list",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: `http://localhost:${PORT}`
  },
  webServer: {
    // student 워크스페이스에는 vite가 없어 `yarn dev`가 전역 vite를 잡을 수 있으므로 루트 vite를 쓴다
    command: `yarn run -T vite --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    // 같은 포트의 다른 앱을 재사용하지 않도록 항상 새로 띄운다
    reuseExistingServer: false
  }
});
