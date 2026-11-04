import Link from "next/link";
import { apps } from "@/lib/apps";

export default function AppsPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Apps</h1>
        <p className="text-sm text-muted">iOS</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {apps.map((app) => (
          <Link
            key={app.href}
            href={app.href}
            className="group flex flex-col gap-1 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent"
          >
            <span className="text-sm font-medium group-hover:text-accent">
              {app.name}
            </span>
            <span className="text-sm text-muted">{app.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
