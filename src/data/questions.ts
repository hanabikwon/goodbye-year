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
// 스탠다드 질문 (12개) - 무료 티어
// ============================================
export const standardQuestions: Question[] = [
  // 올해의 나 (2개)
  {
    id: 1,
    question: "2025년을 한 단어로 표현한다면?",
    type: "select",
    options: [
      "성장",
      "도전",
      "회복",
      "변화",
      "시작",
      "혼란",
      "안정",
      "휴식",
      "버팀",
      "사랑",
      "이별",
      "전환",
    ],
    category: "올해의 나",
  },
  {
    id: 2,
    question: "나는 혼자 있을 때 ____를 한다",
    type: "text",
    placeholder: "예: 음악 듣기, 멍때리기, 유튜브...",
    category: "올해의 나",
  },

  // 감정 (3개)
  {
    id: 3,
    question: "올해 가장 행복했던 순간은?",
    type: "text",
    placeholder: "구체적인 순간이나 상황...",
    category: "감정",
  },
  {
    id: 4,
    question: "올해 가장 힘들었던 순간은?",
    type: "text",
    placeholder: "솔직하게 적어도 괜찮아요...",
    category: "감정",
  },
  {
    id: 5,
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

  // 관계 (2개)
  {
    id: 6,
    question: "올해 가장 고마웠던 사람은?",
    type: "text",
    placeholder: "그 사람을 떠올려보세요...",
    category: "관계",
  },
  {
    id: 7,
    question: "그 사람에게 못 한 말이 있다면?",
    type: "text",
    placeholder: "전하지 못한 말...",
    category: "관계",
  },

  // 성장과 변화 (2개)
  {
    id: 8,
    question: "올해 나에게 가장 큰 변화는?",
    type: "select",
    options: [
      "일·커리어",
      "관계·사람",
      "건강·몸",
      "거주지·환경",
      "마음가짐",
      "취미·관심사",
      "외모",
      "경제적 상황",
      "없음",
    ],
    category: "성장",
  },
  {
    id: 9,
    question: "1년 전의 나에게 해주고 싶은 말은?",
    type: "text",
    placeholder: "그때의 나에게...",
    category: "성장",
  },

  // 미래 (3개)
  {
    id: 10,
    question: "2026년엔 어떤 사람이 되고 싶나?",
    type: "text",
    placeholder: "내년의 내 모습...",
    category: "미래",
  },
  {
    id: 11,
    question: "내년엔 ____는 그만할 거다",
    type: "text",
    placeholder: "더 이상 안 할 것...",
    category: "미래",
  },
  {
    id: 12,
    question: "내년에 꼭 하고 싶은 것 하나는?",
    type: "text",
    placeholder: "꼭 이루고 싶은 것...",
    category: "미래",
  },
];

// ============================================
// 프리미엄 질문 (30개) - 1,900원
// ============================================
export const premiumQuestions: Question[] = [
  // 올해의 나 (3개)
  {
    id: 1,
    question: "2025년을 한 단어로 표현한다면?",
    type: "select",
    options: [
      "성장",
      "도전",
      "회복",
      "변화",
      "시작",
      "혼란",
      "안정",
      "휴식",
      "버팀",
      "사랑",
      "이별",
      "전환",
    ],
    category: "올해의 나",
  },
  {
    id: 2,
    question: "올해 나를 가장 잘 아는 사람은 누구?",
    type: "text",
    placeholder: "이름이나 관계...",
    category: "올해의 나",
  },
  {
    id: 3,
    question: "그 사람은 나를 뭐라고 표현할까?",
    type: "text",
    placeholder: "그 사람의 시선으로...",
    category: "올해의 나",
  },

  // 감정과 내면 (3개)
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
    question: "요즘 나는 ____가 제일 무섭다",
    type: "text",
    placeholder: "예: 건강, 미래, 외로움, 실패...",
    category: "감정과 내면",
  },

  // 관계 (3개)
  {
    id: 7,
    question: "사람들은 잘 모르지만 나는 ____에 자신 있다",
    type: "text",
    placeholder: "숨겨둔 나만의 강점...",
    category: "관계",
  },
  {
    id: 8,
    question: "올해 새롭게 소중해진 사람이 있다면?",
    type: "text",
    placeholder: "올해 가까워진 사람...",
    optional: true,
    category: "관계",
  },
  {
    id: 9,
    question: "올해 멀어진 사람이 있다면?",
    type: "text",
    placeholder: "아쉽지만 멀어진 사람...",
    optional: true,
    category: "관계",
  },

  // 성장과 변화 (6개)
  {
    id: 10,
    question: "1년 전의 나라면 절대 안 했을 것을 올해 했다면?",
    type: "text",
    placeholder: "과거의 내가 보면 놀랄 일...",
    category: "성장과 변화",
  },
  {
    id: 11,
    question: "1년 전의 나에게 해주고 싶은 말은?",
    type: "text",
    placeholder: "그때의 나에게...",
    category: "성장과 변화",
  },
  {
    id: 12,
    question: "올해 가장 자주 미룬 것은?",
    type: "text",
    placeholder: "계속 내일로 미뤘던 것...",
    category: "성장과 변화",
  },
  {
    id: 13,
    question: "올해 포기한 것 중 후회되는 게 있나?",
    type: "text",
    placeholder: "놓아버린 것들 중...",
    optional: true,
    category: "성장과 변화",
  },
  {
    id: 14,
    question: "올해 완주한 것이 있다면?",
    type: "text",
    placeholder: "끝까지 해낸 것...",
    optional: true,
    category: "성장과 변화",
  },
  {
    id: 15,
    question: "아직도 고민 중인 것이 있다면?",
    type: "text",
    placeholder: "결론 못 내린 것...",
    optional: true,
    category: "성장과 변화",
  },

  // 나다움/취향 (12개)
  {
    id: 16,
    question: "올해 보다가 만 영화나 드라마가 있다면?",
    type: "text",
    placeholder: "왜 포기했는지도...",
    optional: true,
    category: "나다움/취향",
  },
  {
    id: 17,
    question: "올해 가장 많이 들은 노래나 아티스트는?",
    type: "text",
    placeholder: "노래 제목이나 가수 이름...",
    category: "나다움/취향",
  },
  {
    id: 18,
    question: "올해 읽은 책 중 기억에 남는 게 있다면?",
    type: "text",
    placeholder: "책 제목...",
    optional: true,
    category: "나다움/취향",
  },
  {
    id: 19,
    question: "올해 가장 좋았던 장소나 공간은?",
    type: "text",
    placeholder: "자주 갔거나 기억에 남는 곳...",
    category: "나다움/취향",
  },
  {
    id: 20,
    question: "올해 다녀온 여행지 중 최고는?",
    type: "text",
    placeholder: "여행지 이름...",
    optional: true,
    category: "나다움/취향",
  },
  {
    id: 21,
    question: "올해 가장 맛있게 먹은 것은?",
    type: "text",
    placeholder: "음식이나 식당 이름...",
    category: "나다움/취향",
  },
  {
    id: 22,
    question: "올해 가장 잘한 소비는?",
    type: "text",
    placeholder: "사길 잘했다 싶은 것...",
    category: "나다움/취향",
  },
  {
    id: 23,
    question: "올해 새롭게 빠진 취미나 관심사가 있다면?",
    type: "text",
    placeholder: "새로 시작한 것...",
    optional: true,
    category: "나다움/취향",
  },
  {
    id: 24,
    question: "올해 자주 뿌린 향수가 있다면?",
    type: "text",
    placeholder: "향수 이름...",
    optional: true,
    category: "나다움/취향",
  },
  {
    id: 25,
    question: "그때는 좋았는데 지금은 매력이 없어 보이는 무언가?",
    type: "text",
    placeholder: "흥미를 잃은 것...",
    category: "나다움/취향",
  },
  {
    id: 26,
    question: "올해 숨겨둔 작은 비밀은?",
    type: "text",
    placeholder: "전 연인 SNS 몰래보기, 숨겨둔 비상금, 아픈 척 약속 취소...",
    category: "나다움/취향",
  },
  {
    id: 27,
    question: "버리기를 미루고 있던 지금 당장 버려야 할 물건은?",
    type: "text",
    placeholder: "정리 못 한 물건...",
    category: "나다움/취향",
  },

  // 미래의 나 (3개)
  {
    id: 28,
    question: "2026년엔 어떤 사람이 되고 싶나?",
    type: "text",
    placeholder: "내년의 내 모습...",
    category: "미래의 나",
  },
  {
    id: 29,
    question: "내년 1월에 바로 실행할 것 한 가지는?",
    type: "text",
    placeholder: "새해 첫 달에 바로...",
    category: "미래의 나",
  },
  {
    id: 30,
    question: "내년 이맘때 나는 어디에서 무엇을 하고 있을까?",
    type: "text",
    placeholder: "1년 후의 나를 상상해보면...",
    category: "미래의 나",
  },
];

// 기본 export (무료)
export const questions = freeQuestions;

// 티어별 가격 (2티어 구조)
export const tierPricing = {
  free: { price: 0, questions: 12, name: "무료", hasAI: true, aiType: "light" },
  premium: { price: 1900, questions: 30, name: "프리미엄", hasAI: true, aiType: "full" },
};
