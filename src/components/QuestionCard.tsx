"use client";

import { Question } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
  answer: string;
  onAnswer: (answer: string) => void;
  currentStep: number;
  totalSteps: number;
}

export default function QuestionCard({
  question,
  answer,
  onAnswer,
  currentStep,
  totalSteps,
}: QuestionCardProps) {
  return (
    <div className="fade-in w-full max-w-md mx-auto">
      {/* 진행 상태 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-[#8b7355] mb-2">
          <span>질문 {currentStep}</span>
          <span>{currentStep} / {totalSteps}</span>
        </div>
        <div className="h-2 bg-[#e8d5b7] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#d4a574] transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* 질문 카드 */}
      <div className="felt-card stitch-border p-8">
        <h2 className="text-xl font-bold text-[#5c4a3a] mb-6 leading-relaxed">
          {question.question}
        </h2>

        {/* 텍스트 입력 */}
        {question.type === "text" && (
          <textarea
            value={answer}
            onChange={(e) => onAnswer(e.target.value)}
            placeholder={question.placeholder}
            className="w-full p-4 rounded-xl border-2 border-dashed border-[#8b7355] bg-white/50
                       focus:outline-none focus:border-[#d4a574] resize-none h-32
                       placeholder:text-[#a89a8a]"
          />
        )}

        {/* 선택형 */}
        {question.type === "select" && question.options && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswer(option)}
                className={`w-full p-4 rounded-xl text-left transition-all
                  ${
                    answer === option
                      ? "bg-[#d4a574] text-white border-2 border-[#8b7355]"
                      : "bg-white/50 border-2 border-dashed border-[#c4b59a] hover:border-[#8b7355]"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* 이모지 선택 */}
        {question.type === "emoji" && question.options && (
          <div className="grid grid-cols-4 gap-3">
            {question.options.map((emoji, index) => (
              <button
                key={index}
                onClick={() => onAnswer(emoji)}
                className={`text-4xl p-4 rounded-xl transition-all
                  ${
                    answer === emoji
                      ? "bg-[#d4a574] scale-110 shadow-lg"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
