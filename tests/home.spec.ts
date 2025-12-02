import { test, expect } from "@playwright/test";

test.describe("인트로 및 요금제 선택 페이지", () => {
  test("인트로 페이지 로드 및 제목 확인", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("2025년을 돌아볼 시간이에요");
  });

  test("이름 입력 후 요금제 선택 페이지로 이동", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("이름 또는 닉네임").fill("테스트");
    await page.getByRole("button", { name: "시작하기" }).click();
    await expect(page).toHaveURL("/select");
    await expect(page.getByText("테스트님의 2025년을")).toBeVisible();
  });

  test("요금제 선택 페이지에서 무료/프리미엄 카드 표시", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("이름 또는 닉네임").fill("테스트");
    await page.getByRole("button", { name: "시작하기" }).click();

    await expect(page.getByText("핵심 분석")).toBeVisible();
    await expect(page.getByText("12개 질문")).toBeVisible();
    await expect(page.getByText("종합 분석")).toBeVisible();
    await expect(page.getByText("30개 질문")).toBeVisible();
  });

  test("무료 테스트 페이지로 이동", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("이름 또는 닉네임").fill("테스트");
    await page.getByRole("button", { name: "시작하기" }).click();
    await page.getByText("핵심 분석").first().click();
    await expect(page).toHaveURL("/test/free");
  });

  test("프리미엄 테스트 페이지로 이동", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("이름 또는 닉네임").fill("테스트");
    await page.getByRole("button", { name: "시작하기" }).click();
    await page.getByText("종합 분석").first().click();
    await expect(page).toHaveURL("/test/premium");
  });
});
