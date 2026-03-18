const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

const files = {};

// ─── NAVBAR ─────────────────────────────────────────────────────────────────
files['src/components/layout/Navbar.tsx'] = `"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav
        className={\`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 \${scrolled ? "shadow-lg" : ""}\`}
        style={{ backgroundColor: "#1B7A3D" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="shrink-0">
              <span
                className="text-2xl md:text-3xl leading-none"
                style={{ fontFamily: "var(--font-display)", color: "#FFF8E7", letterSpacing: "0.02em" }}
              >
                KUTTAPPAN
              </span>
            </Link>

            <ul className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="relative pb-1 text-base font-semibold transition-colors duration-200"
                      style={{ fontFamily: "var(--font-body)", color: isActive ? "#F5A623" : "#FFF8E7" }}
                    >
                      {link.label}
                      <span
                        className={\`absolute bottom-0 left-0 right-0 h-0.5 rounded-full \${isActive ? "opacity-100" : "opacity-0"}\`}
                        style={{ backgroundColor: "#F5A623" }}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              className="md:hidden p-2 rounded-md"
              style={{ color: "#FFF8E7" }}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={\`fixed inset-0 z-40 flex flex-col items-center justify-center transition-opacity duration-300 md:hidden \${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }\`}
        style={{ backgroundColor: "#1B7A3D" }}
      >
        <ul className="flex flex-col items-center gap-10">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-4xl transition-colors duration-200"
                  style={{ fontFamily: "var(--font-display)", color: isActive ? "#F5A623" : "#FFF8E7" }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="h-16" />
    </>
  );
}
`;

// ─── FOOTER ─────────────────────────────────────────────────────────────────
files['src/components/layout/Footer.tsx'] = `import Link from "next/link";
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

          {/* Logo + tagline */}
          <div className="text-center">
            <p className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "var(--font-display)", color: "#FFF8E7" }}>
              KUTTAPPAN
            </p>
            <p className="text-lg font-semibold" style={{ fontFamily: "var(--font-body)", color: "#F5A623" }}>
              {TAGLINES.primary}
            </p>
          </div>

          {/* Nav links */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="flex items-center gap-6">
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

          {/* Social icons */}
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

          {/* Studio credit */}
          <p className="text-sm text-center" style={{ fontFamily: "var(--font-body)", color: "#7F8C8D" }}>
            Human-directed, AI-powered animation by{" "}
            <a href={STUDIO.url} target="_blank" rel="noopener noreferrer"
               className="transition-colors duration-200 hover:underline" style={{ color: "#F5A623" }}>
              {STUDIO.name}
            </a>
          </p>

          {/* Copyright */}
          <p className="text-xs" style={{ fontFamily: "var(--font-body)", color: "#7F8C8D" }}>
            {STUDIO.copyright}
          </p>

        </div>
      </div>
    </footer>
  );
}
`;

// ─── BUTTON ─────────────────────────────────────────────────────────────────
files['src/components/ui/Button.tsx'] = `import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "outline";
type Size    = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  target?: string;
  rel?: string;
}

const styles: Record<Variant, { bg: string; color: string; border: string; hover: string }> = {
  primary:   { bg: "#1B7A3D", color: "#FFF8E7", border: "transparent",  hover: "#156130" },
  secondary: { bg: "#F5A623", color: "#0D3B1F", border: "transparent",  hover: "#C4851C" },
  accent:    { bg: "#C0392B", color: "#FFF8E7", border: "transparent",  hover: "#9A2E22" },
  outline:   { bg: "transparent", color: "#1B7A3D", border: "#1B7A3D", hover: "#1B7A3D" },
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  href,
  className = "",
  target,
  rel,
}: ButtonProps) {
  const s = styles[variant];
  const baseClass = \`inline-flex items-center justify-center rounded-full font-bold tracking-wide transition-all duration-200 hover:scale-105 active:scale-100 cursor-pointer border-2 \${sizes[size]} \${className}\`;

  const inlineStyle = {
    backgroundColor: s.bg,
    color: s.color,
    borderColor: s.border,
    fontFamily: "var(--font-body)",
  };

  if (href) {
    return (
      <Link
        href={href}
        className={baseClass}
        style={inlineStyle}
        target={target}
        rel={rel}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.backgroundColor = variant === "outline" ? s.hover : s.hover;
          if (variant === "outline") { el.style.color = "#FFF8E7"; el.style.borderColor = s.hover; }
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.backgroundColor = s.bg;
          el.style.color = s.color;
          el.style.borderColor = s.border;
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={baseClass}
      style={inlineStyle}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.backgroundColor = s.hover;
        if (variant === "outline") { el.style.color = "#FFF8E7"; el.style.borderColor = s.hover; }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.backgroundColor = s.bg;
        el.style.color = s.color;
        el.style.borderColor = s.border;
      }}
    >
      {children}
    </button>
  );
}
`;

