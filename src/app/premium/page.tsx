"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { premiumQuestions } from "@/data/questions";
import QuestionCard from "@/components/QuestionCard";

export default function PremiumPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [premiumQuestions[currentQuestion].id]: answer }));
  };

  const handleNext = () => {
    // 선택적 질문은 건너뛸 수 있음
    if (currentQuestion < premiumQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // 완료 - 심층 결과 페이지로
      const encoded = btoa(encodeURIComponent(JSON.stringify(answers)));
      router.push(`/premium/result?data=${encoded}`);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    // 선택적 질문 건너뛰기
    if (currentQuestion < premiumQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const encoded = btoa(encodeURIComponent(JSON.stringify(answers)));
      router.push(`/premium/result?data=${encoded}`);
    }
  };

  const currentQ = premiumQuestions[currentQuestion];
  const currentAnswer = answers[currentQ?.id] || "";
  const canSkip = currentQ?.optional;
  const canProceed = currentAnswer || canSkip;

  // 시작/결제 화면
  if (!started) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#5c4a3a] mb-2">
              심층 테스트
            </h1>
            <p className="text-[#8b7355]">
              나를 더 깊이 들여다보는 25개의 질문
            </p>
          </div>

          <div className="felt-card stitch-border p-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">1.</span>
                <div>
                  <p className="font-medium text-[#5c4a3a]">올해의 나</p>
                  <p className="text-sm text-[#8b7355]">나를 표현하는 5가지 질문</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">2.</span>
                <div>
                  <p className="font-medium text-[#5c4a3a]">감정과 내면</p>
                  <p className="text-sm text-[#8b7355]">행복, 힘듦, 그리고 그 사이</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">3.</span>
                <div>
                  <p className="font-medium text-[#5c4a3a]">관계</p>
                  <p className="text-sm text-[#8b7355]">고마운 사람, 못 한 말</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">4.</span>
                <div>
                  <p className="font-medium text-[#5c4a3a]">성장과 변화</p>
                  <p className="text-sm text-[#8b7355]">1년간의 변화와 배움</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">5.</span>
                <div>
                  <p className="font-medium text-[#5c4a3a]">미래의 나</p>
                  <p className="text-sm text-[#8b7355]">2026년을 향한 다짐</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#d4a574]/30">
              <div className="flex justify-between text-sm text-[#8b7355]">
                <span>예상 소요시간</span>
                <span>약 10분</span>
              </div>
              <div className="flex justify-between text-sm text-[#8b7355] mt-1">
                <span>AI 분석 포함</span>
                <span>5개 섹션 상세 리포트</span>
              </div>
            </div>
          </div>

          {/* 결제 버튼 - 임시로 바로 시작 */}
          <button
            onClick={() => setStarted(true)}
            className="felt-button w-full text-lg"
          >
            시작하기 - 1,900원
          </button>
          <p className="text-center text-xs text-[#a89a8a] mt-3">
            * 현재 테스트 버전입니다
          </p>

          <a
            href="/"
            className="block text-center mt-6 text-[#8b7355] hover:underline"
          >
            무료 버전으로 돌아가기
          </a>
        </div>
      </main>
    );
  }

  // 질문 화면
  const currentCategory = currentQ?.category || "";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* 카테고리 표시 */}
      <div className="mb-4 text-sm text-[#8b7355]">
        {currentCategory}
      </div>

      <QuestionCard
        question={currentQ}
        answer={currentAnswer}
        onAnswer={handleAnswer}
        currentStep={currentQuestion + 1}
        totalSteps={premiumQuestions.length}
      />

      {/* 네비게이션 버튼 */}
      <div className="flex gap-4 mt-8">
        {currentQuestion > 0 && (
          <button
            onClick={handlePrev}
            className="px-6 py-3 rounded-full border-2 border-[#8b7355] text-[#8b7355]
                       hover:bg-[#8b7355] hover:text-white transition-colors"
          >
            이전
          </button>
        )}

        {canSkip && !currentAnswer && (
          <button
            onClick={handleSkip}
            className="px-6 py-3 rounded-full border-2 border-[#a89a8a] text-[#a89a8a]
                       hover:bg-[#a89a8a] hover:text-white transition-colors"
          >
            건너뛰기
          </button>
        )}

        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`felt-button ${!canProceed ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {currentQuestion === premiumQuestions.length - 1 ? "완료" : "다음"}
        </button>
      </div>
    </main>
  );
}
