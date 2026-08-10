import type { MetadataRoute } from "next";
import {
  getAllPosts,
  getAllTags,
  getAllCategories,
  POSTS_PER_PAGE,
} from "@/lib/posts";
import { getAllAuthors } from "@/lib/authors";
import { slugify } from "@/lib/utils";

const BASE_URL = "https://travel.eastlink-hub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const now = new Date();

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = getAllCategories().map(
    ({ category }) => ({
      url: `${BASE_URL}/category/${slugify(category)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  const tagUrls: MetadataRoute.Sitemap = getAllTags().map(({ tag }) => ({
    url: `${BASE_URL}/tag/${slugify(tag)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const authorUrls: MetadataRoute.Sitemap = getAllAuthors().map((author) => ({
    url: `${BASE_URL}/author/${author.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const pageUrls: MetadataRoute.Sitemap = Array.from({ length: totalPages }, (_, i) => i + 1).map(
    (page) => ({
      url: `${BASE_URL}/page/${page}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: page === 1 ? 1.0 : 0.7,
    })
  );

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  return [
    ...staticUrls,
    ...postUrls,
    ...categoryUrls,
    ...tagUrls,
    ...authorUrls,
    ...pageUrls,
  ];
}
