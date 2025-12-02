export interface Question {
  id: number;
  question: string;
  type: "select" | "text";
  options?: string[];
  placeholder?: string;
  optional?: boolean;
  category?: string;
}

// ============================================
// 무료 질문 (10개) - AI 분석 없음
// ============================================
export const freeQuestions: Question[] = [
  {
    id: 1,
    question: "2025년을 한 단어로 표현한다면?",
    type: "text",
    placeholder: "예: 성장, 도전, 회복...",
    category: "올해의 나",
  },
  {
    id: 2,
    question: "올해 나는 어떤 사람이었나?",
    type: "text",
    placeholder: "스스로 생각하는 올해의 나...",
    category: "올해의 나",
  },
  {
    id: 3,
    question: "올해 가장 많이 느낀 감정은?",
    type: "select",
    options: [
      "설렘과 기대",
      "불안과 걱정",
      "뿌듯함과 성취감",
      "지침과 번아웃",
      "감사와 행복",
      "외로움",
      "평온함",
    ],
    category: "감정",
  },
  {
    id: 4,
    question: "올해 가장 행복했던 순간은?",
    type: "text",
    placeholder: "구체적인 순간이나 상황...",
    category: "감정",
  },
  {
    id: 5,
    question: "올해 가장 힘들었던 순간은?",
    type: "text",
    placeholder: "솔직하게 적어도 괜찮아요...",
    category: "감정",
  },
  {
    id: 6,
    question: "올해 나에게 가장 큰 변화는?",
    type: "text",
    placeholder: "내면이든 외적이든...",
    category: "변화",
  },
  {
    id: 7,
    question: "2026년엔 어떤 사람이 되고 싶나?",
    type: "text",
    placeholder: "내년의 내 모습...",
    category: "미래",
  },
  {
    id: 8,
    question: "올해의 나에게 수고했다고 한마디",
    type: "text",
    placeholder: "나에게 하고 싶은 말...",
    category: "마무리",
  },
  {
    id: 9,
    question: "1년 후 이걸 다시 본다면, 기억하고 싶은 것은?",
    type: "text",
    placeholder: "미래의 내가 기억했으면 하는 것...",
    category: "마무리",
  },
  {
    id: 10,
    question: "이 결과를 볼 누군가에게 한마디",
    type: "text",
    placeholder: "친구, 가족, 혹은 미래의 나에게...",
    optional: true,
    category: "마무리",
  },
];

// ============================================
// 라이트 질문 (15개) - 1,900원
// ============================================
export const lightQuestions: Question[] = [
  // 올해의 나 (3개)
  {
    id: 1,
    question: "2025년을 한 단어로 표현한다면?",
    type: "text",
    placeholder: "예: 성장, 도전, 회복...",
    category: "올해의 나",
  },
  {
    id: 2,
    question: "올해 가장 많이 한 생각은?",
    type: "text",
    placeholder: "머릿속을 맴돌았던 생각...",
    category: "올해의 나",
  },
  {
    id: 3,
    question: "올해 나는 어떤 사람이었나?",
    type: "text",
    placeholder: "스스로 생각하는 올해의 나...",
    category: "올해의 나",
  },

  // 감정 (4개)
  {
    id: 4,
    question: "올해 가장 행복했던 순간은?",
    type: "text",
    placeholder: "구체적인 순간이나 상황...",
    category: "감정",
  },
  {
    id: 5,
    question: "올해 가장 힘들었던 순간은?",
    type: "text",
    placeholder: "솔직하게 적어도 괜찮아요...",
    category: "감정",
  },
  {
    id: 6,
    question: "올해 가장 많이 느낀 감정은?",
    type: "select",
    options: [
      "설렘과 기대",
      "불안과 걱정",
      "뿌듯함과 성취감",
      "지침과 번아웃",
      "감사와 행복",
      "외로움",
      "평온함",
      "혼란스러움",
    ],
    category: "감정",
  },
  {
    id: 7,
    question: "그 감정을 느끼게 한 건 뭐였나?",
    type: "text",
    placeholder: "상황, 사람, 사건...",
    category: "감정",
  },

  // 변화 (3개)
  {
    id: 8,
    question: "올해 나에게 가장 큰 변화는?",
    type: "text",
    placeholder: "내면이든 외적이든...",
    category: "변화",
  },
  {
    id: 9,
    question: "올해 새롭게 시작한 것이 있다면?",
    type: "text",
    placeholder: "새로운 시도, 습관, 관계...",
    category: "변화",
  },
  {
    id: 10,
    question: "올해 나를 성장시킨 경험은?",
    type: "text",
    placeholder: "힘들었지만 성장한 경험...",
    category: "변화",
  },

  // 미래 (3개)
  {
    id: 11,
    question: "2026년엔 어떤 사람이 되고 싶나?",
    type: "text",
    placeholder: "내년의 내 모습...",
    category: "미래",
  },
  {
    id: 12,
    question: "내년에 꼭 하고 싶은 것 하나는?",
    type: "text",
    placeholder: "꼭 이루고 싶은 것...",
    category: "미래",
  },
  {
    id: 13,
    question: "올해의 나에게 수고했다고 한마디",
    type: "text",
    placeholder: "나에게 건네는 말...",
    category: "미래",
  },

  // 마무리 (2개)
  {
    id: 14,
    question: "1년 후 이걸 다시 본다면, 기억하고 싶은 것은?",
    type: "text",
    placeholder: "미래의 내가 기억했으면 하는 것...",
    category: "마무리",
  },
  {
    id: 15,
    question: "이 결과를 볼 누군가에게 한마디",
    type: "text",
    placeholder: "친구, 가족, 혹은 미래의 나에게...",
    optional: true,
    category: "마무리",
  },
];

