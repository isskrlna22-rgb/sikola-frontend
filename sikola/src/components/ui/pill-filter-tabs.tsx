import { cn } from "@/lib/utils";

export interface PillFilterOption<T extends string> {
  value: T;
  label: string;
}

export interface PillFilterTabsProps<T extends string> {
  options: PillFilterOption<T>[];
  selected: T;
  onSelect: (value: T) => void;
  className?: string;
}

/**
 * Tab filter pill generik (bukan spesifik hari seperti <DayFilterTabs>).
 * Dipakai di Pengumuman untuk filter kategori (Semua/Sekolah/Kelas/
 * Personal), dan bisa dipakai ulang untuk filter apa pun berbentuk
 * pilihan tunggal dari daftar string.
 */
export function PillFilterTabs<T extends string>({
  options,
  selected,
  onSelect,
  className,
}: PillFilterTabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label="Filter"
      className={cn("flex gap-2 overflow-x-auto pb-1", className)}
    >
      {options.map((option) => {
        const isActive = option.value === selected;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(option.value)}
            className={cn(
              "shrink-0 rounded-2xl px-4 py-2 text-body-sm font-semibold transition-colors",
              isActive
                ? "bg-primary text-white shadow-sm"
                : "bg-white/60 text-text-secondary hover:bg-white/80"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
