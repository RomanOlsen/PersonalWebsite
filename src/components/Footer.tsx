import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-3xl px-6 py-8 text-sm text-muted">
      © {new Date().getFullYear()} {siteConfig.name}
    </footer>
  );
}
