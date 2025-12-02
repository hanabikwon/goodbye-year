import { test, expect } from "@playwright/test";

test.describe("홈 페이지", () => {
  test("페이지 로드 및 제목 확인", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("2025 연말결산");
  });

  test("무료 테스트 카드 표시", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("핵심 분석 테스트")).toBeVisible();
    await expect(page.getByText("12개 질문")).toBeVisible();
    await expect(page.getByText("무료").first()).toBeVisible();
  });

  test("프리미엄 테스트 카드 표시", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("종합 분석 테스트")).toBeVisible();
    await expect(page.getByText("30개 질문")).toBeVisible();
    await expect(page.getByText("2,900원")).toBeVisible();
  });

  test("무료 테스트 페이지로 이동", async ({ page }) => {
    await page.goto("/");
    await page.getByText("핵심 분석 테스트").first().click();
    await expect(page).toHaveURL("/test/free");
  });

  test("프리미엄 테스트 페이지로 이동", async ({ page }) => {
    await page.goto("/");
    await page.getByText("종합 분석 테스트").click();
    await expect(page).toHaveURL("/test/premium");
  });
});
