import Image from "next/image";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section
      className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 text-center"
      style={{ backgroundColor: "#FFF8E7" }}
    >
      {/* Kuttappan thinking */}
      <div className="relative w-48 md:w-64 mb-8 animate-float">
        <Image
          src="/images/expressions/kuttappan-thinking.webp"
          alt="Kuttappan thinking"
          width={256}
          height={358}
          className="w-full h-auto object-contain drop-shadow-lg"
          priority
        />
      </div>

      <h1
        className="text-4xl md:text-5xl mb-4 max-w-xl"
        style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}
      >
        Looks like Kuttappan&apos;s plan went wrong again.
      </h1>

      <p
        className="text-lg max-w-md mb-8"
        style={{ fontFamily: "var(--font-body)", color: "#6D4C41" }}
      >
        The page you&apos;re looking for has wandered off &mdash; probably somewhere near the paddy fields.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant="primary" size="lg" href="/">Go Home</Button>
        <Button variant="secondary" size="md" href="/episodes">Watch Episodes</Button>
      </div>
    </section>
  );
}
