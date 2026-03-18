import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Adventures",
  description:
    "Watch Kuttappan's latest adventures — every plan, every disaster, every laugh.",
};

export default function EpisodesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
