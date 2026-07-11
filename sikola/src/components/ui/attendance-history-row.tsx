import { StatusBadge } from "@/components/ui/status-badge";
import type { AttendanceHistoryEntry } from "@/types/attendance";

export interface AttendanceHistoryRowProps {
  entry: AttendanceHistoryEntry;
}

const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const STATUS_TITLE: Record<AttendanceHistoryEntry["status"], string> = {
  hadir: "Hadir",
  izin: "Izin",
  sakit: "Sakit",
  alpa: "Alpa",
  terlambat: "Terlambat",
};

/**
 * Satu baris riwayat absensi: kotak tanggal + status + jam masuk-pulang.
 * Beda dari <ScheduleRow> (domain jadwal pelajaran) meski tampilannya
 * mirip — keduanya sengaja komponen terpisah karena field & tipe
 * datanya berbeda (ScheduleItem vs AttendanceHistoryEntry).
 */
export function AttendanceHistoryRow({ entry }: AttendanceHistoryRowProps) {
  const [, month, day] = entry.date.split("-").map(Number);
  const hasTimes = entry.checkInTime && entry.checkOutTime;

  return (
    <li className="flex items-center gap-3 rounded-2xl bg-white/50 px-3 py-3">
      <div className="flex w-12 shrink-0 flex-col items-center rounded-xl bg-primary-light py-1.5 text-primary">
        <span className="font-heading text-body-lg font-bold leading-none">
          {day}
        </span>
        <span className="text-caption">{MONTH_SHORT[month - 1]}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-heading text-body-base font-semibold text-text-primary">
          {STATUS_TITLE[entry.status]}
        </p>
        <p className="text-caption text-text-secondary">
          {hasTimes
            ? `${entry.checkInTime} - ${entry.checkOutTime} WIB`
            : "Tidak ada catatan jam"}
        </p>
      </div>
      <StatusBadge status={entry.status} />
    </li>
  );
}
