"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import FloatingElements from "@/components/effects/FloatingElements";
import { TAGLINES } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Blurred Kerala house background */}
      <div className="absolute inset-0">
        <Image
          src="/images/world/home-exterior-blur.webp"
          alt="Kerala village home"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(255,248,231,0.85)" }} />
      </div>

      <FloatingElements />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">

          {/* Text — 60% */}
          <div className="flex-1 flex flex-col gap-6 text-center md:text-left items-center md:items-start"
            style={{ animation: "heroFadeUp 0.7s ease 0.2s both" }}>
            <h1
              className="text-6xl md:text-7xl lg:text-8xl leading-none"
              style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}
            >
              KUTTAPPAN
            </h1>
            <p className="text-xl md:text-2xl font-semibold max-w-md"
              style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}>
              {TAGLINES.primary}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start"
              style={{ animation: "heroFadeUp 0.7s ease 0.8s both" }}>
              <Button variant="primary" size="lg" href="/episodes">Watch Episodes</Button>
              <Button variant="secondary" size="lg" href="/characters">Meet the Gang</Button>
            </div>
          </div>

          {/* Character — 40% */}
          <div className="relative flex-shrink-0 w-56 md:w-80 lg:w-96"
            style={{ animation: "heroSlideIn 0.7s ease 0.5s both" }}>
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

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes heroSlideIn {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
