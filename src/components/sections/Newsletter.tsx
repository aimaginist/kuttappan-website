"use client";

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
      {/* Kuttappan laughing — peeking right edge on desktop */}
      <div className="absolute bottom-0 right-0 hidden lg:block pointer-events-none select-none" style={{ width: 220 }}>
        <Image
          src="/images/expressions/kuttappan-laughing.webp"
          alt=""
          width={220}
          height={308}
          className="object-contain"
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "var(--font-display)", color: "#0D3B1F" }}>
              Stay in the Loop!
            </h2>
            <p className="text-lg" style={{ fontFamily: "var(--font-body)", color: "#0D3B1F" }}>
              Get updates on new episodes, behind-the-scenes peeks, and Kuttappan&apos;s latest plans (that probably won&apos;t work).
            </p>

            {submitted ? (
              <p className="text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#0D3B1F" }}>
                You&apos;re in! Kuttappan approves.
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
                  style={{ fontFamily: "var(--font-body)", backgroundColor: "#FFF8E7", color: "#1A1A1A" }}
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
