# Kuttappan

Static Astro website for Kuttappan, the Malayalam 3D animated comedy series from AImaginist Studio.

## Development

```bash
npm install
npm run dev
```

The episode sync prefers the YouTube Data API when `YOUTUBE_API_KEY` is present. Without a key, it uses the official channel RSS feed and enriches recent entries with duration data so Shorts stay out of the main episode collection.

The site serves web-optimized 720p video copies. Source-quality film exports stay in `public/media/video` for local production work and are pruned from the final deploy bundle after Astro builds.

```bash
npm run sync:episodes
npm run check
npm run build
```

## Deployment

The production repository is configured for Vercel with Astro output in `dist`. A scheduled GitHub Actions workflow refreshes `src/data/episodes.json`; when the feed changes, its commit triggers the connected Vercel deployment.

Add `YOUTUBE_API_KEY` as an optional GitHub Actions and hosting secret for complete upload and playlist data. Without it, the official channel RSS fallback remains active.

## Netlify alternative

`netlify.toml` builds the static site and runs `scheduled-rebuild` daily at 02:00 UTC. Configure these environment variables in Netlify:

- `YOUTUBE_API_KEY` for complete upload and playlist data
- `YOUTUBE_CHANNEL_ID` (defaults to the official Kuttappan channel)
- `NETLIFY_BUILD_HOOK` for the scheduled function to request a fresh deploy

The same build hook provides the manual rebuild path from Netlify.
