"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X, Compass } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/category/destinations", label: "Destinations" },
  { href: "/category/guides", label: "Guides" },
  { href: "/category/travelogues", label: "Travelogues" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/70 bg-white/80 backdrop-blur-md dark:border-stone-800/70 dark:bg-stone-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-stone-900 dark:text-stone-50">
          <Compass className="h-6 w-6 text-amber-700 dark:text-amber-500" />
          <span className="font-serif text-xl font-bold tracking-tight">
            Wander Journal
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-100 hover:text-amber-700 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-amber-400"
          >
            <Search size={18} />
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-100 md:hidden dark:text-stone-300 dark:hover:bg-stone-800"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-stone-200 px-4 py-3 md:hidden dark:border-stone-800">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-800"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
