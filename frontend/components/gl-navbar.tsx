import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6 lg:px-10">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-[#ff6a00]">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "28px" }}
            >
              whatshot
            </span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#ff6a00] transition-colors">
            Molt
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/leaderboard"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Leaderboard
          </Link>
          <Link
            href="/watchlist"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Watchlist
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Docs
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="/skills.md"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#ff6a00] hover:bg-[#ff7b1a] text-white text-sm font-bold h-9 px-4 rounded transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">
            smart_toy
          </span>
          Agent Skills
        </a>
      </div>
    </nav>
  );
}