// ─── SECTION HEADING ─────────────────────────────────────────────────────────
files['src/components/ui/SectionHeading.tsx'] = `interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  color?: "green" | "cream" | "yellow";
  alignment?: "left" | "center";
  withAccent?: boolean;
}

const colorMap = {
  green:  { title: "#1B7A3D", subtitle: "#6D4C41" },
  cream:  { title: "#FFF8E7", subtitle: "#FFF8E7" },
  yellow: { title: "#F5A623", subtitle: "#FFF8E7" },
};

export default function SectionHeading({
  title,
  subtitle,
  color = "green",
  alignment = "center",
  withAccent = true,
}: SectionHeadingProps) {
  const colors = colorMap[color];
  const alignClass = alignment === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={\`flex flex-col gap-3 \${alignClass}\`}>
      <h2
        className="text-3xl md:text-4xl lg:text-5xl leading-tight"
        style={{ fontFamily: "var(--font-display)", color: colors.title }}
      >
        {title}
      </h2>
      {withAccent && (
        <span
          className="block h-1 rounded-full"
          style={{ width: "40px", backgroundColor: "#F5A623" }}
        />
      )}
      {subtitle && (
        <p
          className="text-lg max-w-2xl"
          style={{ fontFamily: "var(--font-body)", color: colors.subtitle, opacity: 0.85 }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
`;

// ─── CARD ─────────────────────────────────────────────────────────────────────
files['src/components/ui/Card.tsx'] = `import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface CardProps {
  image: { src: string; alt: string };
  title: string;
  description: string;
  badge?: string;
  href?: string;
  hoverEffect?: boolean;
  footer?: ReactNode;
}

export default function Card({ image, title, description, badge, href, hoverEffect = true, footer }: CardProps) {
  const inner = (
    <div
      className={\`group relative rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 \${
        hoverEffect ? "hover:-translate-y-1 hover:shadow-xl" : ""
      }\`}
      style={{ backgroundColor: "#FFF8E7", borderTop: "3px solid #1B7A3D" }}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={\`object-cover transition-transform duration-500 \${hoverEffect ? "group-hover:scale-105" : ""}\`}
        />
        {badge && (
          <span
            className="absolute top-3 right-3 w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ fontFamily: "var(--font-display)", backgroundColor: "#1B7A3D", color: "#FFF8E7" }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-6 flex-1">
        <h3
          className="text-xl leading-snug"
          style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}
        >
          {title}
        </h3>
        <p
          className="text-base leading-relaxed flex-1"
          style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}
        >
          {description}
        </p>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block h-full">{inner}</Link>;
  }
  return inner;
}
`;

// ─── EPISODE BADGE ─────────────────────────────────────────────────────────────
files['src/components/ui/EpisodeBadge.tsx'] = `interface EpisodeBadgeProps {
  number: number | string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { outer: "w-10 h-10", label: "text-xs", num: "text-base" },
  md: { outer: "w-14 h-14", label: "text-xs", num: "text-xl" },
  lg: { outer: "w-18 h-18", label: "text-sm", num: "text-2xl" },
};

export default function EpisodeBadge({ number, size = "md" }: EpisodeBadgeProps) {
  const s = sizeMap[size];
  const padded = String(number).padStart(2, "0");
  return (
    <div
      className={\`\${s.outer} rounded-full flex flex-col items-center justify-center shrink-0\`}
      style={{ backgroundColor: "#1B7A3D" }}
    >
      <span className={\`\${s.label} leading-none uppercase\`} style={{ fontFamily: "var(--font-display)", color: "#FFF8E7" }}>EP</span>
      <span className={\`\${s.num} leading-none\`} style={{ fontFamily: "var(--font-display)", color: "#FFF8E7" }}>{padded}</span>
    </div>
  );
}
`;

// ─── SCROLL REVEAL ─────────────────────────────────────────────────────────────
files['src/components/effects/ScrollReveal.tsx'] = `"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

const directionMap = {
  up:    { transform: "translateY(32px)" },
  left:  { transform: "translateX(-32px)" },
  right: { transform: "translateX(32px)" },
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenStyle = directionMap[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : hiddenStyle.transform,
        transition: \`opacity 0.6s ease \${delay}s, transform 0.6s ease \${delay}s\`,
      }}
    >
      {children}
    </div>
  );
}
`;

