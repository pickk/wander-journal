import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPaginatedPosts, getAllPosts, POSTS_PER_PAGE } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";

export function generateStaticParams() {
  const all = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE));
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export default async function PaginationPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const resolved = await params;
  const page = parseInt(resolved.page, 10);
  if (isNaN(page) || page < 2) notFound();

  const { posts, totalPages } = getPaginatedPosts(page);
  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-800 dark:text-amber-400"
      >
        <ArrowLeft size={15} /> Back home
      </Link>
      <h1 className="mb-8 font-serif text-3xl font-bold text-stone-900 dark:text-stone-50">
        All Articles — Page {page}
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} basePath="/page" />
    </div>
  );
}
