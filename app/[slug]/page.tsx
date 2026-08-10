import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Calendar, ArrowLeft } from "lucide-react";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getTableOfContents,
  getAllSlugs,
} from "@/lib/posts";
import { getAuthor } from "@/lib/authors";
import { formatDate, slugify } from "@/lib/utils";
import type { Metadata } from "next";

import ArticleContent from "@/components/ArticleContent";
import AuthorCard from "@/components/AuthorCard";
import BookmarkButton from "@/components/BookmarkButton";
import CommentSection from "@/components/CommentSection";
import LikeButton from "@/components/LikeButton";
import ReadProgress from "@/components/ReadProgress";
import RelatedPosts from "@/components/RelatedPosts";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import NewsletterSignup from "@/components/NewsletterSignup";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.coverImage }],
      publishedTime: post.date,
      authors: [getAuthor(post.author)?.name || post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const author = getAuthor(post.author);
  const toc = getTableOfContents(post.content);
  const related = getRelatedPosts(post, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    author: author ? { "@type": "Person", name: author.name } : post.author,
    keywords: post.tags.join(", "),
  };

  return (
    <article>
      <ReadProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <header className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <Link
            href={`/category/${slugify(post.category)}`}
            className="text-xs font-semibold uppercase tracking-wider text-amber-700 hover:text-amber-800 dark:text-amber-400"
          >
            {post.category}
          </Link>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-stone-900 sm:text-5xl dark:text-stone-50">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-stone-600 dark:text-stone-400">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-stone-500 dark:text-stone-400">
            {author && (
              <Link href={`/author/${author.slug}`} className="flex items-center gap-2 hover:text-amber-700 dark:hover:text-amber-400">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <span className="font-medium text-stone-700 dark:text-stone-300">{author.name}</span>
              </Link>
            )}
            <span className="inline-flex items-center gap-1">
              <Calendar size={14} /> {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={14} /> {post.readingTime}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} /> {post.location}
            </span>
          </div>
        </div>
      </header>

      {/* Cover image */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative -mt-px aspect-[16/9] overflow-hidden rounded-b-2xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Body with TOC sidebar */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,680px)] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={toc} />
              <div className="mt-8 space-y-3">
                <BookmarkButton slug={post.slug} />
                <LikeButton slug={post.slug} />
              </div>
            </div>
          </aside>

          <div className="max-w-[680px]">
            <div className="lg:hidden mb-6 flex flex-wrap gap-3">
              <BookmarkButton slug={post.slug} />
              <LikeButton slug={post.slug} />
            </div>

            <ArticleContent content={post.content} />

            {/* Tags */}
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${slugify(tag)}`}
                  className="rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-600 transition-colors hover:border-amber-300 hover:text-amber-700 dark:border-stone-700 dark:text-stone-400 dark:hover:border-amber-700"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Share */}
            <div className="mt-8 border-y border-stone-200 py-6 dark:border-stone-800">
              <ShareButtons slug={post.slug} title={post.title} />
            </div>

            {/* Author */}
            {author && (
              <div className="mt-8">
                <AuthorCard author={author} />
              </div>
            )}

            {/* Comments */}
            <CommentSection slug={post.slug} />

            {/* Newsletter */}
            <div className="mt-12">
              <NewsletterSignup />
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-16 max-w-6xl">
          <RelatedPosts posts={related} />
        </div>
      </div>
    </article>
  );
}
