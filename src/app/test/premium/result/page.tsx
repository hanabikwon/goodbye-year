"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import { premiumQuestions } from "@/data/questions";

interface AIResult {
  title: string;
  summary: string;
  emotion: string;
  relationship: string;
  growth: string;
  advice: string;
  taste: string;
  keywords: string[];
}

function PremiumResultContent() {
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
      // 질문과 답변을 매핑해서 전송
      const questionsWithAnswers = premiumQuestions.map((q) => ({
        question: q.question,
        answer: answersData[q.id] || "",
        category: q.category,
      })).filter(qa => qa.answer); // 답변이 있는 것만

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: questionsWithAnswers, tier: "premium" }),
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
        title: "나의 2025 종합 연말결산",
        text: "AI가 종합 분석한 내 연말결산을 확인해보세요!",
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
      link.download = `2025-연말결산-프리미엄-${Date.now()}.png`;
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
          <div className="w-16 h-16 border-4 border-[#5c4a3a] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-bold text-[#5c4a3a] mb-2">
            AI가 분석 중이에요
          </h2>
          <p className="text-[#8b7355]">
            당신의 2025년을 완벽하게 정리하고 있어요...
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

  const keywords = aiResult?.keywords || ["성장", "변화", "도전", "사랑", "희망", "감사", "새로움", "용기", "배움", "여유"];

  // 새로운 30개 질문 ID 매핑
  // 1: 한 단어, 2: 잘 아는 사람, 3: 그 사람이 보는 나
  // 4: 행복한 순간, 5: 힘든 순간, 6: 감정
  // 7: 고마운 사람+이유, 8: 소중해진 사람, 9: 멀어진 사람
  // 10: 변화, 11: 1년 전 나에게, 12: 자주 미룬 것, 13: 포기한 것, 14: 완주한 것, 15: 고민 중
  // 16: 보다가 만 것, 17: 노래, 18: 책, 19: 장소, 20: 여행지, 21: 음식, 22: 잘한 소비, 23: 취미, 24: 향수, 25: 매력 없어진 것, 26: 길티 플레져, 27: 버릴 물건
  // 28: 되고 싶은 사람, 29: 1월 실행, 30: 1년 후 나

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
          <span className="text-xs text-white bg-[#5c4a3a] px-3 py-1 rounded-full">
            프리미엄
          </span>
          <h1 className="text-3xl font-bold text-[#5c4a3a] mt-4">
            {userName ? `${userName}님의 2025` : "나의 2025"}
          </h1>
          <p className="text-lg text-[#8b7355] mt-2">
            {aiResult?.title || "종합 분석"}
          </p>
        </div>

        {/* 나를 잘 아는 사람이 보는 나 - 상단 배치 */}
        {answers[2] && answers[3] && (
          <div className="felt-card stitch-border p-6 mb-6 bg-[#d4a574]/10">
            <p className="text-sm text-[#8b7355] text-center mb-2">
              {answers[2]}이(가) 보는 {userName || "나"}
            </p>
            <p className="text-[#5c4a3a] text-center text-lg italic">
              "{answers[3]}"
            </p>
          </div>
        )}

        {/* 나만의 키워드 */}
        <div className="felt-card stitch-border p-6 mb-6 bg-gradient-to-br from-[#f5e6d3] to-[#e8d4bc]">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4 text-center">
            {userName ? `${userName}님의 키워드` : "나만의 키워드"}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {keywords.map((keyword, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-white/60 rounded-full text-[#5c4a3a] font-medium"
              >
                #{keyword}
              </span>
            ))}
          </div>
        </div>

        {/* 2025년 총평 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            2025년 총평
          </h2>
          <p className="text-[#5c4a3a] leading-relaxed">
            {aiResult?.summary || "올해도 정말 수고했어요."}
          </p>
        </div>

        {/* 감정 분석 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            {userName ? `${userName}님의 감정` : "감정 돌아보기"}
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
              <p className="text-sm text-[#8b7355] mb-1">요즘 무서운 것</p>
              <p className="text-[#5c4a3a] font-medium">{answers[6]}</p>
            </div>
          )}

          <p className="text-[#8b7355] text-sm mt-4 leading-relaxed">
            {aiResult?.emotion || "행복과 힘듦 사이, 당신은 꿋꿋이 버텼어요."}
          </p>
        </div>

        {/* 관계 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            {userName ? `${userName}님의 관계` : "소중한 관계"}
          </h2>

          {answers[7] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">숨겨진 강점</p>
              <p className="text-[#5c4a3a] font-medium">{answers[7]}</p>
            </div>
          )}

          {answers[8] && (
            <div className="bg-[#6b8e6b]/20 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#6b8e6b] mb-1">새롭게 소중해진 사람</p>
              <p className="text-[#5c4a3a]">{answers[8]}</p>
            </div>
          )}

          {answers[9] && (
            <div className="bg-[#c45c4a]/10 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#c45c4a] mb-1">멀어진 사람</p>
              <p className="text-[#5c4a3a]">{answers[9]}</p>
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
            {userName ? `${userName}님의 성장` : "성장 포인트"}
          </h2>

          {answers[10] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">1년 전 나라면 안 했을 것</p>
              <p className="text-[#5c4a3a] font-medium">{answers[10]}</p>
            </div>
          )}

          {answers[12] && (
            <div className="bg-[#c45c4a]/10 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#c45c4a] mb-1">자주 미룬 것</p>
              <p className="text-[#5c4a3a]">{answers[12]}</p>
            </div>
          )}

          {answers[14] && (
            <div className="bg-[#6b8e6b]/20 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#6b8e6b] mb-1">완주한 것</p>
              <p className="text-[#5c4a3a]">{answers[14]}</p>
            </div>
          )}

          {answers[13] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">포기한 것 중 후회되는 것</p>
              <p className="text-[#5c4a3a]">{answers[13]}</p>
            </div>
          )}

          {answers[11] && (
            <div className="bg-[#d4a574]/20 rounded-xl p-4 border-2 border-dashed border-[#d4a574]">
              <p className="text-sm text-[#8b7355] mb-1">1년 전 나에게</p>
              <p className="text-[#5c4a3a] italic">"{answers[11]}"</p>
            </div>
          )}

          {aiResult?.growth && (
            <p className="text-[#8b7355] text-sm mt-4 leading-relaxed">
              {aiResult.growth}
            </p>
          )}
        </div>

        {/* 취향/나다움 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            {userName ? `${userName}님의 취향` : "취향과 나다움"}
          </h2>

          {answers[17] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">많이 들은 노래/아티스트</p>
              <p className="text-[#5c4a3a]">{answers[17]}</p>
            </div>
          )}

          {answers[16] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">보다가 만 영화/드라마</p>
              <p className="text-[#5c4a3a]">{answers[16]}</p>
            </div>
          )}

          {answers[18] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">기억에 남는 책</p>
              <p className="text-[#5c4a3a]">{answers[18]}</p>
            </div>
          )}

          {answers[19] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">좋았던 장소/공간</p>
              <p className="text-[#5c4a3a]">{answers[19]}</p>
            </div>
          )}

          {answers[20] && (
            <div className="bg-[#6b8e6b]/20 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#6b8e6b] mb-1">최고의 여행지</p>
              <p className="text-[#5c4a3a]">{answers[20]}</p>
            </div>
          )}

          {answers[21] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">가장 맛있게 먹은 것</p>
              <p className="text-[#5c4a3a]">{answers[21]}</p>
            </div>
          )}

          {answers[22] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">가장 잘한 소비</p>
              <p className="text-[#5c4a3a]">{answers[22]}</p>
            </div>
          )}

          {answers[23] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">새로운 취미/관심사</p>
              <p className="text-[#5c4a3a]">{answers[23]}</p>
            </div>
          )}

          {answers[24] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">자주 뿌린 향수</p>
              <p className="text-[#5c4a3a]">{answers[24]}</p>
            </div>
          )}

          {answers[25] && (
            <div className="bg-[#c45c4a]/10 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#c45c4a] mb-1">매력이 없어진 것</p>
              <p className="text-[#5c4a3a]">{answers[25]}</p>
            </div>
          )}

          {answers[26] && (
            <div className="bg-[#d4a574]/20 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">숨겨둔 비밀</p>
              <p className="text-[#5c4a3a] font-medium">{answers[26]}</p>
            </div>
          )}

          {answers[27] && (
            <div className="bg-white/50 rounded-xl p-4 mb-3">
              <p className="text-sm text-[#8b7355] mb-1">버려야 할 물건</p>
              <p className="text-[#5c4a3a]">{answers[27]}</p>
            </div>
          )}

          {aiResult?.taste && (
            <p className="text-[#8b7355] text-sm mt-4 leading-relaxed">
              {aiResult.taste}
            </p>
          )}
        </div>

        {/* 2026년 조언 */}
        <div className="felt-card stitch-border p-6 mb-6 bg-[#6b8e6b]/10">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            {userName ? `${userName}님을 위한 응원` : "2026년을 향한 응원"}
          </h2>

          {answers[28] && (
            <div className="text-center py-4 mb-4">
              <p className="text-sm text-[#8b7355] mb-1">되고 싶은 모습</p>
              <p className="text-xl font-bold text-[#5c4a3a]">"{answers[28]}"</p>
            </div>
          )}

          {answers[29] && (
            <div className="text-center py-2 mb-4 bg-white/50 rounded-xl">
              <p className="text-sm text-[#6b8e6b] mb-1">1월에 바로 실행할 것</p>
              <p className="text-[#5c4a3a] font-medium">{answers[29]}</p>
            </div>
          )}

          {answers[30] && (
            <div className="text-center py-2 mb-4">
              <p className="text-sm text-[#8b7355] mb-1">1년 후의 나</p>
              <p className="text-[#5c4a3a] italic">"{answers[30]}"</p>
            </div>
          )}

          <p className="text-[#5c4a3a] leading-relaxed">
            {aiResult?.advice || "2026년에는 더 많은 성장과 행복이 함께하길 바랍니다."}
          </p>
        </div>

        {/* 올해의 나 - 마무리 */}
        <div className="felt-card stitch-border p-6 mb-6">
          <div className="text-center">
            {answers[1] && (
              <div className="mb-4">
                <p className="text-sm text-[#8b7355] mb-1">2025년을 한 단어로</p>
                <p className="text-2xl font-bold text-[#5c4a3a]">{answers[1]}</p>
              </div>
            )}

            <div className="pt-4 border-t border-[#d4a574]/30">
              <p className="text-[#8b7355] leading-relaxed">
                2025년, 수고했어요.<br />
                2026년도 {userName ? `${userName}님` : "당신"}답게.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-4 pb-2">
          <p className="text-xs text-[#a89a8a]">2025 연말결산 Premium</p>
        </div>
        </div>{/* ref 끝 */}

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
            결과 공유하기
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

        {/* 디버그: 전체 답변 보기 */}
        <details className="mt-8">
          <summary className="text-xs text-[#a89a8a] cursor-pointer hover:underline">
            전체 답변 보기
          </summary>
          <div className="mt-4 p-4 bg-white/50 rounded-xl text-xs text-[#8b7355] space-y-3">
            {Object.entries(answers).map(([id, answer]) => {
              const question = premiumQuestions.find(q => q.id === Number(id));
              return (
                <div key={id} className="border-b border-[#d4a574]/20 pb-2">
                  <p className="font-bold text-[#5c4a3a]">Q{id}. {question?.question || "알 수 없음"}</p>
                  <p className="mt-1">{answer}</p>
                </div>
              );
            })}
          </div>
        </details>
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
