"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, MapPin, X } from "lucide-react";
import { formatDate, slugify } from "@/lib/utils";

type SearchPost = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  category: string;
  date: string;
  readingTime: string;
  location: string;
  coverImage: string;
  authorName: string;
  authorSlug: string;
};

function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

function scorePost(query: string, post: SearchPost): number {
  const q = query.toLowerCase();
  let score = 0;
  if (post.title.toLowerCase().includes(q)) score += 10;
  if (post.excerpt.toLowerCase().includes(q)) score += 5;
  if (post.category.toLowerCase().includes(q)) score += 3;
  if (post.tags.some((t) => t.toLowerCase().includes(q))) score += 4;
  if (post.authorName.toLowerCase().includes(q)) score += 2;
  if (post.location.toLowerCase().includes(q)) score += 2;
  return score;
}

export default function SearchView({ posts }: { posts: SearchPost[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return posts.slice(0, 6);
    const scored = posts
      .filter((p) => {
        const haystack = `${p.title} ${p.excerpt} ${p.tags.join(" ")} ${p.category} ${p.authorName} ${p.location}`;
        return fuzzyMatch(query, haystack);
      })
      .map((p) => ({ post: p, score: scorePost(query, p) }))
      .sort((a, b) => b.score - a.score);
    return scored.map((s) => s.post);
  }, [query, posts]);

  return (
    <div>
      <div className="relative mb-8">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
          size={20}
        />
        <input
          type="text"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations, guides, stories..."
          className="w-full rounded-full border border-stone-200 bg-white py-4 pl-12 pr-12 text-base text-stone-900 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-50"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <p className="mb-6 text-sm text-stone-500 dark:text-stone-400">
        {query
          ? `${results.length} ${results.length === 1 ? "result" : "results"} for "${query}"`
          : `${posts.length} articles available`}
      </p>

      {results.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-serif text-xl text-stone-700 dark:text-stone-300">
            No articles found.
          </p>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            Try a different search term.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="group flex gap-5 rounded-2xl border border-stone-200 bg-white p-4 transition-all hover:border-amber-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-700"
            >
              <div className="relative hidden h-24 w-32 shrink-0 overflow-hidden rounded-xl sm:block">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="128px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  {post.category}
                </span>
                <h3 className="mt-1 font-serif text-lg font-bold text-stone-900 group-hover:text-amber-700 dark:text-stone-50 dark:group-hover:text-amber-400">
                  {post.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-stone-600 dark:text-stone-400">
                  {post.excerpt}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500 dark:text-stone-400">
                  <span>{formatDate(post.date)}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} /> {post.readingTime}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={11} /> {post.location}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
