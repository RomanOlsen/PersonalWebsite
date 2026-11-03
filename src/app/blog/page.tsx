import Link from "next/link";
import { posts } from "@/lib/blog";
import { formatDate } from "@/lib/date";

export default function BlogPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
        <p className="text-sm text-muted">Placeholder posts for now.</p>
      </div>

      <div className="flex flex-col divide-y divide-border">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-1 py-5 first:pt-0"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-base font-medium group-hover:text-accent">
                {post.title}
              </h2>
              <time className="shrink-0 text-xs text-muted">
                {formatDate(post.date)}
              </time>
            </div>
            <p className="text-sm text-muted">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
