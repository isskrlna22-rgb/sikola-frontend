"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { AcademicSummaryCard } from "@/components/shared/academic-summary-card";
import { GradesSection } from "@/components/shared/grades-section";
import { LetterRequestsSection } from "@/components/shared/letter-requests-section";
import {
  getMockAcademicSummary,
  getMockGrades,
  getMockLetterRequests,
} from "@/lib/mock-data/academic";

/**
 * Halaman Akademik — hub ringkasan nilai + pengajuan surat siswa.
 * Data statis (tidak time-dependent seperti Jadwal/Riwayat), jadi tidak
 * butuh pola "default netral lalu dikoreksi di useEffect" — aman
 * dipanggil langsung.
 */
export default function AkademikPage() {
  const router = useRouter();
  const summary = getMockAcademicSummary();
  const grades = getMockGrades();
  const letterRequests = getMockLetterRequests();

  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <PageHeader onBack={() => router.push("/dashboard")} title="Akademik" />

      <div className="flex flex-col gap-4 px-5">
        <AcademicSummaryCard summary={summary} />
        <GradesSection grades={grades} />
        <LetterRequestsSection requests={letterRequests} />
      </div>
    </div>
  );
}
