import { Heatmap } from "@/components/Heatmap";
import {
  currentStreak,
  generateMockHabitData,
  habits,
  totalCompletions,
} from "@/lib/habits";

export default function HabitsPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Habits</h1>
        <p className="text-sm text-muted">
          Daily tracking, visualized. Data shown here is a mock placeholder.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {habits.map((habit) => {
          const days = generateMockHabitData(habit);
          const streak = currentStreak(days);
          const total = totalCompletions(days);

          return (
            <div
              key={habit.id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h2 className="text-sm font-medium">{habit.name}</h2>
                  <p className="text-sm text-muted">{habit.description}</p>
                </div>
                <div className="flex gap-4 text-sm text-muted">
                  <span>{streak} day streak</span>
                  <span>{total} total</span>
                </div>
              </div>
              <Heatmap days={days} color={habit.color} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
