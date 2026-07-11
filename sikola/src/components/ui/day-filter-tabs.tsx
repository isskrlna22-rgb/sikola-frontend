import type { DayOfWeek } from "@/types/schedule";
import { DAY_OF_WEEK_LABEL } from "@/types/schedule";
import { cn } from "@/lib/utils";

export interface DayFilterTabsProps {
  days: DayOfWeek[];
  selected: DayOfWeek;
  onSelect: (day: DayOfWeek) => void;
  /** Tandai satu hari sebagai "hari ini" dengan titik kecil di bawah label. */
  todayDay?: DayOfWeek | null;
  className?: string;
}

/**
 * Tab filter hari (Senin-Jumat). Generik lewat prop `days` supaya bisa
 * dipakai ulang di halaman lain yang butuh filter mingguan serupa (mis.
 * Rekap Absensi guru nanti).
 */
export function DayFilterTabs({
  days,
  selected,
  onSelect,
  todayDay,
  className,
}: DayFilterTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter hari"
      className={cn("flex gap-2 overflow-x-auto pb-1", className)}
    >
      {days.map((day) => {
        const isActive = day === selected;
        return (
          <button
            key={day}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(day)}
            className={cn(
              "flex shrink-0 flex-col items-center gap-1 rounded-2xl px-4 py-2 text-body-sm font-semibold transition-colors",
              isActive
                ? "bg-primary text-white shadow-sm"
                : "bg-white/60 text-text-secondary hover:bg-white/80"
            )}
          >
            {DAY_OF_WEEK_LABEL[day]}
            {todayDay === day && (
              <span
                className={cn(
                  "size-1 rounded-full",
                  isActive ? "bg-white" : "bg-primary"
                )}
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
