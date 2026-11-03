export interface App {
  name: string;
  description: string;
  href: string;
}

export const apps: App[] = [
  {
    name: "Habit Heatmap",
    description: "The habit tracker on this very site.",
    href: "/habits",
  },
];
