import type { HabitDay } from "@/lib/habits";
import { addDays, formatLocalDate, parseLocalDate, toBoiseDateString } from "@/lib/date";
import { supabase } from "@/lib/supabase";

interface RoutineRow {
  date: string;
  isLevel1: boolean | null;
  isMorning: boolean | null;
}

const WEEKS = 53;

export interface RoutineHeatmaps {
  morning: HabitDay[];
  night: HabitDay[];
  error: boolean;
}

function buildDateWindow(weeks: number): string[] {
  const anchor = parseLocalDate(toBoiseDateString(new Date()));
  const currentWeekStart = addDays(anchor, -anchor.getDay());
  // Start exactly `weeks` Sunday-aligned columns back, so the window is
  // always `weeks` full columns wide (the last one partial, ending today).
  const start = addDays(currentWeekStart, -(weeks - 1) * 7);

  const dates: string[] = [];
  for (let cursor = start; cursor <= anchor; cursor = addDays(cursor, 1)) {
    dates.push(formatLocalDate(cursor));
  }
  return dates;
}

function buildGrid(
  dates: string[],
  levelsByDate: Map<string, 1 | 2>
): HabitDay[] {
  return dates.map((date) => ({
    date,
    value: levelsByDate.get(date) ?? 0,
  }));
}

export async function fetchRoutineHeatmaps(): Promise<RoutineHeatmaps> {
  const dates = buildDateWindow(WEEKS);
  const windowStart = dates[0];

  const { data, error } = await supabase
    .from("routine")
    .select("date, isLevel1, isMorning")
    .gte("date", windowStart);

  if (error || !data) {
    const empty = buildGrid(dates, new Map());
    return { morning: empty, night: empty, error: true };
  }

  const morningLevels = new Map<string, 1 | 2>();
  const nightLevels = new Map<string, 1 | 2>();

  for (const row of data as RoutineRow[]) {
    if (row.isMorning === null) continue;

    const level: 1 | 2 = row.isLevel1 ? 1 : 2;
    const bucket = row.isMorning ? morningLevels : nightLevels;

    const existing = bucket.get(row.date);
    if (!existing || level > existing) {
      bucket.set(row.date, level);
    }
  }

  return {
    morning: buildGrid(dates, morningLevels),
    night: buildGrid(dates, nightLevels),
    error: false,
  };
}
