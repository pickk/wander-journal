import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { getAuthor } from "@/lib/authors";

export default function PostCard({ post }: { post: Post }) {
  const author = getAuthor(post.author);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all hover:border-amber-300 hover:shadow-lg dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-700">
      <Link href={`/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-amber-800 backdrop-blur dark:bg-stone-900/90 dark:text-amber-400">
          {post.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-serif text-xl font-bold leading-snug text-stone-900 dark:text-stone-50">
          <Link href={`/${post.slug}`} className="transition-colors hover:text-amber-700 dark:hover:text-amber-400">
            {post.title}
          </Link>
        </h2>

        <p className="mt-2 line-clamp-2 text-sm text-stone-600 dark:text-stone-400">
          {post.excerpt}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500 dark:text-stone-400">
          <span>{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} /> {post.readingTime}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} /> {post.location}
          </span>
        </div>

        {author && (
          <div className="mt-4 flex items-center gap-2 border-t border-stone-100 pt-4 dark:border-stone-800">
            {author.avatar && (
              <Image
                src={author.avatar}
                alt={author.name}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full object-cover"
              />
            )}
            <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
              {author.name}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
