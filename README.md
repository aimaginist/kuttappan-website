# Kuttappan — Official Website

> **Big Plans. Bigger Fails. Biggest Heart.**

The official brand website for **Kuttappan**, a 3D animated kids series set in a 1990s Kerala village.

---

## Tech Stack

| Layer      | Technology |
|------------|-----------|
| Framework  | Next.js 16+ (App Router) |
| Language   | TypeScript |
| Styling    | Tailwind CSS v4 |
| Animation  | Framer Motion + CSS |
| Images     | next/image + sharp (processing) |
| Fonts      | Fredoka + Nunito (Google Fonts) |
| Deployment | Vercel |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start
```

---

## Pages

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/characters` | Meet the Gang |
| `/world` | The Village |
| `/episodes` | Adventures |
| `/about` | Our Story |

---

## Adding YouTube Episodes

When episodes go live, open `src/data/episodes.ts` and add the YouTube video ID:

```ts
{ number: 1, youtubeId: "dQw4w9WgXcQ", ... }
```

The episode card automatically switches from "Coming Soon" to a "Watch Now" button with modal player.

---

## Brand

- **Primary color:** Kerala Green `#1B7A3D`
- **Accent:** Mango Yellow `#F5A623`
- **Background:** Warm Cream `#FFF8E7`
- **Fonts:** Fredoka (display) + Nunito (body)
- **Tagline:** *Big Plans. Bigger Fails. Biggest Heart.*

---

## Deployment

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Framework: Next.js (auto-detected) → Deploy
4. Add `kuttappan.in` in Vercel → Settings → Domains
5. DNS: A record `76.76.21.21` + CNAME `www` → `cname.vercel-dns.com`

---

**AImaginist Studio** · [aimaginist.studio](https://aimaginist.studio)

*Human-directed, AI-powered animation.*