// ─── FLOATING ELEMENTS ────────────────────────────────────────────────────────
files['src/components/effects/FloatingElements.tsx'] = `export default function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Top-right palm */}
      <div
        className="absolute top-4 right-4 md:right-10 opacity-10"
        style={{ width: 80, height: 160, animation: "float-slow 7s ease-in-out infinite" }}
      >
        <img src="/images/brand/decorations/coconut-palm.svg" alt="" width={80} height={160} />
      </div>
      {/* Scattered mangos */}
      <div
        className="absolute top-20 left-8 opacity-8 hidden md:block"
        style={{ width: 40, height: 56, animation: "float 5s ease-in-out infinite 1s" }}
      >
        <img src="/images/brand/decorations/mango.svg" alt="" width={40} height={56} />
      </div>
      <div
        className="absolute bottom-32 right-20 opacity-8 hidden md:block"
        style={{ width: 30, height: 42, animation: "float 4s ease-in-out infinite 2s" }}
      >
        <img src="/images/brand/decorations/mango.svg" alt="" width={30} height={42} />
      </div>
    </div>
  );
}
`;

// ─── GRAIN OVERLAY ─────────────────────────────────────────────────────────────
files['src/components/effects/GrainOverlay.tsx'] = `export default function GrainOverlay() {
  // Handled entirely by CSS in globals.css via body::before
  // This component exists as a semantic placeholder
  return null;
}
`;

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
files['src/components/sections/Hero.tsx'] = `"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import FloatingElements from "@/components/effects/FloatingElements";
import { TAGLINES } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Background: blurred Kerala house */}
      <div className="absolute inset-0">
        <Image
          src="/images/world/home-exterior-blur.webp"
          alt="Kerala village home"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Warm Cream overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(255,248,231,0.85)" }} />
      </div>

      <FloatingElements />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-0">

          {/* Left: text (60%) */}
          <div
            className="flex-1 flex flex-col gap-6 text-center md:text-left items-center md:items-start"
            style={{ animation: "fadeUp 0.6s ease 0.3s both" }}
          >
            <h1
              className="text-6xl md:text-7xl lg:text-8xl leading-none"
              style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}
            >
              KUTTAPPAN
            </h1>
            <p
              className="text-xl md:text-2xl font-semibold max-w-md"
              style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}
            >
              {TAGLINES.primary}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start" style={{ animationDelay: "0.8s" }}>
              <Button variant="primary" size="lg" href="/episodes">Watch Episodes</Button>
              <Button variant="secondary" size="lg" href="/characters">Meet the Gang</Button>
            </div>
          </div>

          {/* Right: Kuttappan excited (40%) */}
          <div
            className="relative flex-shrink-0 w-56 md:w-80 lg:w-96"
            style={{ animation: "slideInRight 0.7s ease 0.5s both" }}
          >
            <Image
              src="/images/expressions/kuttappan-excited.webp"
              alt="Kuttappan excited and scheming"
              width={400}
              height={560}
              priority
              className="w-full h-auto animate-float drop-shadow-2xl"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      <style jsx>{\`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: none; }
        }
      \`}</style>
    </section>
  );
}
`;

// ─── CHARACTER SPOTLIGHT ────────────────────────────────────────────────────────
files['src/components/sections/CharacterSpotlight.tsx'] = `import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Button from "@/components/ui/Button";

const characters = [
  {
    name: "Kuttappan",
    role: "The Dreamer",
    oneliner: "Big plans. Zero backup plans.",
    image: "/images/characters/kuttappan-face.webp",
  },
  {
    name: "Shambhu",
    role: "The Loyal One",
    oneliner: "Knows it'll fail. Joins anyway.",
    image: "/images/characters/shambhu-face.webp",
  },
  {
    name: "Pakru",
    role: "The Heart (& Stomach)",
    oneliner: "Snacks first. Adventure second.",
    image: "/images/characters/pakru-face.webp",
  },
];

export default function CharacterSpotlight() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#FFF8E7" }}>
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <ScrollReveal>
          <SectionHeading title="The Gang" subtitle="Every great plan needs a team." withAccent />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {characters.map((char, i) => (
            <ScrollReveal key={char.name} direction="up" delay={i * 0.15}>
              <Link href="/characters" className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ backgroundColor: "#FFF8E7", borderTop: "3px solid #1B7A3D" }}>
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1" }}>
                  <Image
                    src={char.image}
                    alt={char.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col gap-1">
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F5A623", fontFamily: "var(--font-body)" }}>
                    {char.role}
                  </p>
                  <h3 className="text-2xl" style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}>
                    {char.name}
                  </h3>
                  <p className="text-base italic" style={{ fontFamily: "var(--font-body)", color: "#6D4C41" }}>
                    "{char.oneliner}"
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="flex justify-center">
            <Button variant="secondary" size="lg" href="/characters">Meet Everyone</Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
`;

