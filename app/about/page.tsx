import Link from "next/link";
import Image from "next/image";
import { Compass, Heart, Map } from "lucide-react";
import { getAllAuthors } from "@/lib/authors";
import NewsletterSignup from "@/components/NewsletterSignup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Wander Journal and the writers behind the stories.",
};

export default function AboutPage() {
  const authors = getAllAuthors();

  return (
    <div>
      <section className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            About
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-stone-900 sm:text-5xl dark:text-stone-50">
            We believe travel is best experienced slowly.
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="prose-custom max-w-none">
          <p className="text-lg leading-[1.8] text-stone-700 dark:text-stone-300">
            Wander Journal is an independent travel publication built around a
            simple idea: the best journeys aren't measured in countries visited
            or passport stamps collected, but in the moments of stillness, the
            unexpected conversations, and the slow unraveling of a place.
          </p>
          <p className="mt-5 leading-[1.8] text-stone-700 dark:text-stone-300">
            Founded by a small team of writers and photographers who have spent
            years on the road, we publish destinations guides, practical
            itineraries, and personal travelogues from every continent. Every
            story is written from first-hand experience — no press trips, no
            recycled content, no shortcuts.
          </p>

          <div className="my-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 p-6 text-center dark:border-stone-800">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                <Map size={22} />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50">
                Authentic Guides
              </h3>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                Tested itineraries written from real experience on the ground.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 p-6 text-center dark:border-stone-800">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                <Heart size={22} />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50">
                Honest Stories
              </h3>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                Travelogues that embrace both the magic and the mishaps.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 p-6 text-center dark:border-stone-800">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                <Compass size={22} />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50">
                Independent
              </h3>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                No sponsored posts. No influencer trips. Just real travel.
              </p>
            </div>
          </div>

          <h2 className="mt-12 font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">
            Our Writers
          </h2>
          <div className="mt-6 space-y-8">
            {authors.map((author) => (
              <Link
                key={author.slug}
                href={`/author/${author.slug}`}
                className="group flex flex-col items-start gap-4 rounded-2xl border border-stone-200 p-6 transition-colors hover:border-amber-300 sm:flex-row sm:items-center dark:border-stone-800 dark:hover:border-amber-700"
              >
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    {author.role}
                  </p>
                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-700 dark:text-stone-50 dark:group-hover:text-amber-400">
                    {author.name}
                  </h3>
                  <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                    {author.bio}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
}
