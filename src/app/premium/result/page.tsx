"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { premiumQuestions } from "@/data/questions";

function PremiumResultContent() {
  const searchParams = useSearchParams();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(data)));
        setAnswers(decoded);
        // AI 생성 시뮬레이션 (나중에 실제 API로 교체)
        setTimeout(() => setIsGenerating(false), 2000);
      } catch (e) {
        console.error("Failed to parse data");
      }
    }
  }, [searchParams]);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/view/premium?data=${searchParams.get("data")}`
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
        text: "내 심층 연말결산을 확인해보세요!",
        url: shareUrl,
      });
    } else {
      handleCopyLink();
    }
  };

  // AI 생성 중
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

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-md mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <p className="text-sm text-[#d4a574] font-medium mb-1">PREMIUM</p>
          <h1 className="text-3xl font-bold text-[#5c4a3a]">
            나의 2025 심층 분석
          </h1>
        </div>

        {/* 섹션 1: 올해 총평 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            2025년 총평
          </h2>
          <div className="text-center py-4 mb-4">
            <p className="text-2xl font-bold text-[#5c4a3a]">"{answers[1] || "성장"}"</p>
            <p className="text-sm text-[#8b7355] mt-1">당신이 정의한 2025년</p>
          </div>
          <p className="text-[#5c4a3a] leading-relaxed">
            올해 당신은 "{answers[5] || "어떤 사람"}"이었어요.
            {answers[2] && ` 머릿속에는 "${answers[2]}"라는 생각이 맴돌았고,`}
            {answers[9] && ` "${answers[9]}" 때문에 감정의 파도를 탔죠.`}
            그 모든 순간이 지금의 당신을 만들었어요.
          </p>
        </div>

        {/* 섹션 2: 감정 분석 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            감정 돌아보기
          </h2>

          {answers[6] && (
            <div className="bg-[#6b8e6b]/20 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#6b8e6b] mb-1">가장 행복했던 순간</p>
              <p className="text-[#5c4a3a]">"{answers[6]}"</p>
            </div>
          )}

          {answers[7] && (
            <div className="bg-[#c45c4a]/10 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#c45c4a] mb-1">가장 힘들었던 순간</p>
              <p className="text-[#5c4a3a]">"{answers[7]}"</p>
            </div>
          )}

          <p className="text-[#8b7355] text-sm mt-4 leading-relaxed">
            행복과 힘듦 사이, 당신은 꿋꿋이 버텼어요.
            그 감정들을 온전히 느낀 것만으로도 충분히 잘한 거예요.
          </p>
        </div>

        {/* 섹션 3: 관계 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            소중한 관계
          </h2>

          {answers[11] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">올해 가장 고마운 사람</p>
              <p className="text-[#5c4a3a] font-medium">{answers[11]}</p>
            </div>
          )}

          {answers[12] && (
            <div className="bg-[#d4a574]/20 rounded-xl p-4 border-2 border-dashed border-[#d4a574]">
              <p className="text-sm text-[#8b7355] mb-1">전하지 못한 말</p>
              <p className="text-[#5c4a3a] italic">"{answers[12]}"</p>
            </div>
          )}

          {answers[13] && (
            <p className="text-[#8b7355] text-sm mt-4 leading-relaxed">
              올해 관계에서 배운 것: "{answers[13]}"
            </p>
          )}
        </div>

        {/* 섹션 4: 성장 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            성장 포인트
          </h2>

          {answers[15] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">가장 큰 변화</p>
              <p className="text-[#5c4a3a]">{answers[15]}</p>
            </div>
          )}

          {answers[18] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">나를 성장시킨 경험</p>
              <p className="text-[#5c4a3a]">{answers[18]}</p>
            </div>
          )}

          {answers[16] && (
            <div className="bg-[#d4a574]/20 rounded-xl p-4 border-2 border-dashed border-[#d4a574]">
              <p className="text-sm text-[#8b7355] mb-1">1년 전 나에게</p>
              <p className="text-[#5c4a3a] italic">"{answers[16]}"</p>
            </div>
          )}
        </div>

        {/* 섹션 5: 2026년 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            2026년을 향해
          </h2>

          {answers[20] && (
            <div className="text-center py-4 mb-4">
              <p className="text-sm text-[#8b7355] mb-1">되고 싶은 모습</p>
              <p className="text-xl font-bold text-[#5c4a3a]">"{answers[20]}"</p>
            </div>
          )}

          {answers[21] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">꼭 하고 싶은 것</p>
              <p className="text-[#5c4a3a]">{answers[21]}</p>
            </div>
          )}

          {answers[22] && (
            <div className="bg-[#6b8e6b]/20 rounded-xl p-4">
              <p className="text-sm text-[#6b8e6b] mb-1">내년의 나에게</p>
              <p className="text-[#5c4a3a]">"{answers[22]}"</p>
            </div>
          )}
        </div>

        {/* 마무리 메시지 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <div className="text-center">
            {answers[23] && (
              <div className="mb-4">
                <p className="text-sm text-[#8b7355] mb-1">올해의 나에게</p>
                <p className="text-lg text-[#5c4a3a] italic">"{answers[23]}"</p>
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

        {/* 친구에게 */}
        {answers[25] && (
          <div className="felt-card stitch-border p-6 mb-6 bg-[#6b8e6b]/10">
            <p className="text-sm text-[#6b8e6b] mb-1 text-center">이 결과를 보는 당신에게</p>
            <p className="text-[#5c4a3a] text-center italic">"{answers[25]}"</p>
          </div>
        )}

        {/* 공유 버튼 */}
        <div className="space-y-3">
          <button
            onClick={handleShare}
            className="felt-button w-full"
          >
            심층 결과 공유하기
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

        {/* 푸터 */}
        <div className="text-center mt-8">
          <p className="text-xs text-[#a89a8a]">2025 연말결산 Premium</p>
        </div>
      </div>
    </main>
  );
}

export default function PremiumResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#8b7355]">로딩중...</div>
      </div>
    }>
      <PremiumResultContent />
    </Suspense>
  );
}
