"use client";

import { useState } from "react";
import { Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";

export default function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/${slug}` : `/${slug}`;

  const share = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const links: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };
    window.open(links[platform], "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm font-medium text-stone-500 dark:text-stone-400">
        Share
      </span>
      <button
        onClick={() => share("twitter")}
        aria-label="Share on Twitter/X"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-colors hover:border-amber-300 hover:text-amber-700 dark:border-stone-700 dark:text-stone-300 dark:hover:border-amber-700 dark:hover:text-amber-400"
      >
        <Twitter size={16} />
      </button>
      <button
        onClick={() => share("facebook")}
        aria-label="Share on Facebook"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-colors hover:border-amber-300 hover:text-amber-700 dark:border-stone-700 dark:text-stone-300 dark:hover:border-amber-700 dark:hover:text-amber-400"
      >
        <Facebook size={16} />
      </button>
      <button
        onClick={() => share("linkedin")}
        aria-label="Share on LinkedIn"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-colors hover:border-amber-300 hover:text-amber-700 dark:border-stone-700 dark:text-stone-300 dark:hover:border-amber-700 dark:hover:text-amber-400"
      >
        <Linkedin size={16} />
      </button>
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-colors hover:border-amber-300 hover:text-amber-700 dark:border-stone-700 dark:text-stone-300 dark:hover:border-amber-700 dark:hover:text-amber-400"
      >
        {copied ? <Check size={16} className="text-green-600" /> : <Link2 size={16} />}
      </button>
    </div>
  );
}
