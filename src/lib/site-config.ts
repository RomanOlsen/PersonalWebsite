export const siteConfig = {
  name: "Roman Olsen",
  description: "Personal site, habit tracker, and blog.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Habits", href: "/habits" },
    { label: "Blog", href: "/blog" },
    { label: "Apps", href: "/apps" },
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/romanolsen1/" },
    { label: "YouTube", href: "https://www.youtube.com/@romanonfire" },
    { label: "GitHub", href: "https://github.com/RomanOlsen" },
  ],
} as const;
