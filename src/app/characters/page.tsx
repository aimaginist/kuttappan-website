import type { Metadata } from "next";
import Image from "next/image";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { characters, expressions } from "@/data/characters";

export const metadata: Metadata = {
  title: "Meet the Gang",
  description:
    "Meet Kuttappan, Shambhu, and Pakru — the trio whose plans never work but whose friendship always does.",
};

function TraitBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-sm font-semibold border-2"
      style={{
        fontFamily: "var(--font-body)",
        borderColor: "#1B7A3D",
        color: "#1B7A3D",
        backgroundColor: "transparent",
      }}
    >
      {label}
    </span>
  );
}

export default function CharactersPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 min-h-64 flex flex-col items-center justify-center"
        style={{ backgroundColor: "#1B7A3D" }}>
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h1
              className="text-5xl md:text-6xl lg:text-7xl mb-4"
              style={{ fontFamily: "var(--font-display)", color: "#FFF8E7" }}
            >
              The Gang
            </h1>
            <p
              className="text-lg md:text-xl"
              style={{ fontFamily: "var(--font-body)", color: "#F5A623" }}
            >
              Every great plan needs a team. Even if the plan never works.
            </p>
          </div>
        </ScrollReveal>

        {/* Characters peeking at bottom */}
        <div className="flex justify-center items-end gap-4 md:gap-8 mt-10 relative z-10">
          {[
            { src: "/images/characters/shambhu-hero.webp",        alt: "Shambhu",   w: 160, delay: 0.15 },
            { src: "/images/characters/kuttappan-full-front.webp", alt: "Kuttappan", w: 200, delay: 0    },
            { src: "/images/characters/pakru-hero.webp",           alt: "Pakru",     w: 160, delay: 0.3  },
          ].map((char) => (
            <div
              key={char.alt}
              className="relative"
              style={{ width: char.w, animation: `charRise 0.8s ease ${char.delay}s both` }}
            >
              <Image
                src={char.src}
                alt={char.alt}
                width={char.w}
                height={Math.round(char.w * 1.4)}
                priority
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes charRise {
            from { opacity: 0; transform: translateY(40px); }
            to   { opacity: 1; transform: none; }
          }
        `}</style>
      </section>

      {/* ── CHARACTER PROFILES ────────────────────────── */}
      <div className="flex flex-col">
        {characters.map((char, i) => {
          const isEven = i % 2 === 0;
          const bg = isEven ? "#FFF8E7" : "#E8F5EC";
          return (
            <section key={char.name} className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: bg }}>
              <div className="max-w-6xl mx-auto">
                <ScrollReveal direction={isEven ? "left" : "right"}>
                  <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center`}>

                    {/* Image */}
                    <div className="w-full md:w-2/5 flex-shrink-0">
                      <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "3/4" }}>
                        <Image
                          src={char.image}
                          alt={char.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1 flex flex-col gap-5">
                      <div>
                        <p
                          className="text-sm font-bold uppercase tracking-widest mb-1"
                          style={{ fontFamily: "var(--font-body)", color: "#F5A623" }}
                        >
                          {char.role}
                        </p>
                        <h2
                          className="text-4xl md:text-5xl"
                          style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}
                        >
                          {char.name}
                        </h2>
                        <span className="block h-1 w-10 rounded-full mt-2" style={{ backgroundColor: "#F5A623" }} />
                      </div>

                      <p
                        className="text-lg leading-relaxed"
                        style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}
                      >
                        {char.description}
                      </p>

                      {/* Trait badges */}
                      <div className="flex flex-wrap gap-2">
                        {char.traits.map((t) => <TraitBadge key={t} label={t} />)}
                      </div>

                      {/* Expression gallery (Kuttappan only) */}
                      {char.name === "Kuttappan" && (
                        <div>
                          <p
                            className="text-xs font-bold uppercase tracking-widest mb-3"
                            style={{ fontFamily: "var(--font-body)", color: "#7F8C8D" }}
                          >
                            Expression Range
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            {expressions.map((expr) => (
                              <div
                                key={expr.name}
                                title={expr.name}
                                className="relative w-14 h-14 rounded-full overflow-hidden border-2"
                                style={{ borderColor: "#1B7A3D" }}
                              >
                                <Image
                                  src={expr.src}
                                  alt={expr.name}
                                  fill
                                  sizes="56px"
                                  className="object-cover object-top"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
