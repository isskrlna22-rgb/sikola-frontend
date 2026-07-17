"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { PillFilterTabs } from "@/components/ui/pill-filter-tabs";
import { MonthSelector } from "@/components/ui/month-selector";
import { StudentAttendanceRow } from "@/components/ui/student-attendance-row";
import { EmptyState } from "@/components/ui/empty-state";
import { TeacherClassRecapCard } from "@/components/shared/teacher-class-recap-card";
import { getMockTeacherClasses } from "@/lib/mock-data/teacher-dashboard";
import {
  getMockTeacherAttendanceRecap,
  getMockStudentAttendanceList,
} from "@/lib/mock-data/teacher-attendance";
import {
  formatMonthLabel,
  getCurrentYearMonth,
  addMonths,
} from "@/lib/mock-data/attendance-history";

const CLASSES = getMockTeacherClasses();
const FALLBACK_YEAR_MONTH = "2026-01";

/**
 * Rekap Kehadiran — statistik bulanan per kelas + ringkasan per siswa.
 * `MonthSelector`, `formatMonthLabel`, `getCurrentYearMonth`, `addMonths`
 * di-reuse APA ADANYA dari modul siswa (Riwayat Kehadiran) — murni
 * utilitas tanggal generik, read-only import, tidak menyentuh file
 * siswa sama sekali.
 *
 * Catatan: `getMockTeacherAttendanceRecap` saat ini TIDAK berubah
 * berdasarkan bulan yang dipilih (disederhanakan untuk dummy — lihat
 * TECH_DEBT.md). Kontrol bulan tetap fungsional secara UI/state supaya
 * gampang disambungkan ke data asli nanti.
 */
export default function RekapKehadiranPage() {
  const router = useRouter();
  const [selectedClassId, setSelectedClassId] = useState(CLASSES[0].id);
  const [currentYearMonth, setCurrentYearMonth] = useState(FALLBACK_YEAR_MONTH);
  const [selectedMonth, setSelectedMonth] = useState(FALLBACK_YEAR_MONTH);

  useEffect(() => {
    const real = getCurrentYearMonth();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sengaja, sama pola dengan Riwayat Kehadiran siswa (hindari hydration mismatch bulan server vs client).
    setCurrentYearMonth(real);
    setSelectedMonth(real);
  }, []);

  const recap = getMockTeacherAttendanceRecap(selectedClassId);
  const roster = getMockStudentAttendanceList(selectedClassId);
  const isViewingCurrentMonth = selectedMonth === currentYearMonth;

  return (
    <div className="animate-page-in flex flex-1 flex-col gap-4 pb-4">
      <PageHeader onBack={() => router.push("/guru/kehadiran")} title="Rekap Absensi" />

      <div className="px-5">
        <PillFilterTabs
          options={CLASSES.map((c) => ({ value: c.id, label: c.className }))}
          selected={selectedClassId}
          onSelect={setSelectedClassId}
        />
      </div>

      <div className="px-5">
        <MonthSelector
          label={formatMonthLabel(selectedMonth)}
          onPrevMonth={() => setSelectedMonth((m) => addMonths(m, -1))}
          onNextMonth={() => setSelectedMonth((m) => addMonths(m, 1))}
          isNextDisabled={isViewingCurrentMonth}
        />
      </div>

      <TeacherClassRecapCard recap={recap} />

      <GlassCard as="section" className="mx-5 p-4">
        <p className="px-1 font-heading text-body-base font-semibold text-text-primary">
          Ringkasan per Siswa
        </p>
        {roster.length === 0 ? (
          <EmptyState
            icon={<Users className="size-6" aria-hidden="true" />}
            title="Belum Ada Data"
            description="Belum ada data kehadiran untuk kelas ini."
          />
        ) : (
          <ul className="mt-2 flex flex-col gap-2">
            {roster.map((entry) => (
              <StudentAttendanceRow key={entry.id} entry={entry} />
            ))}
          </ul>
        )}
      </GlassCard>
    </div>
  );
}
