import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { createElement } from "react";
import type { ReactNode } from "react";

function getTextFromNode(node: ReactNode): string {
  if (node === null || node === undefined) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextFromNode).join("");
  if (typeof node === "object" && "props" in (node as any)) {
    return getTextFromNode((node as any).props?.children);
  }
  return "";
}

async function CodeBlock({ children }: { children?: ReactNode }) {
  const child: any = Array.isArray(children) ? children[0] : children;
  const className: string = child?.props?.className || "";
  const match = /language-(\w+)/.exec(className);
  const lang = match ? match[1] : "text";
  const rawCode = getTextFromNode(child?.props?.children).replace(/\n$/, "");

  let highlighted = "";
  try {
    const { codeToHtml } = await import("shiki");
    highlighted = await codeToHtml(rawCode, {
      lang,
      themes: { light: "github-light", dark: "github-dark" },
    });
  } catch {
    highlighted = `<pre><code>${rawCode}</code></pre>`;
  }

  return (
    <div
      className="my-6 overflow-x-auto rounded-xl [&>pre]:!m-0 [&>pre]:!bg-stone-900 [&>pre]:!p-4 [&>pre]:!text-sm [&>pre]:dark:!bg-stone-950"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}

const mdxComponents = {
  h2: ({ children }: any) => {
    const text = getTextFromNode(children);
    const slug = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return (
      <h2
        id={slug}
        className="mt-12 scroll-mt-24 font-serif text-2xl font-bold text-stone-900 dark:text-stone-50"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }: any) => {
    const text = getTextFromNode(children);
    const slug = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return (
      <h3
        id={slug}
        className="mt-8 scroll-mt-24 font-serif text-xl font-bold text-stone-900 dark:text-stone-50"
      >
        {children}
      </h3>
    );
  },
  p: ({ children }: any) => (
    <p className="my-5 leading-[1.8] text-stone-700 dark:text-stone-300">
      {children}
    </p>
  ),
  a: ({ children, href }: any) => (
    <a
      href={href}
      className="font-medium text-amber-700 underline decoration-amber-300 underline-offset-2 hover:text-amber-800 dark:text-amber-400 dark:decoration-amber-700"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }: any) => (
    <ul className="my-5 list-disc space-y-2 pl-6 leading-[1.8] text-stone-700 dark:text-stone-300">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="my-5 list-decimal space-y-2 pl-6 leading-[1.8] text-stone-700 dark:text-stone-300">
      {children}
    </ol>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="my-6 border-l-4 border-amber-500 bg-amber-50/50 py-2 pl-5 font-serif text-lg italic text-stone-700 dark:border-amber-600 dark:bg-amber-950/20 dark:text-stone-300">
      {children}
    </blockquote>
  ),
  img: ({ src, alt }: any) => (
    <span className="my-8 block">
      <img
        src={src}
        alt={alt}
        className="w-full rounded-2xl"
      />
      {alt && (
        <span className="mt-2 block text-center text-xs text-stone-500 dark:text-stone-400">
          {alt}
        </span>
      )}
    </span>
  ),
  pre: CodeBlock,
  hr: () => <hr className="my-10 border-stone-200 dark:border-stone-800" />,
  strong: ({ children }: any) => (
    <strong className="font-semibold text-stone-900 dark:text-stone-100">
      {children}
    </strong>
  ),
  table: ({ children }: any) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }: any) => (
    <th className="border border-stone-200 bg-stone-50 px-4 py-2 text-left font-semibold dark:border-stone-700 dark:bg-stone-800">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="border border-stone-200 px-4 py-2 dark:border-stone-700">{children}</td>
  ),
};

export default function ArticleContent({ content }: { content: string }) {
  return (
    <div className="prose-custom max-w-none">
      <MDXRemote source={content} components={mdxComponents} />
    </div>
  );
}
