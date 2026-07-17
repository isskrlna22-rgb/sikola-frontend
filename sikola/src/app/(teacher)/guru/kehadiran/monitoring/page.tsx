"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { PillFilterTabs } from "@/components/ui/pill-filter-tabs";
import { SearchInput } from "@/components/ui/search-input";
import { StudentAttendanceRow } from "@/components/ui/student-attendance-row";
import { EmptyState } from "@/components/ui/empty-state";
import { TeacherStatsCard } from "@/components/shared/teacher-stats-card";
import { getMockTeacherClasses } from "@/lib/mock-data/teacher-dashboard";
import { getMockStudentAttendanceList } from "@/lib/mock-data/teacher-attendance";
import type { AttendanceStatus } from "@/types/attendance";
import type { TeacherDashboardStats } from "@/types/teacher";

const CLASSES = getMockTeacherClasses();

type StatusFilter = "semua" | AttendanceStatus;

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "hadir", label: "Hadir" },
  { value: "terlambat", label: "Terlambat" },
  { value: "izin", label: "Izin" },
  { value: "sakit", label: "Sakit" },
  { value: "alpa", label: "Alpa" },
];

/**
 * Monitoring Kehadiran — daftar siswa + status kehadiran hari ini per
 * kelas, dengan search & filter status. `TeacherStatsCard` dipakai
 * ULANG apa adanya (bukan bikin kartu statistik baru) — cukup dihitung
 * dari roster kelas yang dipilih, `pendingPermissions: 0` supaya banner
 * "menunggu persetujuan" (yang tidak relevan di halaman ini) otomatis
 * tersembunyi.
 */
export default function MonitoringKehadiranPage() {
  const router = useRouter();
  const [selectedClassId, setSelectedClassId] = useState(CLASSES[0].id);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("semua");

  const roster = getMockStudentAttendanceList(selectedClassId);

  const filtered = roster.filter((entry) => {
    const matchesStatus = statusFilter === "semua" || entry.status === statusFilter;
    const matchesSearch = entry.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Siswa "terlambat" tetap dihitung hadir di ringkasan atas (dia tetap
  // datang, cuma telat) — sama konvensi dengan
  // computeMonthlyStatsFromHistory milik siswa.
  const stats: TeacherDashboardStats = {
    hadir: roster.filter((s) => s.status === "hadir" || s.status === "terlambat")
      .length,
    izin: roster.filter((s) => s.status === "izin").length,
    sakit: roster.filter((s) => s.status === "sakit").length,
    alpa: roster.filter((s) => s.status === "alpa").length,
    pendingPermissions: 0,
  };

  return (
    <div className="animate-page-in flex flex-1 flex-col gap-4 pb-4">
      <PageHeader
        onBack={() => router.push("/guru/kehadiran")}
        title="Monitoring Kehadiran"
      />

      <div className="px-5">
        <PillFilterTabs
          options={CLASSES.map((c) => ({ value: c.id, label: c.className }))}
          selected={selectedClassId}
          onSelect={setSelectedClassId}
        />
      </div>

      <TeacherStatsCard stats={stats} />

      <div className="flex flex-col gap-3 px-5">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Cari nama siswa..."
        />
        <PillFilterTabs
          options={STATUS_OPTIONS}
          selected={statusFilter}
          onSelect={setStatusFilter}
        />
      </div>

      <GlassCard as="section" className="mx-5 p-4">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Users className="size-6" aria-hidden="true" />}
            title="Tidak Ada Siswa"
            description={
              search
                ? `Tidak ditemukan siswa dengan nama "${search}".`
                : "Tidak ada siswa dengan status ini."
            }
          />
        ) : (
          <ul className="flex flex-col gap-2">
            {filtered.map((entry) => (
              <StudentAttendanceRow key={entry.id} entry={entry} />
            ))}
          </ul>
        )}
      </GlassCard>
    </div>
  );
}
