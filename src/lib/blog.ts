export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
}

export const posts: BlogPost[] = [
  {
    slug: "the-traditional-college-scam-explained",
    title: "the traditional college scam explained",
    excerpt: "why doing college the traditional way is a massive scam, but college itself isnt, and how to hack it in your favor",
    date: "2026-11-03",
  },
  {
    slug: "why-balance-is-more-important-than-ever-for-success",
    title: "Why balance is more important than ever for success",
    excerpt: "why balance is actually important",
    date: "2026-11-03",
  },
  {
    slug: "why-i-removed-my-personal-social-medias",
    title: "why i removed my personal social medias",
    excerpt: "realization that no one is paying attention to you, school work got 1000x easier",
    date: "2026-11-03",
  },
  {
    slug: "my-plan-to-use-short-form-to-get-people-off-of-it",
    title: "my plan to use short-form content to get people off of it",
    excerpt: "sharing my utilitarian philosophy that drives the purpose of my businesses",
    date: "2026-11-03",
  },

];