// ============================================
// 스탠다드 질문 (20개) - 1,900원
// ============================================
export const standardQuestions: Question[] = [
  // 올해의 나 (3개)
  {
    id: 1,
    question: "2025년을 한 단어로 표현한다면?",
    type: "text",
    placeholder: "예: 성장, 도전, 회복...",
    category: "올해의 나",
  },
  {
    id: 2,
    question: "올해 가장 많이 한 생각은?",
    type: "text",
    placeholder: "머릿속을 맴돌았던 생각...",
    category: "올해의 나",
  },
  {
    id: 3,
    question: "올해 나는 어떤 사람이었나?",
    type: "text",
    placeholder: "스스로 생각하는 올해의 나...",
    category: "올해의 나",
  },

  // 감정과 내면 (4개)
  {
    id: 4,
    question: "올해 가장 행복했던 순간은?",
    type: "text",
    placeholder: "구체적인 순간이나 상황...",
    category: "감정과 내면",
  },
  {
    id: 5,
    question: "올해 가장 힘들었던 순간은?",
    type: "text",
    placeholder: "솔직하게 적어도 괜찮아요...",
    category: "감정과 내면",
  },
  {
    id: 6,
    question: "올해 가장 많이 느낀 감정은?",
    type: "select",
    options: [
      "설렘과 기대",
      "불안과 걱정",
      "뿌듯함과 성취감",
      "지침과 번아웃",
      "감사와 행복",
      "외로움",
      "평온함",
      "혼란스러움",
    ],
    category: "감정과 내면",
  },
  {
    id: 7,
    question: "그 감정을 느끼게 한 건 뭐였나?",
    type: "text",
    placeholder: "상황, 사람, 사건...",
    category: "감정과 내면",
  },

  // 관계 (4개)
  {
    id: 8,
    question: "올해 가장 고마웠던 사람은?",
    type: "text",
    placeholder: "그 사람을 떠올려보세요...",
    category: "관계",
  },
  {
    id: 9,
    question: "그 사람에게 못 한 말이 있다면?",
    type: "text",
    placeholder: "전하지 못한 말...",
    category: "관계",
  },
  {
    id: 10,
    question: "올해 관계에서 배운 것이 있다면?",
    type: "text",
    placeholder: "사람들과의 관계를 통해 배운 것...",
    category: "관계",
  },
  {
    id: 11,
    question: "올해 새롭게 소중해진 사람이 있다면?",
    type: "text",
    placeholder: "새로운 인연...",
    optional: true,
    category: "관계",
  },

  // 성장과 변화 (4개)
  {
    id: 12,
    question: "올해 나에게 가장 큰 변화는?",
    type: "text",
    placeholder: "내면이든 외적이든...",
    category: "성장과 변화",
  },
  {
    id: 13,
    question: "1년 전의 나에게 해주고 싶은 말은?",
    type: "text",
    placeholder: "그때의 나에게...",
    category: "성장과 변화",
  },
  {
    id: 14,
    question: "올해 나를 성장시킨 경험은?",
    type: "text",
    placeholder: "힘들었지만 성장한 경험...",
    category: "성장과 변화",
  },
  {
    id: 15,
    question: "올해 새롭게 시작한 것이 있다면?",
    type: "text",
    placeholder: "새로운 시도, 습관, 관계...",
    category: "성장과 변화",
  },

  // 미래의 나 (3개)
  {
    id: 16,
    question: "2026년엔 어떤 사람이 되고 싶나?",
    type: "text",
    placeholder: "내년의 내 모습...",
    category: "미래의 나",
  },
  {
    id: 17,
    question: "내년에 꼭 하고 싶은 것 하나는?",
    type: "text",
    placeholder: "꼭 이루고 싶은 것...",
    category: "미래의 나",
  },
  {
    id: 18,
    question: "올해의 나에게 수고했다고 한마디",
    type: "text",
    placeholder: "나에게 건네는 말...",
    category: "미래의 나",
  },

  // 마무리 (2개)
  {
    id: 19,
    question: "1년 후 이걸 다시 본다면, 기억하고 싶은 것은?",
    type: "text",
    placeholder: "미래의 내가 기억했으면 하는 것...",
    category: "마무리",
  },
  {
    id: 20,
    question: "이 결과를 볼 누군가에게 한마디",
    type: "text",
    placeholder: "친구, 가족, 혹은 미래의 나에게...",
    optional: true,
    category: "마무리",
  },
];

