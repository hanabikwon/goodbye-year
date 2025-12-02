import { test, expect } from "@playwright/test";

test.describe("프리미엄 테스트 플로우", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/test/premium");
  });

  test("시작 페이지 표시", async ({ page }) => {
    await expect(page.getByText("종합 분석 테스트")).toBeVisible();
    await expect(page.getByRole("button", { name: /시작하기/ })).toBeVisible();
  });

  test("전체 30개 질문 진행", async ({ page }) => {
    // 시작
    await page.getByRole("button", { name: /시작하기/ }).click();

    // Q1: select (한 단어)
    await page.getByRole("button", { name: "도전" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q2: text (잘 아는 사람)
    await page.getByPlaceholder("이름이나 관계").fill("엄마");
    await page.getByRole("button", { name: "다음" }).click();

    // Q3: text (나를 뭐라고)
    await page.getByPlaceholder("그 사람의 시선으로").fill("열심히 사는 아이");
    await page.getByRole("button", { name: "다음" }).click();

    // Q4: text (행복했던 순간)
    await page.getByPlaceholder("구체적인 순간이나 상황").fill("가족여행");
    await page.getByRole("button", { name: "다음" }).click();

    // Q5: text (힘들었던 순간)
    await page.getByPlaceholder("솔직하게 적어도 괜찮아요").fill("번아웃");
    await page.getByRole("button", { name: "다음" }).click();

    // Q6: select (감정)
    await page.getByRole("button", { name: "뿌듯함과 성취감" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q7: text (고마웠던 사람과 이유)
    await page.getByPlaceholder("누구에게, 왜 고마웠는지").fill("친구, 힘들 때 옆에 있어줘서");
    await page.getByRole("button", { name: "다음" }).click();

    // Q8: text (소중해진 사람) - optional, skip
    await page.getByRole("button", { name: "건너뛰기" }).click();

    // Q9: text (멀어진 사람) - optional, skip
    await page.getByRole("button", { name: "건너뛰기" }).click();

    // Q10: select (변화)
    await page.getByRole("button", { name: "일·커리어" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q11: text (1년 전 나에게)
    await page.getByPlaceholder("그때의 나에게").fill("잘 버텼어");
    await page.getByRole("button", { name: "다음" }).click();

    // Q12: text (자주 미룬 것)
    await page.getByPlaceholder("계속 내일로 미뤘던 것").fill("운동");
    await page.getByRole("button", { name: "다음" }).click();

    // Q13: text (포기한 것) - optional, skip
    await page.getByRole("button", { name: "건너뛰기" }).click();

    // Q14: text (완주한 것) - optional, skip
    await page.getByRole("button", { name: "건너뛰기" }).click();

    // Q15: text (고민 중인 것) - optional, skip
    await page.getByRole("button", { name: "건너뛰기" }).click();

    // Q16: text (보다가 만 것) - optional, skip
    await page.getByRole("button", { name: "건너뛰기" }).click();

    // Q17: text (노래)
    await page.getByPlaceholder("노래 제목이나 가수 이름").fill("아이유 - 밤편지");
    await page.getByRole("button", { name: "다음" }).click();

    // Q18: text (책) - optional, skip
    await page.getByRole("button", { name: "건너뛰기" }).click();

    // Q19: text (장소)
    await page.getByPlaceholder("자주 갔거나 기억에 남는 곳").fill("근처 카페");
    await page.getByRole("button", { name: "다음" }).click();

    // Q20: text (여행지) - optional, skip
    await page.getByRole("button", { name: "건너뛰기" }).click();

    // Q21: text (맛있게 먹은 것)
    await page.getByPlaceholder("음식이나 식당 이름").fill("엄마표 김치찌개");
    await page.getByRole("button", { name: "다음" }).click();

    // Q22: text (잘한 소비)
    await page.getByPlaceholder("사길 잘했다 싶은 것").fill("에어팟");
    await page.getByRole("button", { name: "다음" }).click();

    // Q23: text (취미) - optional, skip
    await page.getByRole("button", { name: "건너뛰기" }).click();

    // Q24: text (향수) - optional, skip
    await page.getByRole("button", { name: "건너뛰기" }).click();

    // Q25: text (매력 없어진 것)
    await page.getByPlaceholder("흥미를 잃은 것").fill("넷플릭스");
    await page.getByRole("button", { name: "다음" }).click();

    // Q26: select (길티 플레져)
    await page.getByRole("button", { name: "야식" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q27: text (버려야 할 물건)
    await page.getByPlaceholder("정리 못 한 물건").fill("안 입는 옷들");
    await page.getByRole("button", { name: "다음" }).click();

    // Q28: text (되고 싶은 사람)
    await page.getByPlaceholder("내년의 내 모습").fill("더 건강한 사람");
    await page.getByRole("button", { name: "다음" }).click();

    // Q29: text (1월에 실행할 것)
    await page.getByPlaceholder("새해 첫 달에 바로").fill("헬스장 등록");
    await page.getByRole("button", { name: "다음" }).click();

    // Q30: text (1년 후 나) - 마지막
    await page.getByPlaceholder("1년 후의 나를 상상해보면").fill("더 성장해 있을 나");
    await page.getByRole("button", { name: "완료" }).click();

    // 결과 페이지로 이동 확인
    await expect(page).toHaveURL(/\/test\/premium\/result/);
  });

  test("select 질문 동작 확인", async ({ page }) => {
    await page.getByRole("button", { name: /시작하기/ }).click();

    // Q1 select 옵션들 확인
    await expect(page.getByRole("button", { name: "성장" })).toBeVisible();
    await expect(page.getByRole("button", { name: "도전" })).toBeVisible();
    await expect(page.getByRole("button", { name: "회복" })).toBeVisible();
    await expect(page.getByRole("button", { name: "변화" })).toBeVisible();

    // 선택 후 스타일 변경 확인
    await page.getByRole("button", { name: "성장" }).click();
    await expect(page.getByRole("button", { name: "성장" })).toHaveClass(/bg-\[#d4a574\]/);
  });

  test("optional 질문 건너뛰기", async ({ page }) => {
    await page.getByRole("button", { name: /시작하기/ }).click();

    // 필수 질문들 빠르게 넘기기
    for (let i = 0; i < 7; i++) {
      const nextBtn = page.getByRole("button", { name: "다음" });
      const selectBtns = page.locator('button:has-text("성장"), button:has-text("도전"), button:has-text("뿌듯함과 성취감")');

      if (await selectBtns.first().isVisible()) {
        await selectBtns.first().click();
      } else {
        const input = page.locator('input[type="text"], textarea').first();
        if (await input.isVisible()) {
          await input.fill("테스트 답변");
        }
      }
      await nextBtn.click();
    }

    // Q8 (optional) - 건너뛰기 버튼 확인
    await expect(page.getByRole("button", { name: "건너뛰기" })).toBeVisible();
  });
});
