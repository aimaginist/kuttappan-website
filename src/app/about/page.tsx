"use client";

import { useState } from "react";
import Image from "next/image";
import { Youtube, Instagram, Twitter } from "lucide-react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { SOCIAL, STUDIO } from "@/lib/constants";

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.79 1.52V6.76a4.85 4.85 0 0 1-1.02-.07z" />
    </svg>
  );
}

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  backgroundColor: "#FFF8E7",
  color: "#1A1A1A",
  border: "2px solid #E8F5EC",
  borderRadius: "0.75rem",
  padding: "0.75rem 1rem",
  width: "100%",
  outline: "none",
};

const socials = [
  { label: "YouTube",   handle: "@Kuttappan",          url: "https://youtube.com/@Kuttappan" },
  { label: "Instagram", handle: "@kuttappan.official",  url: "https://instagram.com/kuttappan.official" },
  { label: "TikTok",   handle: "@kuttappan",           url: "https://tiktok.com/@kuttappan" },
  { label: "X",        handle: "@KuttappanShow",       url: "https://x.com/KuttappanShow" },
] as const;

function SocialIcon({ label }: { label: string }) {
  if (label === "YouTube")   return <Youtube size={20} />;
  if (label === "Instagram") return <Instagram size={20} />;
  if (label === "TikTok")    return <TikTokIcon />;
  return <Twitter size={20} />;
}

export default function AboutPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "#1B7A3D";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "#E8F5EC";
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 flex items-center"
        style={{ backgroundColor: "#1B7A3D", minHeight: "340px" }}
      >
        <div
          className="absolute bottom-0 right-8 hidden md:block pointer-events-none select-none"
          style={{ width: 220 }}
        >
          <Image
            src="/images/expressions/kuttappan-proud.webp"
            alt=""
            width={220}
            height={308}
            priority
            className="object-contain animate-float"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <ScrollReveal>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl mb-4"
              style={{ fontFamily: "var(--font-display)", color: "#FFF8E7" }}
            >
              Our Story
            </h1>
            <span className="block h-1 w-10 rounded-full" style={{ backgroundColor: "#F5A623" }} />
          </ScrollReveal>
        </div>
      </section>

      {/* ── WHAT IS KUTTAPPAN ────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#FFF8E7" }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 flex flex-col gap-5">
                <div>
                  <h2
                    className="text-4xl md:text-5xl mb-3"
                    style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}
                  >
                    What is Kuttappan?
                  </h2>
                  <span className="block h-1 w-10 rounded-full" style={{ backgroundColor: "#F5A623" }} />
                </div>
                <p className="text-lg leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}>
                  Kuttappan is a 3D animated kids series about an 8-year-old boy from a Kerala village whose grand
                  plans always fail spectacularly &mdash; but whose heart always wins. Set in a 1990s Kerala village,
                  it&apos;s a show about friendship, curiosity, resilience, and the beautiful chaos of childhood.
                </p>
                <p className="text-lg leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}>
                  Our visual style is inspired by Disney&apos;s Moana &mdash; where nature isn&apos;t the backdrop,
                  it&apos;s a character. Every coconut palm, every rain cloud, every paddy field plays a part in
                  Kuttappan&apos;s adventures.
                </p>
              </div>
              <div className="w-full md:w-2/5 flex-shrink-0">
                <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src="/images/world/backwaters.webp"
                    alt="The backwaters of Kerala"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── THE STUDIO ───────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#E8F5EC" }}>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col gap-6">
              <div>
                <h2
                  className="text-4xl md:text-5xl mb-3"
                  style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}
                >
                  Made by AImaginist Studio
                </h2>
                <span className="block h-1 w-10 rounded-full" style={{ backgroundColor: "#F5A623" }} />
              </div>
              <p className="text-lg leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}>
                AImaginist Studio is pioneering a new approach to animation: human-directed, AI-powered storytelling.
                We believe technology should serve the heart of a story, not replace it. Every frame of Kuttappan is
                guided by human creativity and brought to life through cutting-edge AI animation tools.
              </p>
              <a
                href={STUDIO.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-bold text-base transition-all duration-200 hover:scale-105 w-fit"
                style={{ fontFamily: "var(--font-body)", backgroundColor: "#1B7A3D", color: "#FFF8E7" }}
              >
                Visit AImaginist Studio &#8599;
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── VISION QUOTE ─────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#FFF8E7" }}>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <blockquote className="border-l-4 pl-8 py-2" style={{ borderColor: "#1B7A3D" }}>
              <p
                className="text-2xl md:text-3xl leading-relaxed"
                style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}
              >
                &ldquo;Our dream is for Kuttappan to become one of the most recognised and beloved animated characters
                to emerge from India &mdash; a global kids brand rooted in Kerala&apos;s culture, humour, and warmth,
                standing alongside the world&apos;s most iconic cartoon franchises.&rdquo;
              </p>
              <footer
                className="mt-4 text-base font-semibold"
                style={{ fontFamily: "var(--font-body)", color: "#F5A623" }}
              >
                &mdash; AImaginist Studio
              </footer>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#0D3B1F" }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-16">

              {/* Form */}
              <div className="flex-1">
                <h2
                  className="text-4xl md:text-5xl mb-2"
                  style={{ fontFamily: "var(--font-display)", color: "#FFF8E7" }}
                >
                  Get in Touch
                </h2>
                <p className="text-base mb-8" style={{ fontFamily: "var(--font-body)", color: "#7F8C8D" }}>
                  Press enquiries, collaboration ideas, or just want to say hi? We&apos;d love to hear from you.
                </p>

                {submitted ? (
                  <div className="rounded-2xl p-8" style={{ backgroundColor: "#1B7A3D" }}>
                    <p className="text-2xl" style={{ fontFamily: "var(--font-display)", color: "#FFF8E7" }}>
                      Message sent! We&apos;ll be in touch soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <textarea
                      placeholder="Your message..."
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <button
                      type="submit"
                      className="rounded-full py-3 font-bold text-base transition-all duration-200 hover:scale-105"
                      style={{ fontFamily: "var(--font-body)", backgroundColor: "#F5A623", color: "#0D3B1F" }}
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Social links */}
              <div className="md:w-64 flex flex-col gap-5">
                <h3
                  className="text-2xl"
                  style={{ fontFamily: "var(--font-display)", color: "#FFF8E7" }}
                >
                  Find us here
                </h3>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 group-hover:bg-[#F5A623]"
                      style={{ backgroundColor: "#1B7A3D", color: "#FFF8E7" }}
                    >
                      <SocialIcon label={s.label} />
                    </span>
                    <div>
                      <p className="text-xs" style={{ fontFamily: "var(--font-body)", color: "#7F8C8D" }}>
                        {s.label}
                      </p>
                      <p
                        className="text-sm font-semibold transition-colors duration-200 group-hover:text-[#F5A623]"
                        style={{ fontFamily: "var(--font-body)", color: "#FFF8E7" }}
                      >
                        {s.handle}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
