import Hero from "@/components/sections/Hero";
import CharacterSpotlight from "@/components/sections/CharacterSpotlight";
import WorldTeaser from "@/components/sections/WorldTeaser";
import EpisodePreview from "@/components/sections/EpisodePreview";
import Newsletter from "@/components/sections/Newsletter";

function WaveDivider({ from, to }: { from: string; to: string }) {
  return (
    <div className="relative overflow-hidden leading-none" style={{ backgroundColor: to }}>
      <svg
        viewBox="0 0 1440 64"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height: 64, display: "block" }}
      >
        <path
          d="M0 0 C240 64 480 0 720 32 C960 64 1200 0 1440 32 L1440 0 L0 0 Z"
          fill={from}
        />
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────── */}
      <Hero />

      {/* ── WAVE: cream → cream (visual breath before world teaser) ── */}
      <WaveDivider from="#FFF8E7" to="#FFF8E7" />

      {/* ── WORLD TEASER ───────────────────────────────── */}
      <WorldTeaser />

      {/* ── WAVE: cream → cream ────────────────────────── */}
      <WaveDivider from="#FFF8E7" to="#FFF8E7" />

      {/* ── CHARACTER SPOTLIGHT ────────────────────────── */}
      <CharacterSpotlight />

      {/* ── WAVE: cream → green-bg ─────────────────────── */}
      <WaveDivider from="#FFF8E7" to="#E8F5EC" />

      {/* ── EPISODE PREVIEW ────────────────────────────── */}
      <EpisodePreview />

      {/* ── WAVE: green-bg → mango-yellow ──────────────── */}
      <WaveDivider from="#E8F5EC" to="#F5A623" />

      {/* ── NEWSLETTER ─────────────────────────────────── */}
      <Newsletter />
    </>
  );
}
