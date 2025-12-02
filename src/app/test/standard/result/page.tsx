"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";

interface AIResult {
  title: string;
  summary: string;
  emotion: string;
  relationship: string;
  growth: string;
  advice: string;
}

function StandardResultContent() {
  const searchParams = useSearchParams();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // localStorage에서 사용자 이름 가져오기
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }

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
        body: JSON.stringify({ answers: answersData, tier: "standard" }),
      });

      if (!response.ok) {
        throw new Error("AI 생성 실패");
      }

      const data = await response.json();
      setAiResult(data.result);
    } catch (e) {
      console.error("AI generation failed:", e);
      setAiResult(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/view/standard?data=${searchParams.get("data")}`
    : "";

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "나의 2025 심층 연말결산",
        text: "AI가 심층 분석한 내 연말결산을 확인해보세요!",
        url: shareUrl,
      });
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadImage = async () => {
    if (!resultRef.current) return;

    setIsSaving(true);
    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: "#faf6f0",
        scale: 2,
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = `2025-연말결산-스탠다드-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error("이미지 저장 실패:", e);
    } finally {
      setIsSaving(false);
    }
  };

  if (isGenerating) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4a574] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-bold text-[#5c4a3a] mb-2">
            AI가 심층 분석 중이에요
          </h2>
          <p className="text-[#8b7355]">
            당신의 2025년을 꼼꼼히 정리하고 있어요...
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
        <div ref={resultRef} className="bg-[#faf6f0] pb-6">
        <div className="text-center mb-8 pt-4">
          <div className="flex justify-center mb-4">
            <Image
              src="/house.png"
              alt="집 아이콘"
              width={100}
              height={100}
            />
          </div>
          <div className="flex justify-center gap-2 mb-4">
            <span className="text-xs text-white bg-[#c45c4a] px-3 py-1 rounded-full">
              인기
            </span>
            <span className="text-xs text-white bg-[#8b7355] px-3 py-1 rounded-full">
              스탠다드
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#5c4a3a]">
            {userName ? `${userName}님의 2025` : "나의 2025"}
          </h1>
          <p className="text-lg text-[#8b7355] mt-2">
            {aiResult?.title || "심층 분석"}
          </p>
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
            {aiResult?.summary || `올해 당신은 "${answers[3] || "어떤 사람"}"이었어요. 그 모든 순간이 지금의 당신을 만들었어요.`}
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

          <p className="text-[#8b7355] text-sm mt-4 leading-relaxed">
            {aiResult?.emotion || "행복과 힘듦 사이, 당신은 꿋꿋이 버텼어요."}
          </p>
        </div>

        {/* 관계 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            소중한 관계
          </h2>

          {answers[8] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">올해 가장 고마운 사람</p>
              <p className="text-[#5c4a3a] font-medium">{answers[8]}</p>
            </div>
          )}

          {answers[9] && (
            <div className="bg-[#d4a574]/20 rounded-xl p-4 border-2 border-dashed border-[#d4a574]">
              <p className="text-sm text-[#8b7355] mb-1">전하지 못한 말</p>
              <p className="text-[#5c4a3a] italic">"{answers[9]}"</p>
            </div>
          )}

          {aiResult?.relationship && (
            <p className="text-[#8b7355] text-sm mt-4 leading-relaxed">
              {aiResult.relationship}
            </p>
          )}
        </div>

        {/* 성장 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            성장 포인트
          </h2>

          {answers[12] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">가장 큰 변화</p>
              <p className="text-[#5c4a3a]">{answers[12]}</p>
            </div>
          )}

          {answers[14] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">나를 성장시킨 경험</p>
              <p className="text-[#5c4a3a]">{answers[14]}</p>
            </div>
          )}

          {answers[13] && (
            <div className="bg-[#d4a574]/20 rounded-xl p-4 border-2 border-dashed border-[#d4a574]">
              <p className="text-sm text-[#8b7355] mb-1">1년 전 나에게</p>
              <p className="text-[#5c4a3a] italic">"{answers[13]}"</p>
            </div>
          )}

          {aiResult?.growth && (
            <p className="text-[#8b7355] text-sm mt-4 leading-relaxed">
              {aiResult.growth}
            </p>
          )}
        </div>

        {/* 2026년 조언 */}
        <div className="felt-card stitch-border p-6 mb-6 bg-[#6b8e6b]/10">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            2026년을 향한 응원
          </h2>

          {answers[16] && (
            <div className="text-center py-4 mb-4">
              <p className="text-sm text-[#8b7355] mb-1">되고 싶은 모습</p>
              <p className="text-xl font-bold text-[#5c4a3a]">"{answers[16]}"</p>
            </div>
          )}

          <p className="text-[#5c4a3a] leading-relaxed">
            {aiResult?.advice || "2026년에는 더 많은 성장과 행복이 함께하길 바랍니다."}
          </p>
        </div>

        {/* 마무리 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <div className="text-center">
            {answers[18] && (
              <div className="mb-4">
                <p className="text-sm text-[#8b7355] mb-1">올해의 나에게</p>
                <p className="text-lg text-[#5c4a3a] italic">"{answers[18]}"</p>
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

        {answers[20] && (
          <div className="felt-card stitch-border p-6 mb-6 bg-[#6b8e6b]/10">
            <p className="text-sm text-[#6b8e6b] mb-1 text-center">이 결과를 보는 당신에게</p>
            <p className="text-[#5c4a3a] text-center italic">"{answers[20]}"</p>
          </div>
        )}

        <div className="text-center pt-4 pb-2">
          <p className="text-xs text-[#a89a8a]">2025 연말결산 Standard</p>
        </div>
        </div>{/* ref 끝 */}

        {/* 프리미엄 CTA */}
        <div className="felt-card stitch-border p-6 mb-6 bg-gradient-to-br from-[#f5e6d3] to-[#e8d4bc]">
          <div className="text-center">
            <p className="text-lg font-bold text-[#5c4a3a] mb-2">
              심층 분석이 궁금하다면?
            </p>
            <p className="text-sm text-[#8b7355] mb-4">
              프리미엄에서는 취향 분석, 나만의 키워드까지!
            </p>
            <a
              href="/test/premium"
              className="felt-button inline-block"
            >
              프리미엄 테스트 - 2,900원
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleDownloadImage}
            disabled={isSaving}
            className="felt-button w-full"
          >
            {isSaving ? "저장 중..." : "이미지로 저장하기"}
          </button>

          <button
            onClick={handleShare}
            className="w-full py-3 rounded-full border-2 border-[#8b7355] text-[#8b7355]
                       hover:bg-[#8b7355] hover:text-white transition-colors"
          >
            심층 결과 공유하기
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full py-3 rounded-full border-2 border-[#8b7355]/50 text-[#8b7355]/70
                       hover:bg-[#8b7355]/10 transition-colors text-sm"
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
      </div>
    </main>
  );
}

export default function StandardResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#8b7355]">로딩중...</div>
      </div>
    }>
      <StandardResultContent />
    </Suspense>
  );
}
