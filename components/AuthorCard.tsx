import Link from "next/link";
import Image from "next/image";
import type { Author } from "@/lib/authors";
import { getInitials } from "@/lib/utils";

export default function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:flex-row sm:items-center dark:border-stone-800 dark:bg-stone-900/50">
      <Link href={`/author/${author.slug}`} className="shrink-0">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-700 font-serif text-lg font-bold text-white">
            {getInitials(author.name)}
          </div>
        )}
      </Link>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          {author.role}
        </p>
        <Link
          href={`/author/${author.slug}`}
          className="font-serif text-lg font-bold text-stone-900 hover:text-amber-700 dark:text-stone-50 dark:hover:text-amber-400"
        >
          {author.name}
        </Link>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
          {author.bio}
        </p>
        <p className="mt-2 text-xs text-stone-500 dark:text-stone-500">
          Based in {author.location}
        </p>
      </div>
    </div>
  );
}
