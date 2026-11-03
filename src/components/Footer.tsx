"use client";

import { useEffect, useState } from "react";
import { GitHubIcon, LinkedInIcon, YouTubeIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

const ICONS = {
  LinkedIn: LinkedInIcon,
  YouTube: YouTubeIcon,
  GitHub: GitHubIcon,
} as const;

function formatBoiseTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Boise",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function Footer() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatBoiseTime(new Date()));
    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="mx-auto flex w-full border-t border-border max-w-3xl items-center justify-between px-6 py-8">
      <span className="text-sm text-muted">
        {time ? `Boise - ${time}` : "Boise"}
      </span>
      <div className="flex items-center gap-4">
        {siteConfig.social.map((item) => {
          const Icon = ICONS[item.label as keyof typeof ICONS];
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="text-muted transition-colors hover:text-foreground"
            >
              <Icon className="h-5 w-5" />
            </a>
          );
        })}
      </div>
    </footer>
  );
}
