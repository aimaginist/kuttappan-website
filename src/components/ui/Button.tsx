"use client";

import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "outline";
type Size    = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  target?: string;
  rel?: string;
}

const variantStyles = {
  primary:   { bg: "#1B7A3D", color: "#FFF8E7", border: "transparent",  hoverBg: "#156130", hoverColor: "#FFF8E7" },
  secondary: { bg: "#F5A623", color: "#0D3B1F", border: "transparent",  hoverBg: "#C4851C", hoverColor: "#0D3B1F" },
  accent:    { bg: "#C0392B", color: "#FFF8E7", border: "transparent",  hoverBg: "#9A2E22", hoverColor: "#FFF8E7" },
  outline:   { bg: "transparent", color: "#1B7A3D", border: "#1B7A3D", hoverBg: "#1B7A3D", hoverColor: "#FFF8E7" },
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  href,
  className = "",
  target,
  rel,
}: ButtonProps) {
  const s = variantStyles[variant];
  const base = `inline-flex items-center justify-center rounded-full font-bold tracking-wide transition-all duration-200 hover:scale-105 active:scale-100 border-2 ${sizeClasses[size]} ${className}`;
  const style = { backgroundColor: s.bg, color: s.color, borderColor: s.border, fontFamily: "var(--font-body)" };

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.backgroundColor = s.hoverBg;
    el.style.color = s.hoverColor;
    if (variant === "outline") el.style.borderColor = s.hoverBg;
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.backgroundColor = s.bg;
    el.style.color = s.color;
    el.style.borderColor = s.border;
  };

  if (href) {
    return (
      <Link href={href} className={base} style={style} target={target} rel={rel}
        onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={base} style={style}
      onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {children}
    </button>
  );
}
