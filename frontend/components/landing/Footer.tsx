import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontSize: "20px" }}
          >
            whatshot
          </span>
          <span className="text-sm font-bold text-gray-300">Molt © 2026</span>
        </div>
        <div className="flex gap-8">
          <Link
            href="#"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Docs
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Twitter
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Discord
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
