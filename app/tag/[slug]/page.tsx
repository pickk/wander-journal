import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";
import { getAllPosts, getPostsByTag } from "@/lib/posts";
import { slugify } from "@/lib/utils";
import PostCard from "@/components/PostCard";
import type { Metadata } from "next";

export function generateStaticParams() {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tags.add(slugify(t))));
  return Array.from(tags).map((tag) => ({ slug: tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Articles tagged "${slug}"`,
    description: `Browse all travel stories tagged with ${slug}.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getPostsByTag(slug);
  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-800 dark:text-amber-400"
      >
        <ArrowLeft size={15} /> Back home
      </Link>
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
          <Tag size={22} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Tag
          </p>
          <h1 className="font-serif text-3xl font-bold capitalize text-stone-900 dark:text-stone-50">
            {slug.replace(/-/g, " ")}
          </h1>
        </div>
      </div>
      <p className="mb-8 text-sm text-stone-500 dark:text-stone-400">
        {posts.length} {posts.length === 1 ? "article" : "articles"}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
