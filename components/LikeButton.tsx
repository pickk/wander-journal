"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function LikeButton({ slug }: { slug: string }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem("likes") || "{}") as Record<string, number>;
    setCount(likes[slug] || 0);
    const userLikes = JSON.parse(localStorage.getItem("user-likes") || "[]") as string[];
    setLiked(userLikes.includes(slug));
  }, [slug]);

  const toggle = () => {
    const likes = JSON.parse(localStorage.getItem("likes") || "{}") as Record<string, number>;
    const userLikes = JSON.parse(localStorage.getItem("user-likes") || "[]") as string[];
    let nextCount: number;
    let nextUser: string[];

    if (userLikes.includes(slug)) {
      nextCount = Math.max(0, (likes[slug] || 0) - 1);
      nextUser = userLikes.filter((s) => s !== slug);
      setLiked(false);
    } else {
      nextCount = (likes[slug] || 0) + 1;
      nextUser = [...userLikes, slug];
      setLiked(true);
    }

    likes[slug] = nextCount;
    localStorage.setItem("likes", JSON.stringify(likes));
    localStorage.setItem("user-likes", JSON.stringify(nextUser));
    setCount(nextCount);
  };

  return (
    <button
      onClick={toggle}
      aria-label={liked ? "Unlike" : "Like"}
      className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-rose-300 hover:text-rose-600 dark:border-stone-700 dark:text-stone-300 dark:hover:border-rose-700 dark:hover:text-rose-400"
    >
      <Heart
        size={18}
        className={liked ? "fill-rose-500 text-rose-500" : ""}
      />
      <span>{liked ? "Liked" : "Like"}</span>
      <span className="text-xs text-stone-400 dark:text-stone-500">({count})</span>
    </button>
  );
}
