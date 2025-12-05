"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import { freeQuestions } from "@/data/questions";

function ResultContent() {
  const searchParams = useSearchParams();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(data)));
        setAnswers(decoded);
      } catch (e) {
        console.error("Failed to parse data");
      }
    }
  }, [searchParams]);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/view?data=${searchParams.get("data")}`
    : "";

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "나의 2025 연말결산",
        text: "내 연말결산을 확인해보세요!",
        url: shareUrl,
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-md mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#5c4a3a]">
            나의 2025 연말결산
          </h1>
          <p className="text-[#8b7355] mt-2">기본 버전</p>
        </div>

        {/* 결과 카드 */}
        <div ref={resultRef} className="felt-card stitch-border p-6 space-y-6">
          {/* 한 단어 */}
          {answers[1] && (
            <div className="text-center py-4">
              <p className="text-sm text-[#8b7355] mb-1">2025년을 한 단어로</p>
              <p className="text-2xl font-bold text-[#5c4a3a]">"{answers[1]}"</p>
            </div>
          )}

          {/* 어떤 사람 */}
          {answers[2] && (
            <div className="bg-white/50 rounded-xl p-4">
              <p className="text-sm text-[#8b7355] mb-1">올해 나는 어떤 사람이었나</p>
              <p className="text-[#5c4a3a] font-medium">{answers[2]}</p>
            </div>
          )}

          {/* 감정 */}
          {answers[3] && (
            <div className="bg-white/50 rounded-xl p-4">
              <p className="text-sm text-[#8b7355] mb-1">가장 많이 느낀 감정</p>
              <p className="text-[#5c4a3a] font-medium">{answers[3]}</p>
            </div>
          )}

          {/* 행복했던 순간 */}
          {answers[4] && (
            <div className="bg-[#6b8e6b]/20 rounded-xl p-4">
              <p className="text-sm text-[#6b8e6b] mb-1">가장 행복했던 순간</p>
              <p className="text-[#5c4a3a]">"{answers[4]}"</p>
            </div>
          )}

          {/* 힘들었던 순간 */}
          {answers[5] && (
            <div className="bg-[#c45c4a]/10 rounded-xl p-4">
              <p className="text-sm text-[#c45c4a] mb-1">가장 힘들었던 순간</p>
              <p className="text-[#5c4a3a]">"{answers[5]}"</p>
            </div>
          )}

          {/* 변화 */}
          {answers[6] && (
            <div className="bg-white/50 rounded-xl p-4">
              <p className="text-sm text-[#8b7355] mb-1">올해의 변화</p>
              <p className="text-[#5c4a3a] font-medium">{answers[6]}</p>
            </div>
          )}

          {/* 내년 목표 */}
          {answers[7] && (
            <div className="text-center py-4 border-t-2 border-dashed border-[#d4a574]">
              <p className="text-sm text-[#8b7355] mb-1">2026년엔 이런 사람이 되고 싶어</p>
              <p className="text-lg font-bold text-[#5c4a3a]">"{answers[7]}"</p>
            </div>
          )}

          {/* 나에게 한마디 */}
          {answers[8] && (
            <div className="bg-[#d4a574]/20 rounded-xl p-4 border-2 border-dashed border-[#d4a574]">
              <p className="text-sm text-[#8b7355] mb-1">올해의 나에게</p>
              <p className="text-[#5c4a3a] italic">"{answers[8]}"</p>
            </div>
          )}

          {/* 친구에게 */}
          {answers[10] && (
            <div className="bg-[#6b8e6b]/20 rounded-xl p-4">
              <p className="text-sm text-[#6b8e6b] mb-1">이 결과를 보는 당신에게</p>
              <p className="text-[#5c4a3a]">"{answers[10]}"</p>
            </div>
          )}

          {/* 푸터 */}
          <div className="text-center pt-4 border-t border-[#d4a574]/30">
            <p className="text-xs text-[#a89a8a]">2025 연말결산</p>
          </div>
        </div>

        {/* AI 테스트 CTA */}
        <div className="mt-8 felt-card stitch-border p-6 bg-gradient-to-br from-[#f5e6d3] to-[#e8d4bc]">
          <div className="text-center">
            <p className="text-lg font-bold text-[#5c4a3a] mb-2">
              AI가 분석해주는 종합 연말결산은?
            </p>
            <p className="text-sm text-[#8b7355] mb-4">
              50개 질문으로 나의 모든 것을<br />
              AI가 심층 분석해드려요
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-[#8b7355] mb-4">
              <span className="bg-white/50 px-2 py-1 rounded-full">감정 분석</span>
              <span className="bg-white/50 px-2 py-1 rounded-full">관계 돌아보기</span>
              <span className="bg-white/50 px-2 py-1 rounded-full">성장 포인트</span>
              <span className="bg-white/50 px-2 py-1 rounded-full">취향/나다움</span>
              <span className="bg-white/50 px-2 py-1 rounded-full">나만의 키워드</span>
            </div>
            <a
              href="/test/premium"
              className="felt-button inline-block"
            >
              종합 분석 테스트 - 1,900원
            </a>
          </div>
        </div>

        {/* 공유 버튼 */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleShare}
            className="w-full py-3 rounded-full border-2 border-[#8b7355] text-[#8b7355]
                       hover:bg-[#8b7355] hover:text-white transition-colors"
          >
            기본 결과 공유하기
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full py-3 rounded-full border-2 border-[#8b7355]/50 text-[#8b7355]/70
                       hover:bg-[#8b7355]/10 transition-colors text-sm"
          >
            {copied ? "복사됨!" : "링크 복사"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#8b7355]">로딩중...</div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
