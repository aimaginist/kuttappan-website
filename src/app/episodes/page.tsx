"use client";

import { useState } from "react";
import type { Episode } from "@/data/episodes";
import { episodes } from "@/data/episodes";
import Image from "next/image";
import { X } from "lucide-react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import EpisodeBadge from "@/components/ui/EpisodeBadge";

function EpisodeModal({ episode, onClose }: { episode: Episode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(13,59,31,0.85)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "#FFF8E7" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{ backgroundColor: "#1B7A3D", color: "#FFF8E7" }}
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <div style={{ aspectRatio: "16/9" }}>
          <iframe
            src={`https://www.youtube.com/embed/${episode.youtubeId}?autoplay=1`}
            title={episode.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl" style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}>
            {episode.title}
          </h3>
          <p className="mt-2 text-base" style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}>
            {episode.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function EpisodeCard({ episode, onWatch }: { episode: Episode; onWatch: () => void }) {
  return (
    <div
      className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ backgroundColor: "#FFF8E7", borderTop: "3px solid #1B7A3D" }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <Image
          src={episode.thumbnail}
          alt={episode.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <EpisodeBadge number={episode.number} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3
          className="text-xl leading-snug"
          style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}
        >
          {episode.title}
        </h3>
        <p
          className="text-sm leading-relaxed flex-1 line-clamp-3"
          style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}
        >
          {episode.description}
        </p>

        {episode.youtubeId ? (
          <button
            onClick={onWatch}
            className="w-full rounded-full py-2 font-bold text-sm transition-all duration-200 hover:scale-105"
            style={{ fontFamily: "var(--font-body)", backgroundColor: "#1B7A3D", color: "#FFF8E7" }}
          >
            Watch Now
          </button>
        ) : (
          <p
            className="text-sm italic text-center"
            style={{ fontFamily: "var(--font-body)", color: "#7F8C8D" }}
          >
            Coming Soon
          </p>
        )}
      </div>
    </div>
  );
}

export default function EpisodesPage() {
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 flex items-center"
        style={{ backgroundColor: "#F5A623", minHeight: "320px" }}
      >
        {/* Kuttappan scared — peeking right */}
        <div className="absolute bottom-0 right-0 hidden md:block pointer-events-none select-none" style={{ width: 200 }}>
          <Image
            src="/images/expressions/kuttappan-scared.webp"
            alt=""
            width={200}
            height={280}
            priority
            className="object-contain"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl mb-4"
            style={{ fontFamily: "var(--font-display)", color: "#0D3B1F" }}
          >
            Adventures
          </h1>
          <p
            className="text-lg md:text-xl font-semibold"
            style={{ fontFamily: "var(--font-body)", color: "#0D3B1F" }}
          >
            Every plan. Every disaster. Every laugh.
          </p>
        </div>
      </section>

      {/* ── EPISODE GRID ─────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#FFF8E7" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((ep, i) => (
              <ScrollReveal key={ep.number} direction="up" delay={(i % 3) * 0.1}>
                <EpisodeCard
                  episode={ep}
                  onWatch={() => setActiveEpisode(ep)}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Coming soon note */}
          <ScrollReveal delay={0.3}>
            <div
              className="mt-16 rounded-2xl p-8 text-center"
              style={{ backgroundColor: "#E8F5EC", border: "2px dashed #1B7A3D" }}
            >
              <p
                className="text-2xl mb-2"
                style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}
              >
                More adventures on the way!
              </p>
              <p
                className="text-base"
                style={{ fontFamily: "var(--font-body)", color: "#6D4C41" }}
              >
                Kuttappan has plans. Many, many plans. Subscribe to get notified when new episodes drop.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── MODAL ────────────────────────────────────── */}
      {activeEpisode && (
        <EpisodeModal episode={activeEpisode} onClose={() => setActiveEpisode(null)} />
      )}
    </>
  );
}
