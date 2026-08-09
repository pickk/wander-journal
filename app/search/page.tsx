import { getAllPosts } from "@/lib/posts";
import { getAuthor } from "@/lib/authors";
import SearchView from "@/components/SearchView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across all travel stories on Wander Journal.",
};

export default function SearchPage() {
  const posts = getAllPosts().map((p) => {
    const author = getAuthor(p.author);
    return {
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      tags: p.tags,
      category: p.category,
      date: p.date,
      readingTime: p.readingTime,
      location: p.location,
      coverImage: p.coverImage,
      authorName: author?.name || p.author,
      authorSlug: p.author,
    };
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-2 font-serif text-4xl font-bold text-stone-900 dark:text-stone-50">
        Search
      </h1>
      <p className="mb-8 text-stone-600 dark:text-stone-400">
        Find your next adventure across all our travel stories.
      </p>
      <SearchView posts={posts} />
    </div>
  );
}
