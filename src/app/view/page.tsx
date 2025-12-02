"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { questions } from "@/data/questions";

function ViewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const data = searchParams.get("data");

  useEffect(() => {
    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(data)));
        setAnswers(decoded);
      } catch (e) {
        console.error("Failed to parse data");
      }
    }
  }, [data]);

  useEffect(() => {
    if (!unlocked && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, unlocked]);

  const handleUnlock = () => {
    setUnlocked(true);
  };

  // 광고 게이트 화면
  if (!unlocked) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="text-5xl mb-4">🎁</div>
          <h1 className="text-2xl font-bold text-[#5c4a3a] mb-2">
            친구의 2025 연말결산
          </h1>
          <p className="text-[#8b7355] mb-8">
            결과를 확인하려면 잠시만 기다려주세요
          </p>

          {/* 광고 영역 (플레이스홀더) */}
          <div className="felt-card stitch-border p-6 mb-6">
            <div className="bg-white/50 rounded-xl p-8 mb-4">
              {/* 여기에 실제 광고 코드 삽입 */}
              <div className="text-center">
                <p className="text-sm text-[#a89a8a] mb-2">광고</p>
                <div className="w-full h-40 bg-[#e8d5b7] rounded-lg flex items-center justify-center">
                  {/* 카카오 애드핏 또는 다른 광고 코드 */}
                  <span className="text-[#8b7355]">
                    📢 광고 영역
                  </span>
                </div>
                <p className="text-xs text-[#a89a8a] mt-2">
                  광고가 서비스 운영에 도움이 됩니다
                </p>
              </div>
            </div>

            {/* 카운트다운 / 언락 버튼 */}
            {countdown > 0 ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#d4a574] text-white text-2xl font-bold mb-2">
                  {countdown}
                </div>
                <p className="text-sm text-[#8b7355]">잠시만 기다려주세요...</p>
              </div>
            ) : (
              <button
                onClick={handleUnlock}
                className="felt-button w-full"
              >
                🎄 결과 보기
              </button>
            )}
          </div>

          {/* 나도 해보기 */}
          <a
            href="/"
            className="text-[#8b7355] hover:underline text-sm"
          >
            ✨ 나도 연말결산 해보기
          </a>
        </div>
      </main>
    );
  }

  // 결과 화면 (언락 후)
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-md mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎊</div>
          <h1 className="text-3xl font-bold text-[#5c4a3a]">
            친구의 2025 연말결산
          </h1>
        </div>

        {/* 결과 카드 */}
        <div className="felt-card stitch-border p-6 space-y-6">
          {/* 대표 이모지 */}
          <div className="text-center">
            <div className="text-7xl mb-2">{answers[3] || "✨"}</div>
            <p className="text-[#8b7355]">친구의 2025년</p>
          </div>

          {/* 한 단어 */}
          {answers[1] && (
            <div className="text-center py-4 border-t-2 border-dashed border-[#d4a574]">
              <p className="text-sm text-[#8b7355] mb-1">2025년을 한 단어로</p>
              <p className="text-2xl font-bold text-[#5c4a3a]">"{answers[1]}"</p>
            </div>
          )}

          {/* 기억에 남는 순간 */}
          {answers[2] && (
            <div className="bg-white/50 rounded-xl p-4">
              <p className="text-sm text-[#8b7355] mb-1">가장 기억에 남는 순간</p>
              <p className="text-[#5c4a3a] font-medium">{answers[2]}</p>
            </div>
          )}

          {/* 변화 */}
          {answers[4] && (
            <div className="bg-white/50 rounded-xl p-4">
              <p className="text-sm text-[#8b7355] mb-1">올해의 변화</p>
              <p className="text-[#5c4a3a] font-medium">{answers[4]}</p>
            </div>
          )}

          {/* 나에게 한마디 */}
          {answers[5] && (
            <div className="bg-[#d4a574]/20 rounded-xl p-4 border-2 border-dashed border-[#d4a574]">
              <p className="text-sm text-[#8b7355] mb-1">스스로에게 하는 말</p>
              <p className="text-[#5c4a3a] italic">"{answers[5]}"</p>
            </div>
          )}

          {/* 내년 목표 */}
          {answers[6] && (
            <div className="text-center py-4 border-t-2 border-dashed border-[#d4a574]">
              <p className="text-sm text-[#8b7355] mb-1">2026년엔</p>
              <p className="text-lg font-bold text-[#5c4a3a]">{answers[6]}</p>
            </div>
          )}

          {/* 친구에게 */}
          {answers[7] && (
            <div className="bg-[#6b8e6b]/20 rounded-xl p-4">
              <p className="text-sm text-[#6b8e6b] mb-1">너에게 하고 싶은 말</p>
              <p className="text-[#5c4a3a]">"{answers[7]}"</p>
            </div>
          )}

          {/* 푸터 */}
          <div className="text-center pt-4 border-t border-[#d4a574]/30">
            <p className="text-xs text-[#a89a8a]">2025 연말결산 🎄</p>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="mt-8 space-y-3">
          <a
            href="/"
            className="felt-button w-full block text-center"
          >
            ✨ 나도 연말결산 해보기
          </a>
        </div>
      </div>
    </main>
  );
}

export default function ViewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#8b7355]">로딩중...</div>
      </div>
    }>
      <ViewContent />
    </Suspense>
  );
}
