export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
}

export const posts: BlogPost[] = [
  {
    slug: "hello-world",
    title: "Hello, world",
    excerpt: "The first post on this site — why I built it and what's next.",
    date: "2026-01-05",
  },
  {
    slug: "building-this-site",
    title: "Building this site",
    excerpt: "Notes on the Next.js + Tailwind setup behind this page.",
    date: "2026-01-12",
  },
];
