"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { History as HistoryIcon } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { MonthSelector } from "@/components/ui/month-selector";
import { AttendanceHistoryRow } from "@/components/ui/attendance-history-row";
import { EmptyState } from "@/components/ui/empty-state";
import { MonthlyAttendanceStatsCard } from "@/components/shared/monthly-attendance-stats-card";
import {
  getMockAttendanceHistory,
  computeMonthlyStatsFromHistory,
  formatMonthLabel,
  getCurrentYearMonth,
  addMonths,
} from "@/lib/mock-data/attendance-history";

/** Fallback netral sebelum bulan asli diketahui di client (lihat useEffect). */
const FALLBACK_YEAR_MONTH = "2026-01";

/**
 * Halaman Riwayat Kehadiran. Sama seperti halaman Jadwal: bulan yang
 * ditampilkan default ke nilai netral dulu, baru dikoreksi ke bulan
 * sungguhan di useEffect (hindari hydration mismatch tanggal server vs
 * client).
 */
export default function RiwayatKehadiranPage() {
  const router = useRouter();
  const [currentYearMonth, setCurrentYearMonth] = useState(FALLBACK_YEAR_MONTH);
  const [selectedMonth, setSelectedMonth] = useState(FALLBACK_YEAR_MONTH);

  useEffect(() => {
    // Sengaja setState di effect (bukan lazy useState initializer) —
    // pola sama seperti DashboardHeader & halaman Jadwal, supaya render
    // pertama di server selalu netral dan bulan asli cuma dibaca di
    // client.
    const real = getCurrentYearMonth();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentYearMonth(real);
    setSelectedMonth(real);
  }, []);

  const history = getMockAttendanceHistory(selectedMonth);
  const stats = computeMonthlyStatsFromHistory(history);
  const isViewingCurrentMonth = selectedMonth === currentYearMonth;

  return (
    <div className="flex flex-1 flex-col pb-4">
      <PageHeader onBack={() => router.push("/dashboard")} title="Riwayat Absensi" />

      <div className="px-5 pt-4">
        <MonthlyAttendanceStatsCard stats={stats} />
      </div>

      <div className="px-5 pt-4">
        <MonthSelector
          label={formatMonthLabel(selectedMonth)}
          onPrevMonth={() => setSelectedMonth((m) => addMonths(m, -1))}
          onNextMonth={() => setSelectedMonth((m) => addMonths(m, 1))}
          isNextDisabled={isViewingCurrentMonth}
        />
      </div>

      <GlassCard as="section" className="mx-5 mt-4 p-4">
        {history.length === 0 ? (
          <EmptyState
            icon={<HistoryIcon className="size-6" aria-hidden="true" />}
            title="Belum Ada Riwayat"
            description={`Belum ada catatan kehadiran untuk ${formatMonthLabel(selectedMonth)}.`}
          />
        ) : (
          <ul className="flex flex-col gap-2">
            {history.map((entry) => (
              <AttendanceHistoryRow key={entry.id} entry={entry} />
            ))}
          </ul>
        )}
      </GlassCard>
    </div>
  );
}
