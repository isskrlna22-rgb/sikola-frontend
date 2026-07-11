export interface AcademicSummary {
  averageScore: number;
  predicate: string;
  semester: string;
  className: string;
  waliKelas: string;
}

export interface GradeEntry {
  id: string;
  subject: string;
  teacherName: string;
  score: number;
}

export type LetterRequestType = "Surat Izin" | "Surat Sakit" | "Surat Keterangan";

/**
 * Status pengajuan surat reuse StatusKind dari StatusBadge
 * ("pending" | "disetujui" | "ditolak") — satu union status dipakai di
 * banyak fitur, bukan didefinisikan ulang di sini.
 */
export interface LetterRequest {
  id: string;
  type: LetterRequestType;
  submittedDateLabel: string;
  status: "pending" | "disetujui" | "ditolak";
}
