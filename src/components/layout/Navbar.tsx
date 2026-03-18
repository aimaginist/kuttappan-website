"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""}`}
        style={{ backgroundColor: "#1B7A3D" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="shrink-0">
              <span
                className="text-2xl md:text-3xl leading-none"
                style={{ fontFamily: "var(--font-display)", color: "#FFF8E7", letterSpacing: "0.02em" }}
              >
                KUTTAPPAN
              </span>
            </Link>

            <ul className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="relative pb-1 text-base font-semibold transition-colors duration-200"
                      style={{ fontFamily: "var(--font-body)", color: isActive ? "#F5A623" : "#FFF8E7" }}
                    >
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${isActive ? "opacity-100" : "opacity-0"}`}
                        style={{ backgroundColor: "#F5A623" }}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              className="md:hidden p-2 rounded-md"
              style={{ color: "#FFF8E7" }}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "#1B7A3D" }}
      >
        <ul className="flex flex-col items-center gap-10">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-4xl transition-colors duration-200"
                  style={{ fontFamily: "var(--font-display)", color: isActive ? "#F5A623" : "#FFF8E7" }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="h-16" />
    </>
  );
}
