import Link from "next/link";
import { Compass, Mail, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 text-stone-900 dark:text-stone-50">
              <Compass className="h-6 w-6 text-amber-700 dark:text-amber-500" />
              <span className="font-serif text-lg font-bold">Wander Journal</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-stone-600 dark:text-stone-400">
              Slow, intentional travel stories from around the world — destinations,
              guides, and travelogues.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Explore
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/category/destinations" className="text-stone-600 hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-400">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/category/guides" className="text-stone-600 hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-400">
                  Travel Guides
                </Link>
              </li>
              <li>
                <Link href="/category/travelogues" className="text-stone-600 hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-400">
                  Travelogues
                </Link>
              </li>
              <li>
                <Link href="/feed.xml" className="text-stone-600 hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-400">
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Follow Along
            </h3>
            <div className="mt-3 flex gap-3">
              <a href="#" aria-label="Twitter" className="text-stone-500 hover:text-amber-700 dark:text-stone-400 dark:hover:text-amber-400">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-stone-500 hover:text-amber-700 dark:text-stone-400 dark:hover:text-amber-400">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Email" className="text-stone-500 hover:text-amber-700 dark:text-stone-400 dark:hover:text-amber-400">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-200 pt-6 text-center text-xs text-stone-500 dark:border-stone-800 dark:text-stone-400">
          © {new Date().getFullYear()} Wander Journal. Made for wanderers, by wanderers.
        </div>
      </div>
    </footer>
  );
}
