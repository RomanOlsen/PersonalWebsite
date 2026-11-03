import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Hi, I&apos;m {siteConfig.name.split(" ")[0]}.
        </h1>
        <p className="max-w-xl text-base leading-7 text-muted">
          This is my little corner of the internet — where I track habits,
          write things down, and share small apps I&apos;ve built.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <HomeCard
          href="/habits"
          title="Habits"
          description="Daily habit heatmaps."
        />
        <HomeCard
          href="/blog"
          title="Blog"
          description="Notes and writing."
        />
        <HomeCard
          href="/apps"
          title="Apps"
          description="Things I've built."
        />
      </section>
    </div>
  );
}

function HomeCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-1 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent"
    >
      <span className="text-sm font-medium">{title}</span>
      <span className="text-sm text-muted">{description}</span>
    </Link>
  );
}
