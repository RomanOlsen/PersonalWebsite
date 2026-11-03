export interface HabitDay {
  date: string; // YYYY-MM-DD
  value: 0 | 1 | 2; // 0 = no entry, 1 = Level 1, 2 = Level 2
}

export interface Habit {
  id: "morning" | "night";
  name: string;
  description: string;
  color: string; // hex accent color for this habit's heatmap
}

export const habits: Habit[] = [
  {
    id: "morning",
    name: "Morning Routine",
    description: "Tracked each morning.",
    color: "#d97706",
  },
  {
    id: "night",
    name: "Night Routine",
    description: "Tracked each night.",
    color: "#4f46e5",
  },
];

export function currentStreak(days: HabitDay[]): number {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].value > 0) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export function totalCompletions(days: HabitDay[]): number {
  return days.filter((day) => day.value > 0).length;
}
