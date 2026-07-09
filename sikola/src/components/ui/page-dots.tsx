import { cn } from "@/lib/utils";

export interface PageDotsProps {
  count: number;
  activeIndex: number;
  className?: string;
}

/**
 * Indikator titik halaman (dipakai di Onboarding). Dot aktif digambar lebih
 * lebar mengikuti pola umum carousel mobile.
 */
export function PageDots({ count, activeIndex, className }: PageDotsProps) {
  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      role="tablist"
      aria-label="Halaman onboarding"
    >
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          role="tab"
          aria-selected={index === activeIndex}
          className={cn(
            "h-2 rounded-full transition-all",
            index === activeIndex ? "w-6 bg-primary" : "w-2 bg-border"
          )}
        />
      ))}
    </div>
  );
}
