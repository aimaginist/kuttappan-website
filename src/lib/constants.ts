// ─── BRAND COLORS ─────────────────────────────────────────────────────────────
export const COLORS = {
  // Primary
  keralaGreen:        "#1B7A3D",
  mangoYellow:        "#F5A623",
  terracottaRed:      "#C0392B",
  skyBlue:            "#2980B9",
  warmCream:          "#FFF8E7",

  // Extended
  deepForest:         "#0D3B1F",
  jackfruitOrange:    "#E67E22",
  coconutBrown:       "#6D4C41",
  bananaLeaf:         "#27AE60",
  monsoonGray:        "#7F8C8D",
  softBlack:          "#1A1A1A",

  // Tints
  keralaGreenTint:    "#49955F",
  mangoYellowTint:    "#F7B84F",
  terracottaRedTint:  "#CD6155",
  skyBlueTint:        "#5499C7",

  // Background tints
  keralaGreenBg:      "#E8F5EC",
  mangoYellowBg:      "#FEF5E4",
  terracottaRedBg:    "#F9EBEA",
  skyBlueBg:          "#EBF5FB",

  // Shades
  keralaGreenShade:   "#156130",
  mangoYellowShade:   "#C4851C",
  terracottaRedShade: "#9A2E22",
  skyBlueShade:       "#216694",
} as const;

// ─── TAGLINES ──────────────────────────────────────────────────────────────────
export const TAGLINES = {
  primary:   "Big Plans. Bigger Fails. Biggest Heart.",
  episodes:  "Every plan. Every disaster. Every laugh.",
  global:    "From the village to the world.",
  teaser:    "What could go wrong?",
  intro:     "Kuttappan has a plan.",
  trailer:   "The boy. The plan. The chaos.",
} as const;

// ─── SOCIAL LINKS ──────────────────────────────────────────────────────────────
export const SOCIAL = {
  youtube:   { handle: "@Kuttappan",           url: "https://youtube.com/@Kuttappan" },
  instagram: { handle: "@kuttappan.official",   url: "https://instagram.com/kuttappan.official" },
  tiktok:    { handle: "@kuttappan",            url: "https://tiktok.com/@kuttappan" },
  twitter:   { handle: "@KuttappanShow",        url: "https://x.com/KuttappanShow" },
} as const;

// ─── STUDIO INFO ───────────────────────────────────────────────────────────────
export const STUDIO = {
  name:      "AImaginist Studio",
  url:       "https://aimaginist.studio",
  credit:    "Human-directed, AI-powered animation by AImaginist Studio",
  copyright: `© ${new Date().getFullYear()} AImaginist Studio. All rights reserved.`,
} as const;

// ─── NAVIGATION ────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "Characters", href: "/characters" },
  { label: "World",      href: "/world" },
  { label: "Episodes",   href: "/episodes" },
  { label: "About",      href: "/about" },
] as const;

// ─── BRAND META ────────────────────────────────────────────────────────────────
export const BRAND = {
  name:    "Kuttappan",
  domain:  "kuttappan.in",
  siteUrl: "https://kuttappan.in",
} as const;
