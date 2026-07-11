import type { AcademicSummary, GradeEntry, LetterRequest } from "@/types/academic";

/**
 * Data dummy Akademik. Sama pola dengan mock-data lain di project ini —
 * fungsi getMock*(), bukan konstanta statis, supaya nanti gampang diganti
 * pemanggilan service asli tanpa mengubah pemanggil di halaman.
 */

export function getMockAcademicSummary(): AcademicSummary {
  return {
    averageScore: 89.4,
    predicate: "A-",
    semester: "Genap 2025/2026",
    className: "XII RPL",
    waliKelas: "Bu Sinta Rahmawati",
  };
}

export function getMockGrades(): GradeEntry[] {
  return [
    { id: "gr-1", subject: "Basis Data", teacherName: "Pak Arif Maulana", score: 90 },
    { id: "gr-2", subject: "PBO", teacherName: "Pak Dedi Kurniawan", score: 92 },
    { id: "gr-3", subject: "Matematika", teacherName: "Bu Sinta Rahmawati", score: 84 },
    {
      id: "gr-4",
      subject: "Jaringan Komputer",
      teacherName: "Pak Irvan Sofi'ul",
      score: 91,
    },
    {
      id: "gr-5",
      subject: "Sistem Informasi",
      teacherName: "Bu Risa Novita",
      score: 85,
    },
  ];
}

export function getMockLetterRequests(): LetterRequest[] {
  return [
    {
      id: "lr-1",
      type: "Surat Izin",
      submittedDateLabel: "21 Mei 2026",
      status: "pending",
    },
    {
      id: "lr-2",
      type: "Surat Keterangan",
      submittedDateLabel: "9 Mei 2026",
      status: "disetujui",
    },
  ];
}
