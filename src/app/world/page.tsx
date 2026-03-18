import type { Metadata } from "next";
import Image from "next/image";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "The Village",
  description:
    "Explore the 1990s Kerala village where Kuttappan's adventures come to life.",
};

export default function WorldPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-96 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/world/village-road-wide.webp"
            alt="Kerala village road"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(255,248,231,0.1) 0%, rgba(255,248,231,0.92) 100%)" }}
          />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-16 pt-40">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1
                className="text-5xl md:text-6xl lg:text-7xl mb-4"
                style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}
              >
                Welcome to the Village
              </h1>
              <p
                className="text-lg md:text-xl"
                style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}
              >
                Step into a 1990s Kerala village where every lane has a story and every afternoon is an adventure.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── LOCATION GRID ────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#FFF8E7" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((loc, i) => (
              <ScrollReveal key={loc.name} direction="up" delay={(i % 2) * 0.1} className={loc.span ? "md:col-span-2" : ""}>
                <div
                  className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ backgroundColor: "#FFF8E7", borderTop: "3px solid #1B7A3D" }}
                >
                  {/* Image */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: loc.span ? "21/9" : "16/9" }}
                  >
                    <Image
                      src={loc.image}
                      alt={loc.name}
                      fill
                      sizes={loc.span ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <h2
                      className="text-2xl md:text-3xl mb-3"
                      style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}
                    >
                      {loc.name}
                    </h2>
                    <p
                      className="text-base md:text-lg leading-relaxed"
                      style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}
                    >
                      {loc.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING QUOTE ────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#E8F5EC" }}>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-4">
            <p
              className="text-2xl md:text-3xl lg:text-4xl leading-snug"
              style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}
            >
              This village isn&apos;t just where the story happens. It&apos;s a character in its own right.
            </p>
            <span className="block h-1 w-10 rounded-full mx-auto" style={{ backgroundColor: "#F5A623" }} />
            <p
              className="text-lg"
              style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}
            >
              Every tree, every path, every red-tiled roof plays a part in Kuttappan&apos;s adventures.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
