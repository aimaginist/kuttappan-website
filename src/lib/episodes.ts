import episodeData from '../data/episodes.json';

export type Episode = {
  videoId: string;
  slug: string;
  title: string;
  description: string;
  synopsis: string;
  publishedAt: string;
  duration: number | null;
  thumbnail: string;
  playlistIds: string[];
  playlistNames: string[];
  isShort: boolean;
};

export const episodes = (episodeData as Episode[])
  .filter((episode) => !episode.isShort)
  .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

export const clips = (episodeData as Episode[])
  .filter((episode) => episode.isShort)
  .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

export function formatEpisodeDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function formatDuration(seconds: number | null) {
  if (!seconds) return null;
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
}

export function splitEpisodeTitle(title: string) {
  const parts = title.split(/\s(?:\||—|–)\s/).map((part) => part.trim()).filter(Boolean);
  const malayalam = parts.find((part) => /[\u0D00-\u0D7F]/.test(part));
  if (!malayalam) return {primary: title, secondary: null};
  const english = parts.find((part) => !/[\u0D00-\u0D7F]/.test(part));
  return {
    primary: malayalam || parts[0] || title,
    secondary: malayalam && english ? english : null,
  };
}
