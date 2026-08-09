import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export default function Pagination({ currentPage, totalPages, basePath }: Props) {
  if (totalPages <= 1) return null;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  const hrefFor = (page: number) =>
    page === 1 ? basePath : `${basePath}/${page}`;

  return (
    <nav className="mt-12 flex items-center justify-between" aria-label="Pagination">
      <div>
        {prevPage !== null ? (
          <Link
            href={hrefFor(prevPage)}
            className="inline-flex items-center gap-1 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-amber-300 hover:text-amber-700 dark:border-stone-700 dark:text-stone-300 dark:hover:border-amber-700 dark:hover:text-amber-400"
          >
            <ChevronLeft size={16} /> Previous
          </Link>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-full border border-stone-200 px-4 py-2 text-sm text-stone-400 dark:border-stone-800 dark:text-stone-600">
            <ChevronLeft size={16} /> Previous
          </span>
        )}
      </div>

      <span className="text-sm text-stone-500 dark:text-stone-400">
        Page {currentPage} of {totalPages}
      </span>

      <div>
        {nextPage !== null ? (
          <Link
            href={hrefFor(nextPage)}
            className="inline-flex items-center gap-1 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-amber-300 hover:text-amber-700 dark:border-stone-700 dark:text-stone-300 dark:hover:border-amber-700 dark:hover:text-amber-400"
          >
            Next <ChevronRight size={16} />
          </Link>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-full border border-stone-200 px-4 py-2 text-sm text-stone-400 dark:border-stone-800 dark:text-stone-600">
            Next <ChevronRight size={16} />
          </span>
        )}
      </div>
    </nav>
  );
}
