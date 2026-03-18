import Image from "next/image";
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
          <SectionHeading
            title="The Gang"
            subtitle="Every great plan needs a team."
            withAccent
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {characters.map((char, i) => (
            <ScrollReveal key={char.name} direction="up" delay={i * 0.15}>
              <Link
                href="/characters"
                className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ backgroundColor: "#FFF8E7", borderTop: "3px solid #1B7A3D" }}
              >
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
                  <p className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "#F5A623", fontFamily: "var(--font-body)" }}>
                    {char.role}
                  </p>
                  <h3 className="text-2xl" style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}>
                    {char.name}
                  </h3>
                  <p className="text-base italic" style={{ fontFamily: "var(--font-body)", color: "#6D4C41" }}>
                    &ldquo;{char.oneliner}&rdquo;
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
