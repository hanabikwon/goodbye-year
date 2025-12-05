"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import { standardQuestions } from "@/data/questions";

interface AIResult {
  title: string;
  summary: string;
  insight: string;
  advice: string;
  keywords: string[];
}

function FreeResultContent() {
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
      const questionsWithAnswers = standardQuestions.map((q) => ({
        question: q.question,
        answer: answersData[q.id] || "",
        category: q.category,
      })).filter(qa => qa.answer); // 답변이 있는 것만

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: questionsWithAnswers, tier: "free" }),
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
    ? `${window.location.origin}/view/free?data=${searchParams.get("data")}`
    : "";

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: aiResult?.title || "나의 2025 연말결산",
        text: `${aiResult?.title || "2025년 연말결산"} - AI가 분석한 내 한 해!`,
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
      // 캡처 전 상단으로 스크롤
      const currentScroll = window.scrollY;
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: "#F5F1EC",
        scale: 2,
        useCORS: true,
      });

      // 스크롤 위치 복원
      window.scrollTo(0, currentScroll);

      const link = document.createElement("a");
      link.download = `2025-연말결산-${Date.now()}.png`;
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
        <div ref={resultRef} className="bg-[#F5F1EC] pb-4 pt-16">
        {/* 헤더 */}
        <div className="text-center mb-4">
          <div className="flex justify-center mb-4">
            <img
              src="/house.png"
              alt="집 아이콘"
              width={100}
              height={100}
              style={{ width: '100px', height: '100px' }}
            />
          </div>
          <div className="flex justify-center gap-2 mb-4">
            <span
              className="text-xs text-[#ffffff] bg-[#6b8e6b] px-3 rounded-full flex items-center justify-center"
              style={{ height: '28px', lineHeight: '28px' }}
            >
              무료
            </span>
            <span
              className="text-xs text-[#ffffff] bg-[#d4a574] px-3 rounded-full flex items-center justify-center"
              style={{ height: '28px', lineHeight: '28px' }}
            >
              AI 분석
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#5c4a3a]">
            {userName ? `${userName}님의 2025` : "나의 2025"}
          </h1>
          <p className="text-lg text-[#8b7355] mt-2">
            {aiResult?.title || ""}
          </p>
        </div>

        {/* 2025년 총평 */}
        <div className="felt-card stitch-border p-5 mb-4">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            {userName ? `${userName}님의 2025년` : "2025년 총평"}
          </h2>
          <p className="text-[#5c4a3a] leading-relaxed">
            {aiResult?.summary || "올해도 수고했어요."}
          </p>
        </div>

        {/* 설문으로 본 나 */}
        {aiResult?.insight && (
          <div className="felt-card stitch-border p-5 mb-4 bg-[rgba(212,165,116,0.1)]">
            <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
              {userName ? `설문으로 본 ${userName}님은` : "설문으로 본 당신은"}
            </h2>
            <p className="text-[#5c4a3a] leading-relaxed">
              {aiResult.insight}
            </p>
          </div>
        )}

        {/* 나의 키워드 - 워드클라우드 스타일 */}
        {aiResult?.keywords && aiResult.keywords.length > 0 && (
          <div className="felt-card stitch-border p-5 mb-4">
            <h2 className="text-lg font-bold text-[#5c4a3a] mb-4 text-center">
              {userName ? `${userName}님의 2025 키워드` : "나의 2025 키워드"}
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-3 py-4">
              {aiResult.keywords.map((keyword, index) => {
                // 워드클라우드 스타일: 다양한 크기와 색상
                const sizes = ["text-xl", "text-2xl", "text-lg", "text-xl", "text-lg"];
                const colors = [
                  "text-[#d4a574]",
                  "text-[#5c4a3a]",
                  "text-[#6b8e6b]",
                  "text-[#8b7355]",
                  "text-[#c4956a]"
                ];
                return (
                  <span
                    key={index}
                    className={`font-bold ${sizes[index % 5]} ${colors[index % 5]} flex items-center justify-center`}
                    style={{lineHeight: '1.2'}}
                  >
                    #{keyword}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* 한줄 조언 */}
        <div className="felt-card stitch-border p-5 mb-4 bg-[rgba(107,142,107,0.1)]">
          <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
            {userName ? `${userName}님을 위한 한마디` : "2026년을 위한 한마디"}
          </h2>
          <p className="text-[#5c4a3a] leading-relaxed text-center text-lg">
            "{aiResult?.advice || "2026년도 당신답게!"}"
          </p>
        </div>

        <div className="text-center pt-4 pb-2">
          <p className="text-xs text-[#a89a8a]">2025 연말결산 Free</p>
        </div>
        </div>{/* ref 끝 */}

        {/* 프리미엄 CTA - 강조 */}
        <div className="felt-card stitch-border p-5 mb-4 bg-gradient-to-br from-[#f5e6d3] to-[#e8d4bc] border-2 border-[#d4a574]">
          <div className="text-center">
            <p className="text-lg font-bold text-[#5c4a3a] mb-2">
              더 깊이 알고 싶다면?
            </p>
            <p className="text-sm text-[#8b7355] mb-4">
              프리미엄에서는 감정 분석, 관계, 성장,<br />
              취향/나다움 분석까지!
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-[#8b7355] mb-4">
              <span className="bg-white/50 px-2 rounded-full flex items-center justify-center" style={{height: '24px'}}>감정 분석</span>
              <span className="bg-white/50 px-2 rounded-full flex items-center justify-center" style={{height: '24px'}}>관계 돌아보기</span>
              <span className="bg-white/50 px-2 rounded-full flex items-center justify-center" style={{height: '24px'}}>성장 포인트</span>
              <span className="bg-[#6b8e6b]/20 px-2 rounded-full flex items-center justify-center" style={{height: '24px'}}>취향</span>
              <span className="bg-[#6b8e6b]/20 px-2 rounded-full flex items-center justify-center" style={{height: '24px'}}>나다움</span>
            </div>
            <p className="text-xs text-[#6b8e6b] mb-4">
              + 질문과 답변 전체 확인 및 저장 가능!
            </p>
            <a
              href="/test/premium"
              className="felt-button inline-block"
            >
              프리미엄 분석 받기 - 1,900원
            </a>
          </div>
        </div>

        {/* 버튼 영역 */}
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
                       hover:bg-[#8b7355] hover:text-white transition-colors font-medium"
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
      </div>
    </main>
  );
}

export default function FreeResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#8b7355]">로딩중...</div>
      </div>
    }>
      <FreeResultContent />
    </Suspense>
  );
}
