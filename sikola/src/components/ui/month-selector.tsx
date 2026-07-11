import { ChevronLeft, ChevronRight } from "lucide-react";

export interface MonthSelectorProps {
  label: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  isNextDisabled?: boolean;
}

/**
 * Navigasi bulan (< Juli 2026 >). Generik supaya bisa dipakai ulang di
 * halaman lain yang butuh filter bulan serupa (mis. Rekap Absensi guru).
 */
export function MonthSelector({
  label,
  onPrevMonth,
  onNextMonth,
  isNextDisabled = false,
}: MonthSelectorProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/60 px-2 py-1.5">
      <button
        type="button"
        onClick={onPrevMonth}
        aria-label="Bulan sebelumnya"
        className="flex size-9 items-center justify-center rounded-xl text-primary hover:bg-white/80"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <span className="font-heading text-body-base font-semibold text-text-primary">
        {label}
      </span>
      <button
        type="button"
        onClick={onNextMonth}
        disabled={isNextDisabled}
        aria-label="Bulan berikutnya"
        className="flex size-9 items-center justify-center rounded-xl text-primary hover:bg-white/80 disabled:opacity-30"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}
