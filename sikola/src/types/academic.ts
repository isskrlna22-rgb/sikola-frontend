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

/** Jenis layanan surat yang bisa diajukan — dipilih di /akademik/layanan. */
export type LetterRequestType = "Surat Izin" | "Surat Sakit";

/** Kategori alasan — dropdown "Jenis Izin" di dalam form pengajuan. */
export type LeaveReasonCategory =
  | "Sakit"
  | "Keperluan Keluarga"
  | "Kegiatan Sekolah"
  | "Lainnya";

/**
 * Status pengajuan surat reuse StatusKind dari StatusBadge
 * ("pending" | "disetujui" | "ditolak") — satu union status dipakai di
 * banyak fitur, bukan didefinisikan ulang di sini.
 */
export type LetterRequestStatus = "pending" | "disetujui" | "ditolak" | "dibatalkan";

export interface LetterRequestTimelineEntry {
  id: string;
  label: string;
  timestampLabel: string;
}

export interface LetterRequest {
  id: string;
  type: LetterRequestType;
  reasonCategory: LeaveReasonCategory;
  /** Teks bebas "Alasan Izin" dari form. */
  description: string;
  status: LetterRequestStatus;
  submittedDateLabel: string;
  leaveDateLabel: string;
  /** Mis. "Wali Kelas - Bu Sinta Rahmawati". */
  submittedTo: string;
  /** Nama file lampiran dummy, kalau ada. */
  attachmentName?: string;
  timeline: LetterRequestTimelineEntry[];
}

/** Payload form pengajuan di /akademik/layanan/perizinan. */
export interface LetterRequestFormValues {
  type: LetterRequestType;
  reasonCategory: LeaveReasonCategory;
  leaveDateLabel: string;
  description: string;
  attachmentName?: string;
}
