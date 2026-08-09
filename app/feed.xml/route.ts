import { Feed } from "feed";
import { getAllPosts } from "@/lib/posts";
import { getAuthor } from "@/lib/authors";

export async function GET() {
  const siteUrl = "https://wander-journal.example.com";
  const posts = getAllPosts();

  const feed = new Feed({
    title: "Wander Journal",
    description:
      "Slow, intentional travel stories — destinations, guides, and travelogues from around the world.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    image: `${siteUrl}/logo.png`,
    copyright: `© ${new Date().getFullYear()} Wander Journal`,
    updated: posts[0] ? new Date(posts[0].date) : new Date(),
    feedLinks: {
      rss: `${siteUrl}/feed.xml`,
    },
    author: {
      name: "Wander Journal",
      link: siteUrl,
    },
  });

  for (const post of posts) {
    const author = getAuthor(post.author);
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/${post.slug}`,
      link: `${siteUrl}/${post.slug}`,
      description: post.excerpt,
      content: post.excerpt,
      date: new Date(post.date),
      image: post.coverImage,
      category: post.tags.map((t) => ({ name: t })),
      author: author
        ? [{ name: author.name, link: `${siteUrl}/author/${author.slug}` }]
        : undefined,
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
