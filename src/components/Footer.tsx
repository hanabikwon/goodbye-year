export default function Footer() {
  return (
    <footer className="py-8 px-4 mt-8 border-t border-[#e0d5c8]">
      <div className="max-w-md mx-auto text-center space-y-1">
        <p className="text-sm text-[#8b7355]">
          © 2025 Gyeongran Kwon
        </p>
        <p className="text-sm text-[#8b7355]">
          <a
            href="mailto:hanabikwon@gmail.com"
            className="hover:text-[#5c4a3a] transition-colors"
          >
            hanabikwon@gmail.com
          </a>
        </p>
        <p className="text-sm">
          <a
            href="#"
            className="text-[#a89a8a] hover:text-[#5c4a3a] transition-colors"
          >
            프로젝트 모아보기 →
          </a>
        </p>
      </div>
    </footer>
  );
}
