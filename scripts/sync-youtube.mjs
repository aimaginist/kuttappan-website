import { XMLParser } from 'fast-xml-parser';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const channelId = process.env.YOUTUBE_CHANNEL_ID || 'UCVsm29a-aWtg8RKio3uHjTg';
const apiKey = process.env.YOUTUBE_API_KEY;
const cachePath = path.resolve('src/data/episodes.json');
const quiet = process.argv.includes('--quiet');

function log(message) {
  if (!quiet) console.log(`[youtube-sync] ${message}`);
}

function slugify(title, videoId) {
  const base = title
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, ' ')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .slice(0, 64)
    .replace(/-$/g, '');
  return `${base || 'episode'}-${videoId}`;
}

function cleanSynopsis(description = '') {
  const paragraphs = description
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !/^https?:\/\//i.test(line) && !/^#/i.test(line) && !/subscribe/i.test(line))
      .join(' ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/#\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim())
    .filter((paragraph) => paragraph.length >= 24 && !/^(?:watch|follow|credits?|about the channel)\b/i.test(paragraph));

  const cleaned = (paragraphs[0] || '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/#\S+/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleaned.length <= 240) return cleaned;
  const excerpt = cleaned.slice(0, 240);
  const sentenceEnd = Math.max(excerpt.lastIndexOf('.'), excerpt.lastIndexOf('!'), excerpt.lastIndexOf('?'));
  const wordEnd = excerpt.lastIndexOf(' ');
  return `${excerpt.slice(0, sentenceEnd > 100 ? sentenceEnd + 1 : Math.max(wordEnd, 1)).trim()}…`;
}

function parseDuration(value = '') {
  const match = value.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return null;
  return Number(match[1] || 0) * 3600 + Number(match[2] || 0) * 60 + Number(match[3] || 0);
}

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return response.json();
}

async function fetchAllPages(baseUrl) {
  const items = [];
  let pageToken = '';
  do {
    const url = new URL(baseUrl);
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const data = await getJson(url);
    items.push(...(data.items || []));
    pageToken = data.nextPageToken || '';
  } while (pageToken);
  return items;
}

async function fetchWatchDuration(videoId) {
  try {
    const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      signal: AbortSignal.timeout(12000),
      headers: {'accept-language': 'en-US,en;q=0.8'},
    });
    if (!response.ok) return null;
    const html = await response.text();
    const match = html.match(/"lengthSeconds":"(\d+)"/);
    return match ? Number(match[1]) : null;
  } catch {
    return null;
  }
}

async function fetchFromApi() {
  log('Using YouTube Data API v3.');
  const channelUrl = new URL('https://www.googleapis.com/youtube/v3/channels');
  channelUrl.search = new URLSearchParams({part: 'contentDetails', id: channelId, key: apiKey}).toString();
  const channel = await getJson(channelUrl);
  const uploadsId = channel.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsId) throw new Error('The uploads playlist was not returned for the configured channel.');

  const uploadUrl = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
  uploadUrl.search = new URLSearchParams({part: 'contentDetails', playlistId: uploadsId, maxResults: '50', key: apiKey}).toString();
  const uploadItems = await fetchAllPages(uploadUrl);
  const videoIds = uploadItems.map((item) => item.contentDetails?.videoId).filter(Boolean);

  const playlistUrl = new URL('https://www.googleapis.com/youtube/v3/playlists');
  playlistUrl.search = new URLSearchParams({part: 'snippet', channelId, maxResults: '50', key: apiKey}).toString();
  const playlists = await fetchAllPages(playlistUrl);
  const membership = new Map();

  for (const playlist of playlists) {
    const itemUrl = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    itemUrl.search = new URLSearchParams({part: 'contentDetails', playlistId: playlist.id, maxResults: '50', key: apiKey}).toString();
    const items = await fetchAllPages(itemUrl);
    for (const item of items) {
      const videoId = item.contentDetails?.videoId;
      if (!videoId) continue;
      const current = membership.get(videoId) || [];
      current.push({id: playlist.id, name: playlist.snippet?.title || 'Episodes'});
      membership.set(videoId, current);
    }
  }

  const videos = [];
  for (let index = 0; index < videoIds.length; index += 50) {
    const detailUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
    detailUrl.search = new URLSearchParams({part: 'snippet,contentDetails', id: videoIds.slice(index, index + 50).join(','), key: apiKey}).toString();
    const data = await getJson(detailUrl);
    videos.push(...(data.items || []));
  }

  return videos.map((video) => {
    const duration = parseDuration(video.contentDetails?.duration);
    const groups = membership.get(video.id) || [];
    const snippet = video.snippet || {};
    const description = snippet.description || '';
    return {
      videoId: video.id,
      slug: slugify(snippet.title || 'episode', video.id),
      title: snippet.title || 'Episode',
      description,
      synopsis: cleanSynopsis(description),
      publishedAt: snippet.publishedAt,
      duration,
      thumbnail: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.standard?.url || snippet.thumbnails?.high?.url,
      playlistIds: groups.map((group) => group.id),
      playlistNames: groups.map((group) => group.name),
      isShort: Boolean(
        (duration && duration < 60) ||
        /(?:#shorts|\bshorts\b)/i.test(`${snippet.title || ''} ${description}`) ||
        groups.some((group) => /shorts/i.test(group.name)),
      ),
    };
  });
}

async function fetchFromRss() {
  log('No API key found; using the official YouTube channel RSS fallback.');
  const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} from YouTube RSS`);
  const xml = await response.text();
  const parser = new XMLParser({ignoreAttributes: false, attributeNamePrefix: '@_'});
  const parsed = parser.parse(xml);
  const entries = parsed.feed?.entry ? (Array.isArray(parsed.feed.entry) ? parsed.feed.entry : [parsed.feed.entry]) : [];

  return Promise.all(entries.map(async (entry) => {
    const videoId = entry['yt:videoId'];
    const media = entry['media:group'] || {};
    const description = media['media:description'] || '';
    const title = entry.title || media['media:title'] || 'Episode';
    const duration = await fetchWatchDuration(videoId);
    return {
      videoId,
      slug: slugify(title, videoId),
      title,
      description,
      synopsis: cleanSynopsis(description),
      publishedAt: entry.published,
      duration,
      thumbnail: media['media:thumbnail']?.['@_url'] || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      playlistIds: [],
      playlistNames: [],
      isShort: Boolean(
        (duration !== null && duration < 60) ||
        /(?:#shorts|\bshorts\b)/i.test(`${title} ${description}`),
      ),
    };
  }));
}

async function readCache() {
  try {
    const data = JSON.parse(await readFile(cachePath, 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

try {
  const episodes = apiKey ? await fetchFromApi() : await fetchFromRss();
  if (!episodes.length) throw new Error('YouTube returned no episode data.');
  await mkdir(path.dirname(cachePath), {recursive: true});
  await writeFile(cachePath, `${JSON.stringify(episodes, null, 2)}\n`);
  log(`Wrote ${episodes.length} videos to ${path.relative(process.cwd(), cachePath)}.`);
} catch (error) {
  const cached = await readCache();
  if (!cached.length) throw error;
  console.error(`[youtube-sync] ERROR: ${error.message}`);
  console.error(`[youtube-sync] Using the last committed cache with ${cached.length} videos.`);
}
