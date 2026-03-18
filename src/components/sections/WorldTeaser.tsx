import Image from "next/image";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/effects/ScrollReveal";

export default function WorldTeaser() {
  return (
    <section className="relative min-h-[480px] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/world/paddy-fields-wide.webp"
          alt="Kerala paddy fields at golden hour"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(255,248,231,0) 0%, rgba(255,248,231,0.65) 55%, rgba(255,248,231,0.98) 100%)" }}
        />
      </div>

      <div className="relative z-10 w-full pb-16 pt-48 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center flex flex-col gap-5">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl leading-tight"
              style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}
            >
              From the heart of a Kerala village&hellip;
            </h2>
            <p className="text-lg md:text-xl" style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}>
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