// ============================================
// 프리미엄 질문 (50개) - 3,900원
// ============================================
export const premiumQuestions: Question[] = [
  // 올해의 나 (4개)
  {
    id: 1,
    question: "2025년을 한 단어로 표현한다면?",
    type: "text",
    placeholder: "예: 성장, 도전, 회복...",
    category: "올해의 나",
  },
  {
    id: 2,
    question: "올해 나를 가장 잘 아는 사람은 누구?",
    type: "text",
    placeholder: "이름이나 관계 (예: 엄마, 친구 oo)",
    category: "올해의 나",
  },
  {
    id: 3,
    question: "그 사람은 나를 뭐라고 표현할까?",
    type: "text",
    placeholder: "그 사람이 본 나는...",
    category: "올해의 나",
  },
  {
    id: 4,
    question: "올해 나는 어떤 사람이었나?",
    type: "text",
    placeholder: "스스로 생각하는 올해의 나...",
    category: "올해의 나",
  },

  // 감정과 내면 (7개)
  {
    id: 5,
    question: "올해 가장 행복했던 순간은?",
    type: "text",
    placeholder: "구체적인 순간이나 상황...",
    category: "감정과 내면",
  },
  {
    id: 6,
    question: "올해 가장 힘들었던 순간은?",
    type: "text",
    placeholder: "솔직하게 적어도 괜찮아요...",
    category: "감정과 내면",
  },
  {
    id: 7,
    question: "혼자 있을 때 주로 무슨 생각을 했나?",
    type: "text",
    placeholder: "자주 떠올랐던 생각들...",
    category: "감정과 내면",
  },
  {
    id: 8,
    question: "올해 가장 많이 느낀 감정은?",
    type: "select",
    options: [
      "설렘과 기대",
      "불안과 걱정",
      "뿌듯함과 성취감",
      "지침과 번아웃",
      "감사와 행복",
      "외로움",
      "평온함",
      "혼란스러움",
    ],
    category: "감정과 내면",
  },
  {
    id: 9,
    question: "그 감정을 느끼게 한 건 뭐였나?",
    type: "text",
    placeholder: "상황, 사람, 사건...",
    category: "감정과 내면",
  },
  {
    id: 10,
    question: "올해 나를 울게 한 것은?",
    type: "text",
    placeholder: "슬픔, 감동, 억울함...",
    optional: true,
    category: "감정과 내면",
  },
  {
    id: 11,
    question: "올해 나를 화나게 한 것은?",
    type: "text",
    placeholder: "분노, 짜증, 억울함...",
    optional: true,
    category: "감정과 내면",
  },

  // 관계 (6개)
  {
    id: 12,
    question: "올해 가장 고마웠던 사람은?",
    type: "text",
    placeholder: "그 사람을 떠올려보세요...",
    category: "관계",
  },
  {
    id: 13,
    question: "그 사람에게 못 한 말이 있다면?",
    type: "text",
    placeholder: "전하지 못한 말...",
    category: "관계",
  },
  {
    id: 14,
    question: "올해 관계에서 배운 것이 있다면?",
    type: "text",
    placeholder: "사람들과의 관계를 통해 배운 것...",
    category: "관계",
  },
  {
    id: 15,
    question: "더 신경 쓰고 싶었는데 못 한 관계가 있나?",
    type: "text",
    placeholder: "아쉬웠던 관계...",
    optional: true,
    category: "관계",
  },
  {
    id: 16,
    question: "올해 새롭게 소중해진 사람이 있다면?",
    type: "text",
    placeholder: "새로운 인연...",
    optional: true,
    category: "관계",
  },
  {
    id: 17,
    question: "올해 멀어진 사람이 있다면?",
    type: "text",
    placeholder: "거리가 생긴 관계...",
    optional: true,
    category: "관계",
  },

  // 성장과 변화 (8개)
  {
    id: 18,
    question: "올해 나에게 가장 큰 변화는?",
    type: "text",
    placeholder: "내면이든 외적이든...",
    category: "성장과 변화",
  },
  {
    id: 19,
    question: "1년 전의 나에게 해주고 싶은 말은?",
    type: "text",
    placeholder: "그때의 나에게...",
    category: "성장과 변화",
  },
  {
    id: 20,
    question: "올해 새롭게 시작한 것이 있다면?",
    type: "text",
    placeholder: "새로운 시도, 습관, 관계...",
    category: "성장과 변화",
  },
  {
    id: 21,
    question: "올해 포기한 것 중 후회되는 게 있나?",
    type: "text",
    placeholder: "없으면 '없음'이라고 적어도 돼요",
    optional: true,
    category: "성장과 변화",
  },
  {
    id: 22,
    question: "올해 나를 성장시킨 경험은?",
    type: "text",
    placeholder: "힘들었지만 성장한 경험...",
    category: "성장과 변화",
  },
  {
    id: 23,
    question: "올해 완주한 것이 있다면?",
    type: "text",
    placeholder: "독서, 운동, 프로젝트 등...",
    optional: true,
    category: "성장과 변화",
  },
  {
    id: 24,
    question: "올해 도전했다가 실패한 것은?",
    type: "text",
    placeholder: "실패도 경험이에요...",
    optional: true,
    category: "성장과 변화",
  },
  {
    id: 25,
    question: "아직도 고민 중인 것이 있다면?",
    type: "text",
    placeholder: "풀리지 않은 고민...",
    optional: true,
    category: "성장과 변화",
  },

  // 나다움 (17개)
  {
    id: 26,
    question: "올해 가장 기억에 남는 영화나 드라마는?",
    type: "text",
    placeholder: "인상 깊었던 작품...",
    category: "나다움",
  },
  {
    id: 27,
    question: "올해 가장 많이 들은 노래나 아티스트는?",
    type: "text",
    placeholder: "플레이리스트에 있던 그 곡...",
    category: "나다움",
  },
  {
    id: 28,
    question: "올해 읽은 책 중 기억에 남는 게 있다면?",
    type: "text",
    placeholder: "없으면 읽고 싶은 책이라도...",
    optional: true,
    category: "나다움",
  },
  {
    id: 29,
    question: "올해 가장 좋았던 장소나 공간은?",
    type: "text",
    placeholder: "카페, 여행지, 동네 어딘가...",
    category: "나다움",
  },
  {
    id: 30,
    question: "올해 다녀온 여행지 중 최고는?",
    type: "text",
    placeholder: "국내든 해외든...",
    optional: true,
    category: "나다움",
  },
  {
    id: 31,
    question: "올해 가장 맛있게 먹은 것은?",
    type: "text",
    placeholder: "잊을 수 없는 그 맛...",
    category: "나다움",
  },
  {
    id: 32,
    question: "올해 가장 잘한 소비는?",
    type: "text",
    placeholder: "돈 쓴 보람이 있었던 것...",
    category: "나다움",
  },
  {
    id: 33,
    question: "올해 새롭게 빠진 취미나 관심사가 있다면?",
    type: "text",
    placeholder: "새로 시작한 것...",
    optional: true,
    category: "나다움",
  },
  {
    id: 34,
    question: "주말에 주로 뭘 했나?",
    type: "text",
    placeholder: "쉬는 날의 루틴...",
    category: "나다움",
  },
  {
    id: 35,
    question: "올해 나를 위로해준 콘텐츠가 있다면?",
    type: "text",
    placeholder: "유튜브, 팟캐스트, 웹툰 등...",
    optional: true,
    category: "나다움",
  },
  {
    id: 36,
    question: "올해 자주 뿌린 향수가 있다면?",
    type: "text",
    placeholder: "브랜드와 이름...",
    optional: true,
    category: "나다움",
  },
  {
    id: 37,
    question: "돈 vs 시간, 더 중요한 건?",
    type: "select",
    options: ["돈", "시간"],
    category: "나다움",
  },
  {
    id: 38,
    question: "안정 vs 도전, 당신의 선택은?",
    type: "select",
    options: ["안정", "도전"],
    category: "나다움",
  },
  {
    id: 39,
    question: "선의의 거짓말 vs 상처주는 진실, 더 싫은 건?",
    type: "select",
    options: ["선의의 거짓말", "상처주는 진실"],
    category: "나다움",
  },
  {
    id: 40,
    question: "시간여행이 가능하다면, 과거 vs 미래?",
    type: "select",
    options: ["과거", "미래"],
    category: "나다움",
  },
  {
    id: 41,
    question: "죽어도 하기 싫은 것 하나는?",
    type: "text",
    placeholder: "절대 안 하고 싶은 것...",
    category: "나다움",
  },
  {
    id: 42,
    question: "인생에서 가장 중요한 건 결국 뭘까?",
    type: "text",
    placeholder: "당신이 생각하는 인생의 핵심...",
    category: "나다움",
  },

  // 미래의 나 (4개)
  {
    id: 43,
    question: "2026년엔 어떤 사람이 되고 싶나?",
    type: "text",
    placeholder: "내년의 내 모습...",
    category: "미래의 나",
  },
  {
    id: 44,
    question: "내년에 꼭 하고 싶은 것 하나는?",
    type: "text",
    placeholder: "꼭 이루고 싶은 것...",
    category: "미래의 나",
  },
  {
    id: 45,
    question: "내년에 그만두고 싶은 것이 있다면?",
    type: "text",
    placeholder: "더 이상 하고 싶지 않은 것...",
    optional: true,
    category: "미래의 나",
  },
  {
    id: 46,
    question: "올해의 나에게 수고했다고 한마디",
    type: "text",
    placeholder: "나에게 건네는 말...",
    category: "미래의 나",
  },

  // 마무리 (4개)
  {
    id: 47,
    question: "2025년을 한 문장으로 정리한다면?",
    type: "text",
    placeholder: "올해를 담은 한 문장...",
    category: "마무리",
  },
  {
    id: 48,
    question: "내년의 나에게 하고 싶은 말은?",
    type: "text",
    placeholder: "1년 후 나에게...",
    category: "마무리",
  },
  {
    id: 49,
    question: "1년 후 이걸 다시 본다면, 기억하고 싶은 것은?",
    type: "text",
    placeholder: "미래의 내가 기억했으면 하는 것...",
    category: "마무리",
  },
  {
    id: 50,
    question: "이 결과를 볼 누군가에게 한마디",
    type: "text",
    placeholder: "친구, 가족, 혹은 미래의 나에게...",
    optional: true,
    category: "마무리",
  },
];

// 기본 export (무료)
export const questions = freeQuestions;

// 티어별 가격 (2티어 구조)
export const tierPricing = {
  free: { price: 0, questions: 20, name: "무료", hasAI: true, aiType: "light" },
  premium: { price: 2900, questions: 50, name: "프리미엄", hasAI: true, aiType: "full" },
};
