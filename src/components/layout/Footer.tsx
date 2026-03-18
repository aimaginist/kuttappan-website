import Link from "next/link";
import { Youtube, Instagram, Twitter } from "lucide-react";
import { NAV_LINKS, SOCIAL, STUDIO, TAGLINES } from "@/lib/constants";

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.79 1.52V6.76a4.85 4.85 0 0 1-1.02-.07z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0D3B1F", borderTop: "4px solid #F5A623" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center gap-10">

          <div className="text-center">
            <p className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "var(--font-display)", color: "#FFF8E7" }}>
              KUTTAPPAN
            </p>
            <p className="text-lg font-semibold" style={{ fontFamily: "var(--font-body)", color: "#F5A623" }}>
              {TAGLINES.primary}
            </p>
          </div>

          <nav>
            <ul className="flex flex-wrap justify-center gap-x-2 gap-y-2 items-center">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="flex items-center gap-2">
                  <Link
                    href={link.href}
                    className="text-sm font-semibold transition-colors duration-200 hover:text-[#F5A623]"
                    style={{ fontFamily: "var(--font-body)", color: "#FFF8E7" }}
                  >
                    {link.label}
                  </Link>
                  {i < NAV_LINKS.length - 1 && (
                    <span style={{ color: "#7F8C8D" }}>·</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <a href={SOCIAL.youtube.url} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
               className="transition-colors duration-200 hover:text-[#F5A623]" style={{ color: "#FFF8E7" }}>
              <Youtube size={22} />
            </a>
            <a href={SOCIAL.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
               className="transition-colors duration-200 hover:text-[#F5A623]" style={{ color: "#FFF8E7" }}>
              <Instagram size={22} />
            </a>
            <a href={SOCIAL.tiktok.url} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
               className="transition-colors duration-200 hover:text-[#F5A623]" style={{ color: "#FFF8E7" }}>
              <TikTokIcon />
            </a>
            <a href={SOCIAL.twitter.url} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
               className="transition-colors duration-200 hover:text-[#F5A623]" style={{ color: "#FFF8E7" }}>
              <Twitter size={22} />
            </a>
          </div>

          <p className="text-sm text-center" style={{ fontFamily: "var(--font-body)", color: "#7F8C8D" }}>
            Human-directed, AI-powered animation by{" "}
            <a href={STUDIO.url} target="_blank" rel="noopener noreferrer"
               className="transition-colors duration-200 hover:underline" style={{ color: "#F5A623" }}>
              {STUDIO.name}
            </a>
          </p>

          <p className="text-xs" style={{ fontFamily: "var(--font-body)", color: "#7F8C8D" }}>
            {STUDIO.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
