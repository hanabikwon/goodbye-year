"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { standardQuestions } from "@/data/questions";
import QuestionCard from "@/components/QuestionCard";

export default function FreeTestPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [standardQuestions[currentQuestion].id]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < standardQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const encoded = btoa(encodeURIComponent(JSON.stringify(answers)));
      router.push(`/test/free/result?data=${encoded}`);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    if (currentQuestion < standardQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const encoded = btoa(encodeURIComponent(JSON.stringify(answers)));
      router.push(`/test/free/result?data=${encoded}`);
    }
  };

  const currentQ = standardQuestions[currentQuestion];
  const currentAnswer = answers[currentQ?.id] || "";
  const canSkip = currentQ?.optional;
  const canProceed = currentAnswer || canSkip;

  if (!started) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center gap-2 mb-4">
              <span className="text-xs text-white bg-[#6b8e6b] px-3 py-1 rounded-full">
                무료
              </span>
              <span className="text-xs text-white bg-[#d4a574] px-3 py-1 rounded-full">
                AI 분석
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#5c4a3a] mb-2">
              핵심 분석 테스트
            </h1>
            <p className="text-[#8b7355]">
              20개 질문으로 나를 깊이 들여다보기
            </p>
          </div>

          <div className="felt-card stitch-border p-6 mb-6 border-2 border-[#d4a574]">
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#d4a574]/20 flex items-center justify-center text-sm font-bold text-[#5c4a3a]">1</div>
                <div>
                  <p className="font-medium text-[#5c4a3a]">올해의 나</p>
                  <p className="text-sm text-[#8b7355]">3개 질문</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#d4a574]/20 flex items-center justify-center text-sm font-bold text-[#5c4a3a]">2</div>
                <div>
                  <p className="font-medium text-[#5c4a3a]">감정과 내면</p>
                  <p className="text-sm text-[#8b7355]">4개 질문</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#d4a574]/20 flex items-center justify-center text-sm font-bold text-[#5c4a3a]">3</div>
                <div>
                  <p className="font-medium text-[#5c4a3a]">관계</p>
                  <p className="text-sm text-[#8b7355]">4개 질문</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#d4a574]/20 flex items-center justify-center text-sm font-bold text-[#5c4a3a]">4</div>
                <div>
                  <p className="font-medium text-[#5c4a3a]">성장과 변화</p>
                  <p className="text-sm text-[#8b7355]">4개 질문</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#d4a574]/20 flex items-center justify-center text-sm font-bold text-[#5c4a3a]">5</div>
                <div>
                  <p className="font-medium text-[#5c4a3a]">미래의 나</p>
                  <p className="text-sm text-[#8b7355]">3개 질문</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#d4a574]/20 flex items-center justify-center text-sm font-bold text-[#5c4a3a]">6</div>
                <div>
                  <p className="font-medium text-[#5c4a3a]">마무리</p>
                  <p className="text-sm text-[#8b7355]">2개 질문</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#d4a574]/30 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#8b7355]">예상 소요시간</span>
                <span className="text-[#5c4a3a]">약 7분</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8b7355]">AI 분석</span>
                <span className="text-[#6b8e6b]">2025년 총평 + 한줄 조언</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="felt-button w-full text-lg"
          >
            무료로 시작하기
          </button>

          <a
            href="/"
            className="block text-center mt-6 text-[#8b7355] hover:underline"
          >
            다른 테스트 보기
          </a>
        </div>
      </main>
    );
  }

  const currentCategory = currentQ?.category || "";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="mb-4 text-sm text-[#8b7355]">
        {currentCategory}
      </div>

      <QuestionCard
        question={currentQ}
        answer={currentAnswer}
        onAnswer={handleAnswer}
        currentStep={currentQuestion + 1}
        totalSteps={standardQuestions.length}
      />

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
          {currentQuestion === standardQuestions.length - 1 ? "완료" : "다음"}
        </button>
      </div>
    </main>
  );
}
