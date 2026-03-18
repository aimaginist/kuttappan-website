import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Kuttappan is human-directed, AI-powered animation by AImaginist Studio.",
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
