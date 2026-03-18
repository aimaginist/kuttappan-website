export default function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute top-4 right-4 md:right-10 opacity-10"
        style={{ animation: "float-slow 7s ease-in-out infinite" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/brand/decorations/coconut-palm.svg" alt="" width={80} height={160} />
      </div>
      <div
        className="absolute top-24 left-8 opacity-[0.08] hidden md:block"
        style={{ animation: "float 5s ease-in-out infinite 1s" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/brand/decorations/mango.svg" alt="" width={40} height={56} />
      </div>
      <div
        className="absolute bottom-32 right-24 opacity-[0.08] hidden md:block"
        style={{ animation: "float 4s ease-in-out infinite 2s" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/brand/decorations/mango.svg" alt="" width={30} height={42} />
      </div>
    </div>
  );
}
