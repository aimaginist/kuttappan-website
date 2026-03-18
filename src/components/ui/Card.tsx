import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface CardProps {
  image: { src: string; alt: string };
  title: string;
  description: string;
  badge?: string;
  href?: string;
  hoverEffect?: boolean;
  footer?: ReactNode;
}

export default function Card({ image, title, description, badge, href, hoverEffect = true, footer }: CardProps) {
  const inner = (
    <div
      className={`group relative rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 ${
        hoverEffect ? "hover:-translate-y-1 hover:shadow-xl" : ""
      }`}
      style={{ backgroundColor: "#FFF8E7", borderTop: "3px solid #1B7A3D" }}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-500 ${hoverEffect ? "group-hover:scale-105" : ""}`}
        />
        {badge && (
          <span
            className="absolute top-3 right-3 w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ fontFamily: "var(--font-display)", backgroundColor: "#1B7A3D", color: "#FFF8E7" }}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-6 flex-1">
        <h3 className="text-xl leading-snug" style={{ fontFamily: "var(--font-display)", color: "#1B7A3D" }}>
          {title}
        </h3>
        <p className="text-base leading-relaxed flex-1" style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}>
          {description}
        </p>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );

  if (href) return <Link href={href} className="block h-full">{inner}</Link>;
  return inner;
}
