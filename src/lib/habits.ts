export interface HabitDay {
  date: string; // YYYY-MM-DD
  value: number; // 0 = not done, 1-3 = intensity
}

export interface Habit {
  id: string;
  name: string;
  description: string;
  color: string; // hex accent color for this habit's heatmap
  completionRate: number; // 0-1, used only for mock data generation
}

export const habits: Habit[] = [
  {
    id: "reading",
    name: "Reading",
    description: "At least 20 minutes of reading.",
    color: "#4f46e5",
    completionRate: 0.72,
  },
  {
    id: "exercise",
    name: "Exercise",
    description: "Any workout, run, or long walk.",
    color: "#059669",
    completionRate: 0.6,
  },
  {
    id: "writing",
    name: "Writing",
    description: "Journaling or working on the blog.",
    color: "#d97706",
    completionRate: 0.45,
  },
];

// Deterministic pseudo-random generator so server and client render
// identical mock data without relying on Math.random().
function hashStringToSeed(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function seededRandom(seed: number): number {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function toDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Generates `weeks` worth of daily mock data ending today, oldest first. */
export function generateMockHabitData(habit: Habit, weeks = 53): HabitDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalDays = weeks * 7;
  const days: HabitDay[] = [];

  for (let i = totalDays - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = toDateString(date);

    const roll = seededRandom(hashStringToSeed(`${habit.id}-${dateStr}`));
    let value = 0;
    if (roll < habit.completionRate) {
      const intensityRoll = seededRandom(
        hashStringToSeed(`${habit.id}-${dateStr}-intensity`)
      );
      value = intensityRoll < 0.5 ? 1 : intensityRoll < 0.8 ? 2 : 3;
    }

    days.push({ date: dateStr, value });
  }

  return days;
}

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
