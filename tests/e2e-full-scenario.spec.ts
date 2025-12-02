import { test, expect } from "@playwright/test";

test.describe("실제 시나리오 E2E 테스트", () => {
  // AI 응답 대기 시간 충분히 설정
  test.setTimeout(120000);

  test("프리미엄 30개 질문 - 직장인 번아웃 회복 시나리오", async ({ page }) => {
    await page.goto("/test/premium");
    await page.getByRole("button", { name: /시작하기/ }).click();

    // Q1: 한 단어 (select)
    await page.getByRole("button", { name: "회복" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q2: 나를 잘 아는 사람
    await page.getByPlaceholder("이름이나 관계").fill("오랜 친구 지수");
    await page.getByRole("button", { name: "다음" }).click();

    // Q3: 그 사람이 보는 나
    await page.getByPlaceholder("그 사람의 시선으로").fill("원래 밝은 애였는데 요즘 많이 지쳐보인다고 걱정해줬어요");
    await page.getByRole("button", { name: "다음" }).click();

    // Q4: 행복했던 순간
    await page.getByPlaceholder("구체적인 순간이나 상황").fill("퇴사 결심하고 제주도 혼자 여행 갔을 때, 바다 보면서 울었던 순간");
    await page.getByRole("button", { name: "다음" }).click();

    // Q5: 힘들었던 순간
    await page.getByPlaceholder("솔직하게 적어도 괜찮아요").fill("매일 아침 출근길에 지하철에서 눈물이 났던 3월");
    await page.getByRole("button", { name: "다음" }).click();

    // Q6: 감정 (select)
    await page.getByRole("button", { name: "지침과 번아웃" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q7: 고마웠던 사람과 이유
    await page.getByPlaceholder("누구에게, 왜 고마웠는지").fill("엄마, 아무 말 없이 집에 와서 쉬라고 해줘서");
    await page.getByRole("button", { name: "다음" }).click();

    // Q8: 소중해진 사람 (optional)
    await page.getByPlaceholder("올해 가까워진 사람").fill("같이 퇴사한 전 동료, 서로 위로하며 가까워짐");
    await page.getByRole("button", { name: "다음" }).click();

    // Q9: 멀어진 사람 (optional)
    await page.getByPlaceholder("아쉽지만 멀어진 사람").fill("회사에서 친했던 선배, 퇴사하니 자연스럽게 연락이 끊겼어요");
    await page.getByRole("button", { name: "다음" }).click();

    // Q10: 변화 (select)
    await page.getByRole("button", { name: "일·커리어" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q11: 1년 전 나에게
    await page.getByPlaceholder("그때의 나에게").fill("그만둬도 돼, 넌 충분히 열심히 했어");
    await page.getByRole("button", { name: "다음" }).click();

    // Q12: 자주 미룬 것
    await page.getByPlaceholder("계속 내일로 미뤘던 것").fill("병원 가기, 건강검진");
    await page.getByRole("button", { name: "다음" }).click();

    // Q13: 포기한 것 (optional)
    await page.getByPlaceholder("놓아버린 것들 중").fill("완벽해야 한다는 강박");
    await page.getByRole("button", { name: "다음" }).click();

    // Q14: 완주한 것 (optional)
    await page.getByPlaceholder("끝까지 해낸 것").fill("3개월 심리상담");
    await page.getByRole("button", { name: "다음" }).click();

    // Q15: 고민 중인 것 (optional)
    await page.getByPlaceholder("결론 못 내린 것").fill("새로운 직장 vs 프리랜서");
    await page.getByRole("button", { name: "다음" }).click();

    // Q16: 보다가 만 것 (optional)
    await page.getByPlaceholder("왜 포기했는지도").fill("더 글로리, 복수극이 힘들어서 중간에 멈춤");
    await page.getByRole("button", { name: "다음" }).click();

    // Q17: 노래
    await page.getByPlaceholder("노래 제목이나 가수 이름").fill("아이유 - 드라마, 위로가 됐어요");
    await page.getByRole("button", { name: "다음" }).click();

    // Q18: 책 (optional)
    await page.getByPlaceholder("책 제목").fill("퇴사를 권합니다");
    await page.getByRole("button", { name: "다음" }).click();

    // Q19: 장소
    await page.getByPlaceholder("자주 갔거나 기억에 남는 곳").fill("집 근처 작은 카페, 낮에 혼자 책 읽던 곳");
    await page.getByRole("button", { name: "다음" }).click();

    // Q20: 여행지 (optional)
    await page.getByPlaceholder("여행지 이름").fill("제주도 월정리");
    await page.getByRole("button", { name: "다음" }).click();

    // Q21: 맛있게 먹은 것
    await page.getByPlaceholder("음식이나 식당 이름").fill("엄마가 끓여준 미역국");
    await page.getByRole("button", { name: "다음" }).click();

    // Q22: 잘한 소비
    await page.getByPlaceholder("사길 잘했다 싶은 것").fill("좋은 베개, 수면의 질이 달라졌어요");
    await page.getByRole("button", { name: "다음" }).click();

    // Q23: 취미 (optional)
    await page.getByPlaceholder("새로 시작한 것").fill("러닝, 아침에 뛰면 머리가 맑아져요");
    await page.getByRole("button", { name: "다음" }).click();

    // Q24: 향수 (optional)
    await page.getByRole("button", { name: "건너뛰기" }).click();

    // Q25: 매력 없어진 것
    await page.getByPlaceholder("흥미를 잃은 것").fill("인스타그램, 남들 잘 사는 거 보는 게 힘들었어요");
    await page.getByRole("button", { name: "다음" }).click();

    // Q26: 길티 플레져 (select)
    await page.getByRole("button", { name: "늦잠" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q27: 버려야 할 물건
    await page.getByPlaceholder("정리 못 한 물건").fill("전 회사 명함이랑 사원증");
    await page.getByRole("button", { name: "다음" }).click();

    // Q28: 되고 싶은 사람
    await page.getByPlaceholder("내년의 내 모습").fill("나를 먼저 챙기는 사람, 건강하고 평온한 사람");
    await page.getByRole("button", { name: "다음" }).click();

    // Q29: 1월에 실행할 것
    await page.getByPlaceholder("새해 첫 달에 바로").fill("아침 러닝 습관 만들기");
    await page.getByRole("button", { name: "다음" }).click();

    // Q30: 1년 후 나 (마지막)
    await page.getByPlaceholder("1년 후의 나를 상상해보면").fill("새로운 일을 시작해서 다시 열정을 찾은 나");
    await page.getByRole("button", { name: "완료" }).click();

    // 결과 페이지로 이동 확인
    await expect(page).toHaveURL(/\/test\/premium\/result/, { timeout: 10000 });

    // AI 로딩 대기 (최대 60초)
    await expect(page.getByText("분석 중")).toBeVisible({ timeout: 5000 }).catch(() => {});

    // AI 결과가 표시될 때까지 대기 (제목에 "한 해" 포함)
    await expect(page.locator("h1:has-text('한 해')")).toBeVisible({ timeout: 60000 });

    // 결과 섹션들이 있는지 확인
    await expect(page.getByText("2025년 총평")).toBeVisible();

    // 스크린샷 저장
    await page.screenshot({ path: "tests/screenshots/premium-result.png", fullPage: true });

    console.log("프리미엄 테스트 결과 페이지 확인 완료!");
  });

  test("무료 12개 질문 - 대학생 성장 시나리오", async ({ page }) => {
    await page.goto("/test/free");
    await page.getByRole("button", { name: /시작하기/ }).click();

    // Q1: 한 단어 (select)
    await page.getByRole("button", { name: "성장" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q2: 많이 들은 말
    await page.getByPlaceholder("주변에서 자주 들었던 말").fill("요즘 부쩍 어른스러워졌다");
    await page.getByRole("button", { name: "다음" }).click();

    // Q3: 행복했던 순간
    await page.getByPlaceholder("구체적인 순간이나 상황").fill("첫 인턴 합격 문자 받았을 때");
    await page.getByRole("button", { name: "다음" }).click();

    // Q4: 힘들었던 순간
    await page.getByPlaceholder("솔직하게 적어도 괜찮아요").fill("학점 관리와 취준 병행하면서 잠 못 자던 시험기간");
    await page.getByRole("button", { name: "다음" }).click();

    // Q5: 감정 (select)
    await page.getByRole("button", { name: "뿌듯함과 성취감" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q6: 고마웠던 사람
    await page.getByPlaceholder("그 사람을 떠올려보세요").fill("자소서 봐준 선배");
    await page.getByRole("button", { name: "다음" }).click();

    // Q7: 못 한 말
    await page.getByPlaceholder("전하지 못한 말").fill("정말 고마워요, 덕분에 용기 냈어요");
    await page.getByRole("button", { name: "다음" }).click();

    // Q8: 변화 (select)
    await page.getByRole("button", { name: "마음가짐" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q9: 1년 전 나에게
    await page.getByPlaceholder("그때의 나에게").fill("지금 걱정하는 거 다 잘 풀려, 믿어도 돼");
    await page.getByRole("button", { name: "다음" }).click();

    // Q10: 되고 싶은 사람
    await page.getByPlaceholder("내년의 내 모습").fill("첫 월급 받는 어른");
    await page.getByRole("button", { name: "다음" }).click();

    // Q11: 그만두고 싶은 것
    await page.getByPlaceholder("더 이상 끌고 가지 않을 것").fill("남들과 비교하는 습관");
    await page.getByRole("button", { name: "다음" }).click();

    // Q12: 하고 싶은 것 (마지막)
    await page.getByPlaceholder("꼭 이루고 싶은 것").fill("혼자 해외여행");
    await page.getByRole("button", { name: "완료" }).click();

    // 결과 페이지로 이동 확인
    await expect(page).toHaveURL(/\/test\/free\/result/, { timeout: 10000 });

    // AI 결과가 표시될 때까지 대기 (제목에 "한 해" 포함)
    await expect(page.locator("h1:has-text('한 해')")).toBeVisible({ timeout: 60000 });

    // 결과 섹션 확인
    await expect(page.getByText("2025년 총평")).toBeVisible();

    // 스크린샷 저장
    await page.screenshot({ path: "tests/screenshots/free-result.png", fullPage: true });

    console.log("무료 테스트 결과 페이지 확인 완료!");
  });
});
