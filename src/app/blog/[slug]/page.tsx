import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/blog";
import { formatDate } from "@/lib/date";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="flex flex-col gap-6">
      <Link href="/blog" className="text-sm text-muted hover:text-foreground">
        ← Back to blog
      </Link>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          {post.title}
        </h1>
        <time className="text-xs text-muted">{formatDate(post.date)}</time>
      </div>
      <p className="text-base leading-7 text-muted">
        {post.excerpt} This post is a placeholder — real content will go
        here once the blog is wired up to actual content.
      </p>
    </article>
  );
}
