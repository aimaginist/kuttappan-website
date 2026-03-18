import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kuttappan.in";
  return [
    { url: base,               lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/characters`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/world`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/episodes`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/about`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
