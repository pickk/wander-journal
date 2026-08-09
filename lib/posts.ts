import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type Frontmatter = {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  category: string;
  author: string;
  coverImage: string;
  location: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  category: string;
  author: string;
  coverImage: string;
  location: string;
  readingTime: string;
  content: string;
  raw: string;
};

export type TocItem = {
  level: number;
  text: string;
  slug: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function ensureSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const fullPath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);
    const fm = data as Frontmatter;
    const stats = readingTime(content);

    return {
      slug,
      title: fm.title,
      date: fm.date,
      excerpt: fm.excerpt,
      tags: fm.tags || [],
      category: fm.category,
      author: fm.author,
      coverImage: fm.coverImage,
      location: fm.location,
      readingTime: stats.text,
      content,
      raw,
    } as Post;
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  posts.forEach((p) => {
    p.tags.forEach((t) => {
      map.set(t, (map.get(t) || 0) + 1);
    });
  });
  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllCategories(): { category: string; count: number }[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  posts.forEach((p) => {
    map.set(p.category, (map.get(p.category) || 0) + 1);
  });
  return Array.from(map.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) =>
    p.tags.some((t) => ensureSlug(t) === ensureSlug(tag))
  );
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(
    (p) => ensureSlug(p.category) === ensureSlug(category)
  );
}

export function getPostsByAuthor(authorSlug: string): Post[] {
  return getAllPosts().filter((p) => p.author === authorSlug);
}

export function getRelatedPosts(current: Post, limit = 3): Post[] {
  const all = getAllPosts().filter((p) => p.slug !== current.slug);
  const scored = all.map((p) => {
    let score = 0;
    if (p.category === current.category) score += 3;
    score += p.tags.filter((t) => current.tags.includes(t)).length * 2;
    return { post: p, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

export function getTableOfContents(content: string): TocItem[] {
  const headings: TocItem[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    headings.push({ level, text, slug: ensureSlug(text) });
  }
  return headings;
}

export const POSTS_PER_PAGE = 6;

export function getPaginatedPosts(page: number): { posts: Post[]; totalPages: number } {
  const all = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE));
  const start = (page - 1) * POSTS_PER_PAGE;
  const posts = all.slice(start, start + POSTS_PER_PAGE);
  return { posts, totalPages };
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
