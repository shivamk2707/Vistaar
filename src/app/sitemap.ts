import type { MetadataRoute } from "next";

const SITE = "https://vistaar.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/services",
    "/method",
    "/insights",
    "/contact",
    "/privacy",
    "/terms",
  ];
  const now = new Date();
  return routes.map((r) => ({
    url: `${SITE}${r}`,
    lastModified: now,
    changeFrequency: r === "/" ? "weekly" : "monthly",
    priority: r === "/" ? 1 : 0.7,
  }));
}
