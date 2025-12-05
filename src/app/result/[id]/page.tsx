"use client";

import { useEffect, useState, useRef, use } from "react";
import html2canvas from "html2canvas";

interface AIResult {
  title: string;
  summary: string;
  insight?: string;
  emotion?: string;
  relationship?: string;
  growth?: string;
  taste?: string;
  advice: string;
  keywords: string[];
}

interface ResultData {
  id: string;
  tier: "free" | "premium";
  user_name: string | null;
  answers: Record<number, string>;
  ai_result: AIResult | null;
  view_count: number;
}

export default function SharedResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [data, setData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/results/${id}`);
        if (!response.ok) {
          throw new Error("결과를 찾을 수 없습니다");
        }
        const result = await response.json();
        setData(result);

        // 조회수 증가 (localStorage로 중복 방지)
        const viewedKey = `viewed_${id}`;
        if (!localStorage.getItem(viewedKey)) {
          await fetch(`/api/results/${id}`, { method: "POST" });
          localStorage.setItem(viewedKey, "true");
        }
      } catch (e) {
        setError("결과를 불러올 수 없습니다");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: data?.ai_result?.title || "2025 연말결산",
        text: `${data?.ai_result?.title || "2025년 연말결산"} - AI가 분석한 한 해!`,
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
      const currentScroll = window.scrollY;
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: "#F5F1EC",
        scale: 2,
        useCORS: true,
      });

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

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4a574] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-[#8b7355]">결과를 불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <p className="text-[#c45c4a] mb-4">{error || "결과를 찾을 수 없습니다"}</p>
          <a href="/" className="felt-button">
            나도 해보기
          </a>
        </div>
      </main>
    );
  }

  const { tier, user_name, ai_result } = data;
  const userName = user_name || "";

  // 무료 티어 결과
  if (tier === "free") {
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
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <div className="flex justify-center gap-2 mb-4">
                <span
                  className="text-xs text-[#ffffff] bg-[#6b8e6b] px-3 rounded-full flex items-center justify-center"
                  style={{ height: "28px", lineHeight: "28px" }}
                >
                  무료
                </span>
                <span
                  className="text-xs text-[#ffffff] bg-[#d4a574] px-3 rounded-full flex items-center justify-center"
                  style={{ height: "28px", lineHeight: "28px" }}
                >
                  AI 분석
                </span>
              </div>
              <h1 className="text-3xl font-bold text-[#5c4a3a]">
                {userName ? `${userName}님의 2025` : "나의 2025"}
              </h1>
              <p className="text-lg text-[#8b7355] mt-2">{ai_result?.title || ""}</p>
            </div>

            {/* 2025년 총평 */}
            <div className="felt-card stitch-border p-5 mb-4">
              <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
                {userName ? `${userName}님의 2025년` : "2025년 총평"}
              </h2>
              <p className="text-[#5c4a3a] leading-relaxed">
                {ai_result?.summary || "올해도 수고했어요."}
              </p>
            </div>

            {/* 설문으로 본 나 */}
            {ai_result?.insight && (
              <div className="felt-card stitch-border p-5 mb-4 bg-[rgba(212,165,116,0.1)]">
                <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
                  {userName ? `설문으로 본 ${userName}님은` : "설문으로 본 당신은"}
                </h2>
                <p className="text-[#5c4a3a] leading-relaxed">{ai_result.insight}</p>
              </div>
            )}

            {/* 나의 키워드 */}
            {ai_result?.keywords && ai_result.keywords.length > 0 && (
              <div className="felt-card stitch-border p-5 mb-4">
                <h2 className="text-lg font-bold text-[#5c4a3a] mb-4 text-center">
                  {userName ? `${userName}님의 2025 키워드` : "나의 2025 키워드"}
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-3 py-4">
                  {ai_result.keywords.map((keyword, index) => {
                    const sizes = ["text-xl", "text-2xl", "text-lg", "text-xl", "text-lg"];
                    const colors = [
                      "text-[#d4a574]",
                      "text-[#5c4a3a]",
                      "text-[#6b8e6b]",
                      "text-[#8b7355]",
                      "text-[#c4956a]",
                    ];
                    return (
                      <span
                        key={index}
                        className={`font-bold ${sizes[index % 5]} ${colors[index % 5]}`}
                        style={{ lineHeight: "1.2" }}
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
                "{ai_result?.advice || "2026년도 당신답게!"}"
              </p>
            </div>

            <div className="text-center pt-4 pb-2">
              <p className="text-xs text-[#a89a8a]">2025 연말결산</p>
            </div>
          </div>

          {/* 나도 해보기 CTA */}
          <div className="felt-card stitch-border p-5 mb-4 bg-gradient-to-br from-[#f5e6d3] to-[#e8d4bc] border-2 border-[#d4a574]">
            <div className="text-center">
              <p className="text-lg font-bold text-[#5c4a3a] mb-2">
                나도 연말결산 해보기
              </p>
              <p className="text-sm text-[#8b7355] mb-4">
                AI가 분석하는 나의 2025년!
              </p>
              <a href="/" className="felt-button inline-block">
                테스트 시작하기
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
              공유하기
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

  // 프리미엄 티어 결과
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
                style={{ width: "100px", height: "100px" }}
              />
            </div>
            <div className="flex justify-center gap-2 mb-4">
              <span
                className="text-xs text-[#ffffff] bg-[#d4a574] px-3 rounded-full flex items-center justify-center"
                style={{ height: "28px", lineHeight: "28px" }}
              >
                프리미엄
              </span>
              <span
                className="text-xs text-[#ffffff] bg-[#6b8e6b] px-3 rounded-full flex items-center justify-center"
                style={{ height: "28px", lineHeight: "28px" }}
              >
                AI 심층분석
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#5c4a3a]">
              {userName ? `${userName}님의 2025` : "나의 2025"}
            </h1>
            <p className="text-lg text-[#8b7355] mt-2">{ai_result?.title || ""}</p>
          </div>

          {/* 2025년 총평 */}
          <div className="felt-card stitch-border p-5 mb-4">
            <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">2025년 총평</h2>
            <p className="text-[#5c4a3a] leading-relaxed">
              {ai_result?.summary || "올해도 수고했어요."}
            </p>
          </div>

          {/* 감정 분석 */}
          {ai_result?.emotion && (
            <div className="felt-card stitch-border p-5 mb-4 bg-[rgba(107,142,107,0.1)]">
              <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">감정 돌아보기</h2>
              <p className="text-[#5c4a3a] leading-relaxed">{ai_result.emotion}</p>
            </div>
          )}

          {/* 관계 */}
          {ai_result?.relationship && (
            <div className="felt-card stitch-border p-5 mb-4">
              <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">소중한 관계</h2>
              <p className="text-[#5c4a3a] leading-relaxed">{ai_result.relationship}</p>
            </div>
          )}

          {/* 성장 */}
          {ai_result?.growth && (
            <div className="felt-card stitch-border p-5 mb-4 bg-[rgba(212,165,116,0.1)]">
              <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">성장 포인트</h2>
              <p className="text-[#5c4a3a] leading-relaxed">{ai_result.growth}</p>
            </div>
          )}

          {/* 취향/나다움 */}
          {ai_result?.taste && (
            <div className="felt-card stitch-border p-5 mb-4">
              <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">나다움</h2>
              <p className="text-[#5c4a3a] leading-relaxed">{ai_result.taste}</p>
            </div>
          )}

          {/* 나의 키워드 */}
          {ai_result?.keywords && ai_result.keywords.length > 0 && (
            <div className="felt-card stitch-border p-5 mb-4">
              <h2 className="text-lg font-bold text-[#5c4a3a] mb-4 text-center">
                {userName ? `${userName}님의 2025 키워드` : "나의 2025 키워드"}
              </h2>
              <div className="flex flex-wrap justify-center items-center gap-3 py-4">
                {ai_result.keywords.map((keyword, index) => {
                  const sizes = ["text-xl", "text-2xl", "text-lg", "text-xl", "text-lg"];
                  const colors = [
                    "text-[#d4a574]",
                    "text-[#5c4a3a]",
                    "text-[#6b8e6b]",
                    "text-[#8b7355]",
                    "text-[#c4956a]",
                  ];
                  return (
                    <span
                      key={index}
                      className={`font-bold ${sizes[index % 5]} ${colors[index % 5]}`}
                      style={{ lineHeight: "1.2" }}
                    >
                      #{keyword}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* 조언 */}
          <div className="felt-card stitch-border p-5 mb-4 bg-[rgba(107,142,107,0.1)]">
            <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">2026년을 위한 조언</h2>
            <p className="text-[#5c4a3a] leading-relaxed">
              {ai_result?.advice || "2026년도 당신답게!"}
            </p>
          </div>

          <div className="text-center pt-4 pb-2">
            <p className="text-xs text-[#a89a8a]">2025 연말결산 Premium</p>
          </div>
        </div>

        {/* 나도 해보기 CTA */}
        <div className="felt-card stitch-border p-5 mb-4 bg-gradient-to-br from-[#f5e6d3] to-[#e8d4bc] border-2 border-[#d4a574]">
          <div className="text-center">
            <p className="text-lg font-bold text-[#5c4a3a] mb-2">
              나도 연말결산 해보기
            </p>
            <p className="text-sm text-[#8b7355] mb-4">
              AI가 심층 분석하는 나의 2025년!
            </p>
            <a href="/" className="felt-button inline-block">
              테스트 시작하기
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
            공유하기
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
