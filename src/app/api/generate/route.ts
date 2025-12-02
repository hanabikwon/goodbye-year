import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Tier = "free" | "premium";

const tierPrompts: Record<Tier, string> = {
  // 무료 티어: 라이트 AI (3섹션) - 바이럴용
  free: `당신은 따뜻하고 공감 능력이 뛰어난 연말결산 작성자입니다.
사용자(1인)의 답변을 바탕으로 2025년을 돌아보는 개인화된 연말결산을 작성해주세요.

[무료 티어 - 작성할 섹션 (3개)]
1. title: ~한 한 해 (예: "도전하며 성장한 한 해", "새로운 시작을 준비한 한 해")
2. summary: 2025년 총평 (3-4문장, 핵심만 임팩트있게)
3. advice: 한줄 조언 (2026년을 위한 따뜻한 한마디)

[작성 규칙]
1. 따뜻하고 응원하는 톤으로 작성
2. 사용자의 답변을 자연스럽게 녹여내기
3. 공유하고 싶어지는 임팩트 있는 문장
4. 과도한 칭찬이나 뻔한 표현 피하기
5. 짧지만 마음에 남는 글`,

  // 프리미엄 티어: 풀 AI (7섹션 + 키워드)
  premium: `당신은 따뜻하고 공감 능력이 뛰어난 연말결산 작성자입니다.
사용자(1인)의 답변을 바탕으로 2025년을 돌아보는 개인화된 연말결산을 작성해주세요.

[프리미엄 티어 - 작성할 섹션 (7개 + 키워드)]
1. title: ~한 한 해 (예: "도전하며 성장한 한 해")
2. summary: 2025년 총평 (5-6문장, 깊이 있게)
3. emotion: 감정 분석 (4-5문장)
4. relationship: 관계 돌아보기 (3-4문장)
5. growth: 성장 포인트 (4-5문장)
6. taste: 취향/나다움 분석 (3-4문장, 선택/소비 패턴으로 본 성격)
7. advice: 2026년 맞춤 조언 (3-4문장)
8. keywords: 이 사람을 나타내는 키워드 5개 (배열로)

[작성 규칙]
1. 따뜻하고 응원하는 톤으로 작성
2. 사용자의 답변을 자연스럽게 녹여내기
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
  "advice": "2026 조언...",
  "keywords": ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5"]
}` :
`출력 형식:
{
  "title": "~한 한 해",
  "summary": "총평...",
  "advice": "한줄 조언..."
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
