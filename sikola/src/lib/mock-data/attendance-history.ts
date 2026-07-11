import type {
  AttendanceHistoryEntry,
  AttendanceStatus,
  MonthlyAttendanceStats,
} from "@/types/attendance";

const MONTH_LABEL = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

/** "2026-07" -> "Juli 2026" */
export function formatMonthLabel(yearMonth: string): string {
  const [year, month] = yearMonth.split("-").map(Number);
  return `${MONTH_LABEL[month - 1]} ${year}`;
}

/** Bulan berjalan saat ini dalam format "YYYY-MM", dibaca dari jam client. */
export function getCurrentYearMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function addMonths(yearMonth: string, delta: number): string {
  const [year, month] = yearMonth.split("-").map(Number);
  const date = new Date(year, month - 1 + delta, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

/**
 * Status dummy deterministik berdasarkan tanggal (BUKAN Math.random() —
 * sengaja, supaya hasilnya sama persis setiap kali dipanggil, tidak ada
 * risiko hydration mismatch antara render server & client).
 */
function pseudoStatusForDay(day: number): AttendanceStatus {
  if (day % 17 === 0) return "alpa";
  if (day % 13 === 0) return "sakit";
  if (day % 11 === 0) return "izin";
  if (day % 7 === 0) return "terlambat";
  return "hadir";
}

/**
 * Riwayat absensi dummy untuk satu bulan (hari kerja Senin-Jumat saja,
 * dan tidak melebihi hari ini kalau bulan yang diminta adalah bulan
 * berjalan). Diurutkan dari yang TERBARU ke terlama.
 *
 * Nanti diganti `attendanceService.getHistory(yearMonth)` — bentuk
 * return (AttendanceHistoryEntry[]) tetap sama, pemanggil (halaman
 * Riwayat Kehadiran) tidak perlu berubah.
 */
/**
 * Batas awal data kehadiran tersedia (mis. awal tahun ajaran / siswa
 * baru terdaftar). Bulan sebelum ini sengaja mengembalikan array kosong
 * — selain lebih realistis, ini juga membuat empty state di halaman
 * Riwayat Kehadiran bisa benar-benar dicoba (klik "bulan sebelumnya"
 * berkali-kali sampai lewat batas ini).
 */
const HISTORY_AVAILABLE_FROM = "2026-01";

export function getMockAttendanceHistory(
  yearMonth: string
): AttendanceHistoryEntry[] {
  if (yearMonth < HISTORY_AVAILABLE_FROM) return [];

  const [year, month] = yearMonth.split("-").map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const entries: AttendanceHistoryEntry[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay(); // 0=Minggu, 6=Sabtu
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;
    if (date > today) continue;

    const status = pseudoStatusForDay(day);
    const hasCheckIn = status === "hadir" || status === "terlambat";

    entries.push({
      id: `att-${yearMonth}-${String(day).padStart(2, "0")}`,
      date: `${yearMonth}-${String(day).padStart(2, "0")}`,
      status,
      checkInTime: hasCheckIn
        ? status === "terlambat"
          ? "07:35"
          : "07:02"
        : undefined,
      checkOutTime: hasCheckIn ? "15:30" : undefined,
    });
  }

  return entries.reverse();
}

/**
 * Hitung MonthlyAttendanceStats (tipe yang SAMA dipakai Dashboard) dari
 * daftar riwayat — supaya <MonthlyAttendanceStatsCard> bisa dipakai ulang
 * apa adanya di halaman Riwayat Kehadiran tanpa modifikasi.
 */
export function computeMonthlyStatsFromHistory(
  entries: AttendanceHistoryEntry[]
): MonthlyAttendanceStats {
  const breakdown = { hadir: 0, izin: 0, sakit: 0, alpa: 0 };
  let terlambatCount = 0;

  for (const entry of entries) {
    if (entry.status === "terlambat") {
      terlambatCount += 1;
      breakdown.hadir += 1;
    } else if (entry.status in breakdown) {
      breakdown[entry.status as keyof typeof breakdown] += 1;
    }
  }

  const totalHariEfektif = entries.length;
  const percentage =
    totalHariEfektif === 0
      ? 0
      : Math.round((breakdown.hadir / totalHariEfektif) * 100);

  return { percentage, breakdown, totalHariEfektif, terlambatCount };
}
