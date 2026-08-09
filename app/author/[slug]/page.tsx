import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin } from "lucide-react";
import { getAllAuthors, getAuthor } from "@/lib/authors";
import { getPostsByAuthor as getPostsByAuthorSlug } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { getInitials } from "@/lib/utils";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return {
    title: author.name,
    description: author.bio,
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const posts = getPostsByAuthorSlug(slug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-800 dark:text-amber-400"
      >
        <ArrowLeft size={15} /> Back home
      </Link>

      <div className="mb-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            width={120}
            height={120}
            className="h-28 w-28 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-amber-700 font-serif text-3xl font-bold text-white">
            {getInitials(author.name)}
          </div>
        )}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            {author.role}
          </p>
          <h1 className="mt-1 font-serif text-4xl font-bold text-stone-900 dark:text-stone-50">
            {author.name}
          </h1>
          <p className="mt-2 max-w-xl text-stone-600 dark:text-stone-400">
            {author.bio}
          </p>
          <p className="mt-3 inline-flex items-center gap-1 text-sm text-stone-500 dark:text-stone-400">
            <MapPin size={14} /> {author.location}
          </p>
        </div>
      </div>

      <h2 className="mb-6 font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">
        Articles by {author.name}
      </h2>

      {posts.length === 0 ? (
        <p className="text-stone-500 dark:text-stone-400">No articles yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
