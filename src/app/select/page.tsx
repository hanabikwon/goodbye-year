"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SelectPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (!name) {
      router.push("/");
      return;
    }
    setUserName(name);
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* 뒤로가기 */}
        <button
          onClick={() => router.push("/")}
          className="text-sm text-[#a89a8a] hover:text-[#6b5d4d] mb-6 flex items-center gap-1 fade-in"
        >
          <span>←</span> 처음으로
        </button>

        {/* 인사 */}
        <div className="text-center mb-8 fade-in">
          <p className="text-[#a89a8a] mb-2">반가워요,</p>
          <h1 className="text-2xl font-medium text-[#6b5d4d]">
            {userName}님의 2025년을<br />어떻게 돌아볼까요?
          </h1>
        </div>

        {/* 티어 선택 카드들 */}
        <div className="space-y-4">
          {/* 무료 */}
          <div
            onClick={() => router.push("/test/free")}
            className="felt-card stitch-border p-5 cursor-pointer hover:scale-[1.01] transition-transform fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs text-white bg-[#8a9e7a] px-2 py-0.5 rounded-full">
                  무료
                </span>
                <h3 className="text-lg font-medium text-[#6b5d4d] mt-2">
                  핵심 분석
                </h3>
              </div>
              <p className="text-xl font-medium text-[#8a9e7a]">무료</p>
            </div>
            <p className="text-sm text-[#a89a8a] mb-3">
              12개 질문 · 약 4분 · AI 분석 포함
            </p>
            <div className="space-y-1 text-xs text-[#b8afa3] italic mt-3 pt-3 border-t border-[#ebe5dc]">
              <p>"올해 가장 고마웠던 사람은?"</p>
              <p>"1년 전의 나에게 해주고 싶은 말은?"</p>
              <p>"내년에 꼭 하고 싶은 것 하나는?"</p>
            </div>
          </div>

          {/* 프리미엄 */}
          <div
            onClick={() => router.push("/test/premium")}
            className="felt-card stitch-border p-5 cursor-pointer hover:scale-[1.01] transition-transform fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs text-white bg-[#b8956b] px-2 py-0.5 rounded-full">
                  프리미엄
                </span>
                <h3 className="text-lg font-medium text-[#6b5d4d] mt-2">
                  종합 분석
                </h3>
              </div>
              <p className="text-xl font-medium text-[#b8956b]">1,900원</p>
            </div>
            <p className="text-sm text-[#a89a8a] mb-3">
              30개 질문 · 약 15분 · 심층 AI 분석
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-xs bg-[#ebe5dc] text-[#8b7b6b] px-2 py-0.5 rounded-full">
                감정 분석
              </span>
              <span className="text-xs bg-[#ebe5dc] text-[#8b7b6b] px-2 py-0.5 rounded-full">
                관계
              </span>
              <span className="text-xs bg-[#ebe5dc] text-[#8b7b6b] px-2 py-0.5 rounded-full">
                성장
              </span>
              <span className="text-xs bg-[#ebe5dc] text-[#8b7b6b] px-2 py-0.5 rounded-full">
                취향
              </span>
            </div>
            <div className="space-y-1 text-xs text-[#b8afa3] italic pt-3 border-t border-[#ebe5dc]">
              <p>"그때는 좋았는데 지금은 매력이 없어 보이는 무언가?"</p>
              <p>"나만의 길티 플레져가 있다면?"</p>
              <p>"올해 가장 잘한 소비는?"</p>
              <p>"내년 이맘때 나는 어디에서 무엇을 하고 있을까?"</p>
            </div>
          </div>
        </div>

        {/* 하단 안내 */}
        <p className="text-center text-xs text-[#b8afa3] mt-6 fade-in" style={{ animationDelay: "0.4s" }}>
          결과는 공유할 수 있어요
        </p>
      </div>
    </main>
  );
}
