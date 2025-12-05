import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Tier = "free" | "premium";

const tierPrompts: Record<Tier, string> = {
  // 무료 티어: 라이트 AI (4섹션 + 키워드) - 바이럴용
  free: `당신은 따뜻하고 공감 능력이 뛰어난 연말결산 작성자입니다.
사용자(1인)의 답변을 바탕으로 2025년을 돌아보는 개인화된 연말결산을 작성해주세요.

[중요] 사용자가 제공한 모든 질문과 답변을 빠짐없이 분석에 활용하세요:
- 올해의 나: 한 단어 표현, 혼자 있을 때 하는 것
- 감정: 행복했던/힘들었던 순간, 가장 많이 느낀 감정
- 관계: 고마웠던 사람, 못 한 말
- 성장: 가장 큰 변화, 1년 전 나에게 하고 싶은 말
- 미래: 되고 싶은 사람, 그만할 것, 하고 싶은 것

[무료 티어 - 작성할 섹션]
1. title: ~한 한 해 (예: "도전하며 성장한 한 해", "새로운 시작을 준비한 한 해")
2. summary: 2025년 총평 (3-4문장, 모든 카테고리 답변을 종합하여 핵심만 임팩트있게)
3. insight: 설문 응답으로 본 이 사람의 특징/성향 분석 (2-3문장, "당신은 ~한 사람이에요" 형태로)
4. advice: 응원 한마디 (2026년을 위한 따뜻한 한마디)
5. keywords: 이 사람의 2025년을 나타내는 키워드 10개 (배열로, 답변에서 추출)

[작성 규칙]
1. 따뜻하고 응원하는 톤으로 작성
2. 사용자의 모든 답변을 자연스럽게 녹여내기 (버려지는 답변 없이!)
3. 공유하고 싶어지는 임팩트 있는 문장
4. 과도한 칭찬이나 뻔한 표현 피하기
5. 짧지만 마음에 남는 글`,

  // 프리미엄 티어: 풀 AI (7섹션 + 키워드)
  premium: `당신은 따뜻하고 공감 능력이 뛰어난 연말결산 작성자입니다.
사용자(1인)의 답변을 바탕으로 2025년을 돌아보는 개인화된 연말결산을 작성해주세요.

[중요] 사용자가 제공한 30개 질문의 모든 답변을 빠짐없이 분석에 활용하세요:
- 올해의 나 (3개): 한 단어 표현, 나를 잘 아는 사람, 그 사람이 보는 나
- 감정과 내면 (3개): 행복했던 순간, 힘들었던 순간, 요즘 무서운 것
- 관계 (3개): 숨겨진 강점, 새롭게 소중해진 사람, 멀어진 사람
- 성장과 변화 (6개): 1년 전 안 했을 것, 1년 전 나에게 하고 싶은 말, 자주 미룬 것, 포기한 것, 완주한 것, 고민 중인 것
- 나다움/취향 (12개): 보다가 만 영상, 노래, 책, 장소, 여행지, 음식, 잘한 소비, 취미, 향수, 매력 없어진 것, 숨겨둔 비밀, 버려야 할 물건
- 미래의 나 (3개): 되고 싶은 사람, 1월에 실행할 것, 1년 후의 나

[프리미엄 티어 - 작성할 섹션 (7개 + 키워드)]
1. title: ~한 한 해 (예: "도전하며 성장한 한 해")
2. summary: 2025년 총평 (5-6문장, 모든 카테고리를 아우르며 깊이 있게)
3. emotion: 감정 분석 (4-5문장, 행복/힘들었던 순간과 주요 감정 분석)
4. relationship: 관계 돌아보기 (3-4문장, 고마운 사람, 소중해진/멀어진 관계)
5. growth: 성장 포인트 (4-5문장, 변화, 완주한 것, 미룬 것, 고민)
6. taste: 취향/나다움 분석 (3-4문장, 콘텐츠/소비/취미로 본 성격과 가치관)
7. advice: 2026년을 위한 응원 (3-4문장, 미래 계획과 연결하여)
8. keywords: 이 사람의 2025년을 나타내는 키워드 10개 (배열로)

[작성 규칙]
1. 따뜻하고 응원하는 톤으로 작성
2. 사용자의 모든 답변을 자연스럽게 녹여내기 (버려지는 답변 없이!)
3. 심리학적 인사이트를 살짝 가미
4. 과도한 칭찬이나 뻔한 표현 피하기
5. 정말 이 사람만을 위한 글처럼 느껴지도록`,
};

export async function POST(request: NextRequest) {
  try {
    const { answers, tier } = await request.json();

    if (!answers || !tier) {
      return NextResponse.json(
        { error: "Missing answers or tier" },
        { status: 400 }
      );
    }

    const systemPrompt = tierPrompts[tier as Tier];
    if (!systemPrompt) {
      return NextResponse.json(
        { error: "Invalid tier" },
        { status: 400 }
      );
    }

    const userMessage = `[사용자 답변]
${JSON.stringify(answers, null, 2)}

위 답변을 바탕으로 연말결산을 JSON 형식으로 작성해주세요.
${tier === "premium" ?
`출력 형식:
{
  "title": "~한 한 해",
  "summary": "총평...",
  "emotion": "감정 분석...",
  "relationship": "관계 분석...",
  "growth": "성장 분석...",
  "taste": "취향/나다움 분석...",
  "advice": "2026 응원...",
  "keywords": ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5", "키워드6", "키워드7", "키워드8", "키워드9", "키워드10"]
}` :
`출력 형식:
{
  "title": "~한 한 해",
  "summary": "총평...",
  "insight": "당신은 ~한 사람이에요...",
  "advice": "응원 한마디...",
  "keywords": ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5", "키워드6", "키워드7", "키워드8", "키워드9", "키워드10"]
}`}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.8,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    const result = JSON.parse(content);

    return NextResponse.json({ result });
  } catch (error) {
    console.error("AI generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate result" },
      { status: 500 }
    );
  }
}
