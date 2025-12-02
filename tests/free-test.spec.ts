import { test, expect } from "@playwright/test";

test.describe("무료 테스트 플로우", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/test/free");
  });

  test("시작 페이지 표시", async ({ page }) => {
    await expect(page.getByText("핵심 분석 테스트")).toBeVisible();
    await expect(page.getByText("12개 질문으로")).toBeVisible();
    await expect(page.getByRole("button", { name: "무료로 시작하기" })).toBeVisible();
  });

  test("테스트 시작 버튼 클릭", async ({ page }) => {
    await page.getByRole("button", { name: "무료로 시작하기" }).click();
    // 첫 번째 질문 표시 확인
    await expect(page.getByText("2025년을 한 단어로 표현한다면?")).toBeVisible();
  });

  test("전체 12개 질문 진행", async ({ page }) => {
    // 시작
    await page.getByRole("button", { name: "무료로 시작하기" }).click();

    // Q1: select (한 단어)
    await page.getByRole("button", { name: "성장" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q2: text (많이 들은 말)
    await page.getByPlaceholder("주변에서 자주 들었던 말").fill("잘하고 있어");
    await page.getByRole("button", { name: "다음" }).click();

    // Q3: text (행복했던 순간)
    await page.getByPlaceholder("구체적인 순간이나 상황").fill("여행 갔을 때");
    await page.getByRole("button", { name: "다음" }).click();

    // Q4: text (힘들었던 순간)
    await page.getByPlaceholder("솔직하게 적어도 괜찮아요").fill("이직 고민할 때");
    await page.getByRole("button", { name: "다음" }).click();

    // Q5: select (감정)
    await page.getByRole("button", { name: "감사와 행복" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q6: text (고마웠던 사람)
    await page.getByPlaceholder("그 사람을 떠올려보세요").fill("친구 민수");
    await page.getByRole("button", { name: "다음" }).click();

    // Q7: text (못 한 말)
    await page.getByPlaceholder("전하지 못한 말").fill("고마워");
    await page.getByRole("button", { name: "다음" }).click();

    // Q8: select (변화)
    await page.getByRole("button", { name: "마음가짐" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q9: text (1년 전 나에게)
    await page.getByPlaceholder("그때의 나에게").fill("잘 버텼어");
    await page.getByRole("button", { name: "다음" }).click();

    // Q10: text (되고 싶은 사람)
    await page.getByPlaceholder("내년의 내 모습").fill("더 성장한 사람");
    await page.getByRole("button", { name: "다음" }).click();

    // Q11: text (그만두고 싶은 것)
    await page.getByPlaceholder("더 이상 끌고 가지 않을 것").fill("야근");
    await page.getByRole("button", { name: "다음" }).click();

    // Q12: text (하고 싶은 것) - 마지막
    await page.getByPlaceholder("꼭 이루고 싶은 것").fill("해외여행");
    await page.getByRole("button", { name: "완료" }).click();

    // 결과 페이지로 이동 확인
    await expect(page).toHaveURL(/\/test\/free\/result/);
  });

  test("이전 버튼으로 되돌아가기", async ({ page }) => {
    await page.getByRole("button", { name: "무료로 시작하기" }).click();

    // Q1 답변
    await page.getByRole("button", { name: "성장" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q2에서 이전 버튼 클릭
    await page.getByRole("button", { name: "이전" }).click();

    // Q1으로 돌아왔는지 확인
    await expect(page.getByText("2025년을 한 단어로 표현한다면?")).toBeVisible();
  });
});
