import type { HabitDay } from "@/lib/habits";
import { addDays, formatLocalDate, parseLocalDate, toBoiseDateString } from "@/lib/date";
import { supabase } from "@/lib/supabase";

interface RoutineRow {
  date: string;
  isLevel1: boolean | null;
  isMorning: boolean | null;
}

const START_DATE = "2026-09-17";

export interface RoutineHeatmaps {
  morning: HabitDay[];
  night: HabitDay[];
  error: boolean;
}

function buildDateWindow(): string[] {
  const start = parseLocalDate(START_DATE);
  const anchor = parseLocalDate(toBoiseDateString(new Date()));

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
  const dates = buildDateWindow();

  const { data, error } = await supabase
    .from("routine")
    .select("date, isLevel1, isMorning")
    .gte("date", START_DATE);

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
