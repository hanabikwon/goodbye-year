"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function IntroPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name.trim()) {
      // 이름을 localStorage에 저장하고 요금제 선택 페이지로 이동
      localStorage.setItem("userName", name.trim());
      router.push("/select");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* 자수 집 이미지 */}
        <div className="mb-8 fade-in">
          <Image
            src="/house.png"
            alt="손바느질 집"
            width={240}
            height={240}
            className="mx-auto"
          />
        </div>

        {/* 인트로 문구 */}
        <div className="mb-10 fade-in" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-2xl font-medium text-[#6b5d4d] leading-relaxed mb-4">
            2025년을 돌아볼 시간이에요.
          </h1>
          <p className="text-[#a89a8a] leading-relaxed">
            바쁘게 달려온 당신,<br />
            잠시 멈춰서 한 해를 돌아볼 시간.
          </p>
        </div>

        {/* 이름 입력 카드 */}
        <div
          className="felt-card stitch-border p-6 mb-6 fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <label className="block text-sm text-[#a89a8a] mb-3">
            당신의 이름을 알려주세요
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름 또는 닉네임"
            className="w-full p-4 rounded-xl border-2 border-dashed border-[#d5cdc2] bg-white/30
                       focus:outline-none focus:border-[#c9a882] text-center text-lg text-[#6b5d4d]
                       placeholder:text-[#b8afa3]"
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
          />
        </div>

        {/* 시작 버튼 */}
        <button
          onClick={handleStart}
          disabled={!name.trim()}
          className={`felt-button w-full text-lg fade-in ${
            !name.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ animationDelay: "0.6s" }}
        >
          시작하기
        </button>

        {/* 하단 안내 */}
        <p className="text-xs text-[#b8afa3] mt-6 fade-in" style={{ animationDelay: "0.8s" }}>
          AI가 분석해주는 나만의 2025 연말결산
        </p>
      </div>
    </main>
  );
}
