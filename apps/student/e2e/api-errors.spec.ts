import { expect, test, type Page } from "playwright/test";
import process from "process";

const API_URL = process.env.BASE_URL ?? "";
const STUDENT_ID = process.env.E2E_STUDENT_ID ?? "";
const STUDENT_PASSWORD = process.env.E2E_STUDENT_PASSWORD ?? "";

interface RouteCase {
  path: string;
  // 상세 페이지는 목록 API 첫 항목의 id로 경로를 채운다
  idFrom?: { url: string; listKey: string };
}

const COMPANY_LIST = { url: "/companies/student?page=1", listKey: "companies" };
const RECRUITMENT_LIST = {
  url: "/recruitments/student?page=1&winter_intern=false",
  listKey: "recruitments"
};
const NOTICE_LIST = { url: "/notices", listKey: "notices" };

const ROUTES: RouteCase[] = [
  { path: "/" },
  { path: "/company" },
  { path: "/recruitment" },
  { path: "/notice" },
  { path: "/connect-review" },
  { path: "/mypage" },
  { path: "/mypage/bug-report" },
  { path: "/mypage/password" },
  { path: "/company/detail/:id", idFrom: COMPANY_LIST },
  { path: "/company/detail/:id/review", idFrom: COMPANY_LIST },
  { path: "/recruitment/detail/:id", idFrom: RECRUITMENT_LIST },
  { path: "/recruitment/detail/:id/apply", idFrom: RECRUITMENT_LIST },
  { path: "/notice/detail/:id", idFrom: NOTICE_LIST }
];

let accessToken = "";

const collectApiErrors = (page: Page) => {
  const errors = new Set<string>();
  const toPath = (url: string) => url.slice(API_URL.length);

  page.on("response", response => {
    if (response.url().startsWith(API_URL) && response.status() >= 400) {
      errors.add(
        `${response.request().method()} ${toPath(response.url())} → ${response.status()}`
      );
    }
  });
  page.on("requestfailed", request => {
    const reason = request.failure()?.errorText;
    // 페이지 이동이나 쿼리 취소로 끊긴 요청은 에러로 보지 않는다
    if (request.url().startsWith(API_URL) && reason !== "net::ERR_ABORTED") {
      errors.add(`${request.method()} ${toPath(request.url())} → ${reason}`);
    }
  });
  page.on("pageerror", error => errors.add(`pageerror: ${error.message}`));

  return errors;
};

test.skip(
  !STUDENT_ID || !STUDENT_PASSWORD,
  ".env에 E2E_STUDENT_ID, E2E_STUDENT_PASSWORD를 설정해야 합니다"
);

test.beforeEach(async ({ context, request, baseURL }) => {
  // 테스트 중 발생한 에러가 팀 Sentry로 전송되지 않게 차단
  await context.route(/sentry\.io/, route => route.abort());

  const response = await request.post(`${API_URL}/users/login`, {
    data: {
      account_id: STUDENT_ID,
      password: STUDENT_PASSWORD,
      platform_type: "WEB"
    }
  });
  expect(response.ok(), `로그인 실패: ${response.status()}`).toBe(true);

  const auth = await response.json();
  accessToken = auth.access_token;
  await context.addCookies([
    { name: "access_token", value: auth.access_token, url: baseURL! },
    { name: "refresh_token", value: auth.refresh_token, url: baseURL! }
  ]);
});

for (const { path, idFrom } of ROUTES) {
  test(`${path} 에서 API 에러가 나지 않는다`, async ({ page, request }) => {
    let target = path;

    if (idFrom) {
      const response = await request.get(`${API_URL}${idFrom.url}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const id = response.ok()
        ? (await response.json())[idFrom.listKey]?.[0]?.id
        : undefined;
      test.skip(
        id === undefined,
        `${idFrom.url} 에서 상세 페이지 id를 찾지 못했습니다`
      );
      target = path.replace(":id", String(id));
    }

    const errors = collectApiErrors(page);
    await page.goto(target);
    await page.waitForLoadState("networkidle");

    await expect(page).not.toHaveURL(/\/login/);
    expect([...errors], `${target} 에서 발생한 API 에러`).toEqual([]);
  });
}