// ─── EPISODE PREVIEW ──────────────────────────────────────────────────────────
files['src/components/sections/EpisodePreview.tsx'] = `import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Button from "@/components/ui/Button";
import EpisodeBadge from "@/components/ui/EpisodeBadge";

const episodes = [
  { number: 1, title: "Kuttappan & The Mango Heist",   thumbnail: "/images/episodes/ep01.webp" },
  { number: 2, title: "Kuttappan & The School Day",    thumbnail: "/images/episodes/ep02.webp" },
  { number: 3, title: "Kuttappan & The Big Race",      thumbnail: "/images/episodes/ep03.webp" },
];

export default function EpisodePreview() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#E8F5EC" }}>
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <ScrollReveal>
          <SectionHeading
            title="Latest Adventures"
            subtitle="Every plan. Every disaster. Every laugh."
            color="green"
            withAccent
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {episodes.map((ep, i) => (
            <ScrollReveal key={ep.number} direction="up" delay={i * 0.12}>
              <div className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ backgroundColor: "#FFF8E7", borderTop: "3px solid #1B7A3D" }}>
                <div className="relative" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={ep.thumbnail}
                    alt={ep.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <EpisodeBadge number={ep.number} size="sm" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg leading-snug" style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}>
                    {ep.title}
                  </h3>
                  <p className="text-sm mt-2 italic" style={{ fontFamily: "var(--font-body)", color: "#7F8C8D" }}>
                    Coming soon
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="flex justify-center">
            <Button variant="primary" size="lg" href="/episodes">See All Adventures</Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
`;

// ─── WORLD TEASER ─────────────────────────────────────────────────────────────
files['src/components/sections/WorldTeaser.tsx'] = `import Image from "next/image";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/effects/ScrollReveal";

export default function WorldTeaser() {
  return (
    <section className="relative min-h-[480px] flex items-end overflow-hidden">
      {/* Paddy fields background */}
      <div className="absolute inset-0">
        <Image
          src="/images/world/paddy-fields-wide.webp"
          alt="Kerala paddy fields at golden hour"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient: transparent on top, fading to warm-cream at bottom */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(255,248,231,0) 0%, rgba(255,248,231,0.6) 50%, rgba(255,248,231,0.98) 100%)" }}
        />
      </div>

      <div className="relative z-10 w-full pb-16 pt-48 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center flex flex-col gap-5">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl leading-tight"
              style={{ fontFamily: "var(--font-display)", color: "#1B7A3D", textShadow: "0 2px 8px rgba(255,248,231,0.8)" }}
            >
              From the heart of a Kerala village...
            </h2>
            <p
              className="text-lg md:text-xl"
              style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}
            >
              A 1990s world where every lane has a story, every tree has a secret, and every afternoon is an adventure waiting to happen.
            </p>
            <div className="flex justify-center">
              <Button variant="outline" size="lg" href="/world">Explore the Village</Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
`;

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
files['src/components/sections/Newsletter.tsx'] = `"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/effects/ScrollReveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5A623" }}>
      {/* Kuttappan laughing — peeking from right edge (desktop only) */}
      <div className="absolute bottom-0 right-0 hidden lg:block pointer-events-none" style={{ width: 220 }}>
        <Image
          src="/images/expressions/kuttappan-laughing.webp"
          alt="Kuttappan laughing"
          width={220}
          height={308}
          className="object-contain"
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h2
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-display)", color: "#0D3B1F" }}
            >
              Stay in the Loop!
            </h2>
            <p
              className="text-lg"
              style={{ fontFamily: "var(--font-body)", color: "#0D3B1F" }}
            >
              Get updates on new episodes, behind-the-scenes peeks, and Kuttappan&apos;s latest plans (that probably won&apos;t work).
            </p>

            {submitted ? (
              <p className="text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#0D3B1F" }}>
                You&apos;re in! Kuttappan approves. 🤭
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 rounded-full px-5 py-3 text-base outline-none"
                  style={{
                    fontFamily: "var(--font-body)",
                    backgroundColor: "#FFF8E7",
                    color: "#1A1A1A",
                    border: "2px solid transparent",
                  }}
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#1B7A3D"; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "transparent"; }}
                />
                <button
                  type="submit"
                  className="rounded-full px-7 py-3 font-bold text-base transition-all duration-200 hover:scale-105"
                  style={{ fontFamily: "var(--font-body)", backgroundColor: "#1B7A3D", color: "#FFF8E7" }}
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="text-sm italic" style={{ fontFamily: "var(--font-body)", color: "#6D4C41" }}>
              No spam. Just chaos.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
`;

// ─── WRITE ALL FILES ──────────────────────────────────────────────────────────
let count = 0;
for (const [relPath, content] of Object.entries(files)) {
  const absPath = path.join(root, relPath);
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  fs.writeFileSync(absPath, content, 'utf8');
  console.log(\`✓ \${relPath}\`);
  count++;
}
console.log(\`\nAll \${count} components written!\`);
