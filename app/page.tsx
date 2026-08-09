import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { getAllPosts, getPaginatedPosts, getAllTags } from "@/lib/posts";
import { getAuthor } from "@/lib/authors";
import { formatDate } from "@/lib/utils";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";

export default function HomePage() {
  const { posts, totalPages } = getPaginatedPosts(1);
  const tags = getAllTags();
  const [featured, ...rest] = posts;
  const featuredAuthor = featured ? getAuthor(featured.author) : undefined;

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Wander Journal
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold leading-tight text-stone-900 sm:text-5xl dark:text-stone-50">
            Stories from the road, written slowly and intentionally.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-600 dark:text-stone-400">
            Destinations, guides, and travelogues from every corner of the globe —
            for travelers who prefer depth over speed.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Featured post */}
        {featured && (
          <section className="mb-16">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
              Featured Story
            </p>
            <article className="grid gap-8 md:grid-cols-2">
              <Link href={`/${featured.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </Link>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  {featured.category}
                </span>
                <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-stone-900 dark:text-stone-50">
                  <Link href={`/${featured.slug}`} className="hover:text-amber-700 dark:hover:text-amber-400">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-3 text-stone-600 dark:text-stone-400">
                  {featured.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500 dark:text-stone-400">
                  <span>{formatDate(featured.date)}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {featured.readingTime}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} /> {featured.location}
                  </span>
                </div>
                {featuredAuthor && (
                  <p className="mt-3 text-sm text-stone-700 dark:text-stone-300">
                    By <span className="font-medium">{featuredAuthor.name}</span>
                  </p>
                )}
                <Link
                  href={`/${featured.slug}`}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
                >
                  Read story <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          </section>
        )}

        {/* Grid of posts */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">
              Latest Articles
            </h2>
            {tags.length > 0 && (
              <div className="hidden flex-wrap gap-2 sm:flex">
                {tags.slice(0, 4).map(({ tag }) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-600 transition-colors hover:border-amber-300 hover:text-amber-700 dark:border-stone-700 dark:text-stone-400 dark:hover:border-amber-700"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <Pagination currentPage={1} totalPages={totalPages} basePath="/page" />
        </section>
      </div>
    </div>
  );
}
