"use client";

import { useRouter } from "next/navigation";
import { tierPricing } from "@/data/questions";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-lg mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#5c4a3a] mb-3">
            2025 연말결산
          </h1>
          <p className="text-[#8b7355]">
            AI가 분석해주는 나만의 한 해 돌아보기
          </p>
        </div>

        {/* 2티어 카드들 */}
        <div className="space-y-4">
          {/* 무료 (라이트 AI) */}
          <div
            onClick={() => router.push("/test/free")}
            className="felt-card stitch-border p-5 cursor-pointer hover:scale-[1.02] transition-transform border-2 border-[#d4a574]"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs text-white bg-[#6b8e6b] px-2 py-0.5 rounded-full">
                  무료
                </span>
                <span className="text-xs text-white bg-[#d4a574] px-2 py-0.5 rounded-full ml-1">
                  AI 분석
                </span>
                <h3 className="text-xl font-bold text-[#5c4a3a] mt-2">
                  핵심 분석 테스트
                </h3>
              </div>
              <p className="text-2xl font-bold text-[#6b8e6b]">무료</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-[#8b7355] mb-3">
              <span>20개 질문</span>
              <span>•</span>
              <span>약 7분</span>
              <span>•</span>
              <span className="text-[#6b8e6b]">라이트 AI 분석</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs bg-white/50 text-[#8b7355] px-2 py-0.5 rounded-full">
                2025년 총평
              </span>
              <span className="text-xs bg-white/50 text-[#8b7355] px-2 py-0.5 rounded-full">
                2026 조언
              </span>
            </div>
            <div className="space-y-1 text-sm text-[#8b7355] italic mt-3 pt-3 border-t border-[#d4a574]/30">
              <p>"올해 가장 고마웠던 사람은?"</p>
              <p>"올해 나를 성장시킨 경험은?"</p>
              <p>"내년에 꼭 하고 싶은 것 하나는?"</p>
            </div>
          </div>

          {/* 프리미엄 (풀 AI) */}
          <div
            onClick={() => router.push("/test/premium")}
            className="felt-card stitch-border p-5 cursor-pointer hover:scale-[1.02] transition-transform bg-gradient-to-br from-[#f5e6d3] to-[#e8d4bc]"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs text-white bg-[#5c4a3a] px-2 py-0.5 rounded-full">
                  프리미엄
                </span>
                <span className="text-xs text-white bg-[#d4a574] px-2 py-0.5 rounded-full ml-1">
                  AI 분석
                </span>
                <h3 className="text-xl font-bold text-[#5c4a3a] mt-2">
                  종합 분석 테스트
                </h3>
              </div>
              <p className="text-2xl font-bold text-[#5c4a3a]">2,900원</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-[#8b7355] mb-3">
              <span>50개 질문</span>
              <span>•</span>
              <span>약 20분</span>
              <span>•</span>
              <span className="text-[#6b8e6b]">풀 AI 분석</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs bg-white/50 text-[#8b7355] px-2 py-0.5 rounded-full">
                2025년 총평
              </span>
              <span className="text-xs bg-white/50 text-[#8b7355] px-2 py-0.5 rounded-full">
                감정 분석
              </span>
              <span className="text-xs bg-white/50 text-[#8b7355] px-2 py-0.5 rounded-full">
                관계 돌아보기
              </span>
              <span className="text-xs bg-white/50 text-[#8b7355] px-2 py-0.5 rounded-full">
                성장 포인트
              </span>
              <span className="text-xs bg-[#6b8e6b]/20 text-[#6b8e6b] px-2 py-0.5 rounded-full">
                취향
              </span>
              <span className="text-xs bg-[#6b8e6b]/20 text-[#6b8e6b] px-2 py-0.5 rounded-full">
                나다움
              </span>
            </div>
            <div className="space-y-1 text-sm text-[#8b7355] italic mt-3 pt-3 border-t border-[#d4a574]/30">
              <p>"혼자 있을 때 주로 무슨 생각을 했나?"</p>
              <p>"안정 vs 도전, 당신의 선택은?"</p>
              <p>"올해 가장 잘한 소비는?"</p>
              <p>"올해 새롭게 빠진 취미나 관심사가 있다면?"</p>
            </div>
          </div>
        </div>

        {/* 안내 */}
        <p className="text-center text-xs text-[#a89a8a] mt-6">
          프리미엄은 Buy Me a Coffee를 통해 결제됩니다
        </p>
      </div>
    </main>
  );
}
