import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Button from "@/components/ui/Button";
import EpisodeBadge from "@/components/ui/EpisodeBadge";

const episodes = [
  { number: 1, title: "Kuttappan & The Mango Heist",  thumbnail: "/images/episodes/ep01.webp" },
  { number: 2, title: "Kuttappan & The School Day",   thumbnail: "/images/episodes/ep02.webp" },
  { number: 3, title: "Kuttappan & The Big Race",     thumbnail: "/images/episodes/ep03.webp" },
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
              <div
                className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ backgroundColor: "#FFF8E7", borderTop: "3px solid #1B7A3D" }}
              >
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
                  <h3 className="text-lg leading-snug"
                    style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}>
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
