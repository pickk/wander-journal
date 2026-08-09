"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Send, Trash2 } from "lucide-react";

type Comment = {
  id: string;
  name: string;
  text: string;
  date: string;
};

export default function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const key = `comments-${slug}`;
    const stored = JSON.parse(localStorage.getItem(key) || "[]") as Comment[];
    setComments(stored);
  }, [slug]);

  const persist = (next: Comment[]) => {
    setComments(next);
    localStorage.setItem(`comments-${slug}`, JSON.stringify(next));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const comment: Comment = {
      id: crypto.randomUUID(),
      name: name.trim(),
      text: text.trim(),
      date: new Date().toISOString(),
    };
    persist([comment, ...comments]);
    setName("");
    setText("");
  };

  const remove = (id: string) => {
    persist(comments.filter((c) => c.id !== id));
  };

  return (
    <section className="mt-12">
      <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-stone-900 dark:text-stone-50">
        <MessageSquare size={20} className="text-amber-700 dark:text-amber-400" />
        Comments ({comments.length})
      </h3>

      <form onSubmit={submit} className="mt-6 space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-50"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts..."
          rows={3}
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-50"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-800"
        >
          <Send size={15} /> Post Comment
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Be the first to share your thoughts.
          </p>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white">
                    {c.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                    {c.name}
                  </span>
                </div>
                <button
                  onClick={() => remove(c.id)}
                  aria-label="Delete comment"
                  className="text-stone-400 transition-colors hover:text-rose-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">{c.text}</p>
              <p className="mt-2 text-xs text-stone-400">
                {new Date(c.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
