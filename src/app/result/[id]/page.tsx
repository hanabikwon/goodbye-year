"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import { premiumQuestions } from "@/data/questions";

interface Result {
  id: string;
  tier: "free" | "premium";
  user_name: string | null;
  answers: Record<number, string>;
  ai_result: {
    title: string;
    summary: string;
    emotion?: string;
    relationship?: string;
    growth?: string;
    taste?: string;
    insight?: string;
    advice: string;
    keywords: string[];
  } | null;
  created_at: string;
  view_count: number;
}

export default function SharedResultPage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<Result | null>(null);
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

    if (id) {
      fetchResult();
    }
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
        title: "나의 2025 연말결산",
        text: "AI가 분석한 내 연말결산을 확인해보세요!",
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
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-[#8b7355]">결과를 불러오는 중...</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <p className="text-[#c45c4a] mb-4">{error || "결과를 찾을 수 없습니다"}</p>
        <a href="/" className="felt-button">
          테스트 하러 가기
        </a>
      </main>
    );
  }

  const { tier, user_name, ai_result, answers } = data;
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
              <p className="text-xs text-[#a89a8a]">2025 연말결산 Free</p>
            </div>
          </div>

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

          {/* 버튼들 */}
          <div className="space-y-3">
            <button
              onClick={handleDownloadImage}
              disabled={isSaving}
              className="w-full py-3 rounded-full border-2 border-[#8b7355] text-[#8b7355] hover:bg-[#8b7355] hover:text-white transition-colors font-medium"
            >
              {isSaving ? "저장 중..." : "이미지로 저장하기"}
            </button>
            <button
              onClick={handleShare}
              className="w-full py-3 rounded-full border-2 border-[#8b7355] text-[#8b7355] hover:bg-[#8b7355] hover:text-white transition-colors font-medium"
            >
              결과 공유하기
            </button>
            <button
              onClick={handleCopyLink}
              className="w-full py-3 rounded-full border-2 border-[#8b7355] text-[#8b7355] hover:bg-[#8b7355] hover:text-white transition-colors font-medium"
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

  // 프리미엄 티어 결과 (원래 프리미엄 결과 페이지와 동일)
  const keywords = ai_result?.keywords || ["성장", "변화", "도전", "사랑", "희망"];

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-md mx-auto">
        <div ref={resultRef} className="bg-[#F5F1EC] pb-4 pt-16">
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
                className="text-xs text-[#ffffff] bg-[#5c4a3a] px-3 rounded-full flex items-center justify-center"
                style={{ height: "28px", lineHeight: "28px" }}
              >
                프리미엄
              </span>
              <span
                className="text-xs text-[#ffffff] bg-[#d4a574] px-3 rounded-full flex items-center justify-center"
                style={{ height: "28px", lineHeight: "28px" }}
              >
                AI 분석
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#5c4a3a] mt-4">
              {userName ? `${userName}님의 2025` : "나의 2025"}
            </h1>
            <p className="text-lg text-[#8b7355] mt-2">
              {ai_result?.title || "종합 분석"}
            </p>
          </div>

          {/* 나를 잘 아는 사람이 보는 나 - 상단 배치 */}
          {answers[2] && answers[3] && (
            <div className="felt-card stitch-border p-5 mb-4 bg-[rgba(212,165,116,0.1)]">
              <p className="text-sm text-[#8b7355] text-center mb-2">
                {answers[2]}이(가) 보는 {userName || "나"}
              </p>
              <p className="text-[#5c4a3a] text-center text-lg italic">
                "{answers[3]}"
              </p>
            </div>
          )}

          {/* 나만의 키워드 */}
          <div className="felt-card stitch-border p-5 mb-4 bg-gradient-to-br from-[#f5e6d3] to-[#e8d4bc]">
            <h2 className="text-lg font-bold text-[#5c4a3a] mb-4 text-center">
              {userName ? `${userName}님의 키워드` : "나만의 키워드"}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {keywords.map((keyword, i) => (
                <span
                  key={i}
                  className="px-4 bg-[rgba(255,255,255,0.6)] rounded-full text-[#5c4a3a] font-medium flex items-center justify-center"
                  style={{ height: "32px" }}
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </div>

          {/* 2025년 총평 */}
          <div className="felt-card stitch-border p-5 mb-4">
            <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">2025년 총평</h2>
            <p className="text-[#5c4a3a] leading-relaxed">
              {ai_result?.summary || "올해도 정말 수고했어요."}
            </p>
          </div>

          {/* 감정 분석 */}
          <div className="felt-card stitch-border p-5 mb-4">
            <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
              {userName ? `${userName}님의 감정` : "감정 돌아보기"}
            </h2>

            {answers[4] && (
              <div className="bg-[rgba(107,142,107,0.2)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#6b8e6b] mb-1">가장 행복했던 순간</p>
                <p className="text-[#5c4a3a]">"{answers[4]}"</p>
              </div>
            )}

            {answers[5] && (
              <div className="bg-[rgba(196,92,74,0.1)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#c45c4a] mb-1">가장 힘들었던 순간</p>
                <p className="text-[#5c4a3a]">"{answers[5]}"</p>
              </div>
            )}

            {answers[6] && (
              <div className="bg-[rgba(255,255,255,0.5)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#8b7355] mb-1">요즘 무서운 것</p>
                <p className="text-[#5c4a3a] font-medium">{answers[6]}</p>
              </div>
            )}

            <p className="text-[#8b7355] text-sm mt-4 leading-relaxed">
              {ai_result?.emotion || "행복과 힘듦 사이, 당신은 꿋꿋이 버텼어요."}
            </p>
          </div>

          {/* 관계 */}
          <div className="felt-card stitch-border p-5 mb-4">
            <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
              {userName ? `${userName}님의 관계` : "소중한 관계"}
            </h2>

            {answers[7] && (
              <div className="bg-[rgba(255,255,255,0.5)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#8b7355] mb-1">숨겨진 강점</p>
                <p className="text-[#5c4a3a] font-medium">{answers[7]}</p>
              </div>
            )}

            {answers[8] && (
              <div className="bg-[rgba(107,142,107,0.2)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#6b8e6b] mb-1">새롭게 소중해진 사람</p>
                <p className="text-[#5c4a3a]">{answers[8]}</p>
              </div>
            )}

            {answers[9] && (
              <div className="bg-[rgba(196,92,74,0.1)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#c45c4a] mb-1">멀어진 사람</p>
                <p className="text-[#5c4a3a]">{answers[9]}</p>
              </div>
            )}

            {ai_result?.relationship && (
              <p className="text-[#8b7355] text-sm mt-4 leading-relaxed">
                {ai_result.relationship}
              </p>
            )}
          </div>

          {/* 성장 */}
          <div className="felt-card stitch-border p-5 mb-4">
            <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
              {userName ? `${userName}님의 성장` : "성장 포인트"}
            </h2>

            {answers[10] && (
              <div className="bg-[rgba(255,255,255,0.5)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#8b7355] mb-1">1년 전 나라면 안 했을 것</p>
                <p className="text-[#5c4a3a] font-medium">{answers[10]}</p>
              </div>
            )}

            {answers[12] && (
              <div className="bg-[rgba(196,92,74,0.1)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#c45c4a] mb-1">자주 미룬 것</p>
                <p className="text-[#5c4a3a]">{answers[12]}</p>
              </div>
            )}

            {answers[14] && (
              <div className="bg-[rgba(107,142,107,0.2)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#6b8e6b] mb-1">완주한 것</p>
                <p className="text-[#5c4a3a]">{answers[14]}</p>
              </div>
            )}

            {answers[13] && (
              <div className="bg-[rgba(255,255,255,0.5)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#8b7355] mb-1">포기한 것 중 후회되는 것</p>
                <p className="text-[#5c4a3a]">{answers[13]}</p>
              </div>
            )}

            {answers[11] && (
              <div className="bg-[rgba(212,165,116,0.2)] rounded-xl p-4 border-2 border-dashed border-[#d4a574]">
                <p className="text-sm text-[#8b7355] mb-1">1년 전 나에게</p>
                <p className="text-[#5c4a3a] italic">"{answers[11]}"</p>
              </div>
            )}

            {ai_result?.growth && (
              <p className="text-[#8b7355] text-sm mt-4 leading-relaxed">
                {ai_result.growth}
              </p>
            )}
          </div>

          {/* 취향/나다움 */}
          <div className="felt-card stitch-border p-5 mb-4">
            <h2 className="text-lg font-bold text-[#5c4a3a] mb-4">
              {userName ? `${userName}님의 취향` : "취향과 나다움"}
            </h2>

            {answers[17] && (
              <div className="bg-[rgba(255,255,255,0.5)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#8b7355] mb-1">많이 들은 노래/아티스트</p>
                <p className="text-[#5c4a3a]">{answers[17]}</p>
              </div>
            )}

            {answers[16] && (
              <div className="bg-[rgba(255,255,255,0.5)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#8b7355] mb-1">보다가 만 영화/드라마</p>
                <p className="text-[#5c4a3a]">{answers[16]}</p>
              </div>
            )}

            {answers[18] && (
              <div className="bg-[rgba(255,255,255,0.5)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#8b7355] mb-1">기억에 남는 책</p>
                <p className="text-[#5c4a3a]">{answers[18]}</p>
              </div>
            )}

            {answers[19] && (
              <div className="bg-[rgba(255,255,255,0.5)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#8b7355] mb-1">좋았던 장소/공간</p>
                <p className="text-[#5c4a3a]">{answers[19]}</p>
              </div>
            )}

            {answers[20] && (
              <div className="bg-[rgba(107,142,107,0.2)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#6b8e6b] mb-1">최고의 여행지</p>
                <p className="text-[#5c4a3a]">{answers[20]}</p>
              </div>
            )}

            {answers[21] && (
              <div className="bg-[rgba(255,255,255,0.5)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#8b7355] mb-1">가장 맛있게 먹은 것</p>
                <p className="text-[#5c4a3a]">{answers[21]}</p>
              </div>
            )}

            {answers[22] && (
              <div className="bg-[rgba(255,255,255,0.5)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#8b7355] mb-1">가장 잘한 소비</p>
                <p className="text-[#5c4a3a]">{answers[22]}</p>
              </div>
            )}

            {answers[23] && (
              <div className="bg-[rgba(255,255,255,0.5)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#8b7355] mb-1">새로운 취미/관심사</p>
                <p className="text-[#5c4a3a]">{answers[23]}</p>
              </div>
            )}

            {answers[24] && (
              <div className="bg-[rgba(255,255,255,0.5)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#8b7355] mb-1">자주 뿌린 향수</p>
                <p className="text-[#5c4a3a]">{answers[24]}</p>
              </div>
            )}

            {answers[25] && (
              <div className="bg-[rgba(196,92,74,0.1)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#c45c4a] mb-1">매력이 없어진 것</p>
                <p className="text-[#5c4a3a]">{answers[25]}</p>
              </div>
            )}

            {answers[26] && (
              <div className="bg-[rgba(212,165,116,0.2)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#8b7355] mb-1">숨겨둔 비밀</p>
                <p className="text-[#5c4a3a] font-medium">{answers[26]}</p>
              </div>
            )}

            {answers[27] && (
              <div className="bg-[rgba(255,255,255,0.5)] rounded-xl p-4 mb-3">
                <p className="text-sm text-[#8b7355] mb-1">버려야 할 물건</p>
                <p className="text-[#5c4a3a]">{answers[27]}</p>
              </div>
            )}

            {ai_result?.taste && (
              <p className="text-[#8b7355] text-sm mt-4 leading-relaxed">
                {ai_result.taste}
              </p>
            )}
          </div>

          {/* 2026년 조언 */}
          <div className="felt-card stitch-border p-5 mb-4 bg-[rgba(107,142,107,0.1)]">
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
              <div className="text-center py-2 mb-4 bg-[rgba(255,255,255,0.5)] rounded-xl">
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
              {ai_result?.advice || "2026년에는 더 많은 성장과 행복이 함께하길 바랍니다."}
            </p>
          </div>

          {/* 올해의 나 - 마무리 */}
          <div className="felt-card stitch-border p-5 mb-4">
            <div className="text-center">
              {answers[1] && (
                <div className="mb-4">
                  <p className="text-sm text-[#8b7355] mb-1">2025년을 한 단어로</p>
                  <p className="text-2xl font-bold text-[#5c4a3a]">{answers[1]}</p>
                </div>
              )}

              <div className="pt-4 border-t border-[rgba(212,165,116,0.3)]">
                <p className="text-[#8b7355] leading-relaxed">
                  2025년, 수고했어요.
                  <br />
                  2026년도 {userName ? `${userName}님` : "당신"}답게.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 pb-2">
            <p className="text-xs text-[#a89a8a]">2025 연말결산 Premium</p>
          </div>
        </div>
        {/* ref 끝 */}

        {/* 나도 해보기 CTA */}
        <div className="felt-card stitch-border p-5 mb-4 mt-4 bg-gradient-to-br from-[#f5e6d3] to-[#e8d4bc]">
          <p className="text-center text-[#5c4a3a] font-bold mb-2">나도 연말결산 해보기</p>
          <p className="text-center text-sm text-[#8b7355] mb-4">
            AI가 심층 분석하는 나의 2025년!
          </p>
          <a
            href="/"
            className="block text-center py-3 rounded-full bg-[#5c4a3a] text-white font-bold"
          >
            테스트 시작하기
          </a>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleDownloadImage}
            disabled={isSaving}
            className="w-full py-3 rounded-full border-2 border-[#8b7355] text-[#8b7355] hover:bg-[#8b7355] hover:text-white transition-colors font-medium"
          >
            {isSaving ? "저장 중..." : "이미지로 저장하기"}
          </button>

          <button
            onClick={handleShare}
            className="w-full py-3 rounded-full border-2 border-[#8b7355] text-[#8b7355] hover:bg-[#8b7355] hover:text-white transition-colors font-medium"
          >
            결과 공유하기
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full py-3 rounded-full border-2 border-[#8b7355] text-[#8b7355] hover:bg-[#8b7355] hover:text-white transition-colors font-medium"
          >
            {copied ? "복사됨!" : "링크 복사"}
          </button>
        </div>

        {/* 전체 답변 보기 */}
        <details className="mt-8">
          <summary className="text-xs text-[#a89a8a] cursor-pointer hover:underline">
            전체 답변 보기
          </summary>
          <div className="mt-4 p-4 bg-[rgba(255,255,255,0.5)] rounded-xl text-xs text-[#8b7355] space-y-3">
            {Object.entries(answers).map(([id, answer]) => {
              const question = premiumQuestions.find((q) => q.id === Number(id));
              return (
                <div key={id} className="border-b border-[rgba(212,165,116,0.2)] pb-2">
                  <p className="font-bold text-[#5c4a3a]">
                    Q{id}. {question?.question || "알 수 없음"}
                  </p>
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
