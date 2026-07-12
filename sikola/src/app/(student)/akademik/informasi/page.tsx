"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { AcademicSummaryCard } from "@/components/shared/academic-summary-card";
import { GradesSection } from "@/components/shared/grades-section";
import { getMockAcademicSummary, getMockGrades } from "@/lib/mock-data/academic";

/**
 * Informasi Akademik — ringkasan nilai & statistik siswa. Dipindah dari
 * /akademik (yang sekarang jadi halaman menu hub) ke /akademik/informasi
 * sesuai struktur Figma. Isi & tampilan TIDAK berubah dari versi
 * sebelumnya, cuma lokasi route dan judul header.
 */
export default function InformasiAkademikPage() {
  const router = useRouter();
  const summary = getMockAcademicSummary();
  const grades = getMockGrades();

  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <PageHeader onBack={() => router.push("/akademik")} title="Informasi Akademik" />

      <div className="animate-page-in flex flex-col gap-4 px-5">
        <AcademicSummaryCard summary={summary} />
        <GradesSection grades={grades} />
      </div>
    </div>
  );
}
