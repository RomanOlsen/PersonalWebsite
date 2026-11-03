import type { HabitDay } from "@/lib/habits";
import { formatDate, parseLocalDate } from "@/lib/date";

interface Cell {
  date: string | null;
  value: number;
}

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const LEVEL_ALPHA: Record<1 | 2, number> = {
  1: 0.45,
  2: 1,
};

function buildWeeks(days: HabitDay[]): Cell[][] {
  if (days.length === 0) return [];

  const leadingEmpty = parseLocalDate(days[0].date).getDay();
  const cells: Cell[] = [
    ...Array.from({ length: leadingEmpty }, () => ({ date: null, value: -1 })),
    ...days.map((day) => ({ date: day.date, value: day.value })),
  ];
  while (cells.length % 7 !== 0) {
    cells.push({ date: null, value: -1 });
  }

  const weeks: Cell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function cellColor(value: number, accent: string): string {
  if (value === 1 || value === 2) {
    return hexToRgba(accent, LEVEL_ALPHA[value]);
  }
  return "var(--border)";
}

function cellLabel(value: number): string {
  if (value === 2) return "Level 2";
  if (value === 1) return "Level 1";
  return "no entry";
}

const MIN_WEEKS_BETWEEN_LABELS = 3;

function buildMonthMarkers(weeks: Cell[][]): (string | null)[] {
  let lastMonth = -1;
  let lastLabelIndex = -Infinity;
  return weeks.map((week, weekIndex) => {
    const firstRealCell = week.find((cell) => cell.date);
    if (!firstRealCell?.date) return null;
    const month = parseLocalDate(firstRealCell.date).getMonth();
    if (
      month !== lastMonth &&
      weekIndex - lastLabelIndex >= MIN_WEEKS_BETWEEN_LABELS
    ) {
      lastMonth = month;
      lastLabelIndex = weekIndex;
      return MONTH_LABELS[month];
    }
    lastMonth = month;
    return null;
  });
}

export function Heatmap({
  days,
  color,
}: {
  days: HabitDay[];
  color: string;
}) {
  const weeks = buildWeeks(days);
  const monthMarkers = buildMonthMarkers(weeks);

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex flex-col gap-1">
        <div className="flex gap-[3px] pl-0 text-[10px] text-muted">
          {monthMarkers.map((label, i) => (
            <div key={i} className="w-[11px] shrink-0">
              {label}
            </div>
          ))}
        </div>
        <div className="flex gap-[3px]">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((cell, dayIndex) => (
                <div
                  key={dayIndex}
                  title={
                    cell.date
                      ? `${formatDate(cell.date)} — ${cellLabel(cell.value)}`
                      : undefined
                  }
                  className="h-[11px] w-[11px] shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor:
                      cell.value === -1 ? "transparent" : cellColor(cell.value, color),
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeatmapLegend({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-3 text-xs text-muted">
      {([1, 2] as const).map((level) => (
        <span key={level} className="flex items-center gap-1.5">
          <span
            className="h-[11px] w-[11px] rounded-[2px]"
            style={{ backgroundColor: hexToRgba(color, LEVEL_ALPHA[level]) }}
          />
          Level {level}
        </span>
      ))}
    </div>
  );
}
