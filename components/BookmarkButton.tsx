"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

export default function BookmarkButton({ slug }: { slug: string }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarks") || "[]") as string[];
    setBookmarked(stored.includes(slug));
    setCount(stored.length);
  }, [slug]);

  const toggle = () => {
    const stored = JSON.parse(localStorage.getItem("bookmarks") || "[]") as string[];
    let next: string[];
    if (stored.includes(slug)) {
      next = stored.filter((s) => s !== slug);
    } else {
      next = [...stored, slug];
    }
    localStorage.setItem("bookmarks", JSON.stringify(next));
    setBookmarked(next.includes(slug));
    setCount(next.length);
  };

  return (
    <button
      onClick={toggle}
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
      className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-amber-300 hover:text-amber-700 dark:border-stone-700 dark:text-stone-300 dark:hover:border-amber-700 dark:hover:text-amber-400"
    >
      {bookmarked ? (
        <BookmarkCheck size={18} className="text-amber-600 dark:text-amber-400" />
      ) : (
        <Bookmark size={18} />
      )}
      <span>{bookmarked ? "Saved" : "Save"}</span>
      {count > 0 && (
        <span className="text-xs text-stone-400 dark:text-stone-500">
          ({count})
        </span>
      )}
    </button>
  );
}
