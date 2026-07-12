export interface TimelineStep {
  id: string;
  label: string;
  timestampLabel: string;
}

export interface TimelineProps {
  steps: TimelineStep[];
  /** Index step terakhir yang sudah "tercapai" — dikasih warna aktif. Default: semua step dianggap tercapai. */
  activeUntilIndex?: number;
}

/**
 * Timeline vertikal (dot + garis penghubung + label + waktu) — dipakai
 * di detail pengajuan surat untuk riwayat status. Generik, bisa dipakai
 * ulang di fitur lain yang butuh tampilan riwayat berurutan (mis.
 * approval timeline versi guru nanti).
 */
export function Timeline({ steps, activeUntilIndex }: TimelineProps) {
  const lastActiveIndex = activeUntilIndex ?? steps.length - 1;

  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => {
        const isActive = index <= lastActiveIndex;
        const isLast = index === steps.length - 1;

        return (
          <li key={step.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={
                  "flex size-3 shrink-0 rounded-full " +
                  (isActive ? "bg-primary" : "bg-border")
                }
                aria-hidden="true"
              />
              {!isLast && (
                <span
                  className={
                    "w-px flex-1 " + (isActive ? "bg-primary/40" : "bg-border")
                  }
                  aria-hidden="true"
                />
              )}
            </div>
            <div className={isLast ? "pb-0" : "pb-4"}>
              <p className="font-heading text-body-sm font-semibold text-text-primary">
                {step.label}
              </p>
              <p className="text-caption text-text-secondary">
                {step.timestampLabel}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
