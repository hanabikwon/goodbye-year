"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

interface AIResult {
  title: string;
  summary: string;
  emotion: string;
}

function LightResultContent() {
  const searchParams = useSearchParams();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(data)));
        setAnswers(decoded);
        generateAIResult(decoded);
      } catch (e) {
        console.error("Failed to parse data");
        setError("데이터를 불러올 수 없습니다");
        setIsGenerating(false);
      }
    }
  }, [searchParams]);

  const generateAIResult = async (answersData: Record<number, string>) => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: answersData, tier: "light" }),
      });

      if (!response.ok) {
        throw new Error("AI 생성 실패");
      }

      const data = await response.json();
      setAiResult(data.result);
    } catch (e) {
      console.error("AI generation failed:", e);
      // 폴백: AI 없이 기본 결과 표시
      setAiResult(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/view/light?data=${searchParams.get("data")}`
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
        text: "AI가 분석한 내 연말결산을 확인해보세요!",
        url: shareUrl,
      });
    } else {
      handleCopyLink();
    }
  };

  if (isGenerating) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4a574] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-bold text-[#5c4a3a] mb-2">
            AI가 분석 중이에요
          </h2>
          <p className="text-[#8b7355]">
            당신의 2025년을 정리하고 있어요...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <p className="text-[#c45c4a] mb-4">{error}</p>
          <a href="/" className="felt-button">처음으로</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs text-white bg-[#d4a574] px-3 py-1 rounded-full">
            라이트
          </span>
          <h1 className="text-3xl font-bold text-[#5c4a3a] mt-4">
            {aiResult?.title || "나의 2025 분석"}
          </h1>
        </div>

        {/* 2025년 총평 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            2025년 총평
          </h2>
          <div className="text-center py-4 mb-4">
            <p className="text-2xl font-bold text-[#5c4a3a]">"{answers[1] || "성장"}"</p>
            <p className="text-sm text-[#8b7355] mt-1">당신이 정의한 2025년</p>
          </div>
          <p className="text-[#5c4a3a] leading-relaxed">
            {aiResult?.summary || `올해 당신은 "${answers[3] || "어떤 사람"}"이었어요. ${answers[2] ? `머릿속에는 "${answers[2]}"라는 생각이 맴돌았고,` : ""} 그 모든 순간이 지금의 당신을 만들었어요.`}
          </p>
        </div>

        {/* 감정 분석 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            감정 돌아보기
          </h2>

          {answers[4] && (
            <div className="bg-[#6b8e6b]/20 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#6b8e6b] mb-1">가장 행복했던 순간</p>
              <p className="text-[#5c4a3a]">"{answers[4]}"</p>
            </div>
          )}

          {answers[5] && (
            <div className="bg-[#c45c4a]/10 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#c45c4a] mb-1">가장 힘들었던 순간</p>
              <p className="text-[#5c4a3a]">"{answers[5]}"</p>
            </div>
          )}

          {answers[6] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">올해 가장 많이 느낀 감정</p>
              <p className="text-[#5c4a3a]">{answers[6]}</p>
            </div>
          )}

          <p className="text-[#8b7355] text-sm mt-4 leading-relaxed">
            {aiResult?.emotion || "행복과 힘듦 사이, 당신은 꿋꿋이 버텼어요. 그 감정들을 온전히 느낀 것만으로도 충분히 잘한 거예요."}
          </p>
        </div>

        {/* 마무리 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <div className="text-center">
            {answers[13] && (
              <div className="mb-4">
                <p className="text-sm text-[#8b7355] mb-1">올해의 나에게</p>
                <p className="text-lg text-[#5c4a3a] italic">"{answers[13]}"</p>
              </div>
            )}

            {answers[11] && (
              <div className="mb-4 pt-4 border-t border-[#d4a574]/30">
                <p className="text-sm text-[#8b7355] mb-1">2026년에 되고 싶은 모습</p>
                <p className="text-lg font-bold text-[#5c4a3a]">"{answers[11]}"</p>
              </div>
            )}

            <div className="pt-4 border-t border-[#d4a574]/30">
              <p className="text-[#8b7355] leading-relaxed">
                2025년, 수고했어요.<br />
                2026년도 당신답게.
              </p>
            </div>
          </div>
        </div>

        {answers[15] && (
          <div className="felt-card stitch-border p-6 mb-6 bg-[#6b8e6b]/10">
            <p className="text-sm text-[#6b8e6b] mb-1 text-center">이 결과를 보는 당신에게</p>
            <p className="text-[#5c4a3a] text-center italic">"{answers[15]}"</p>
          </div>
        )}

        {/* 더 깊은 분석 CTA */}
        <div className="felt-card stitch-border p-6 mb-6 border-2 border-[#d4a574]">
          <div className="text-center">
            <p className="text-lg font-bold text-[#5c4a3a] mb-2">
              더 깊이 알고 싶다면?
            </p>
            <p className="text-sm text-[#8b7355] mb-4">
              스탠다드에서는 관계, 성장, 2026 응원까지!
            </p>
            <a
              href="/test/standard"
              className="felt-button inline-block"
            >
              스탠다드 테스트 - 2,900원
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleShare}
            className="felt-button w-full"
          >
            결과 공유하기
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full py-3 rounded-full border-2 border-[#8b7355] text-[#8b7355]
                       hover:bg-[#8b7355] hover:text-white transition-colors"
          >
            {copied ? "복사됨!" : "링크 복사"}
          </button>

          <a
            href="/"
            className="block text-center py-3 text-[#8b7355] hover:underline"
          >
            처음으로
          </a>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-[#a89a8a]">2025 연말결산 Light</p>
        </div>
      </div>
    </main>
  );
}

export default function LightResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#8b7355]">로딩중...</div>
      </div>
    }>
      <LightResultContent />
    </Suspense>
  );
}
