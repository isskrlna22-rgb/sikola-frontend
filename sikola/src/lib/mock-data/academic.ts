import type {
  AcademicSummary,
  GradeEntry,
  LetterRequest,
  LetterRequestFormValues,
} from "@/types/academic";

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
      reasonCategory: "Keperluan Keluarga",
      description: "Menghadiri acara keluarga di luar kota.",
      status: "pending",
      submittedDateLabel: "21 Mei 2026, 14:25",
      leaveDateLabel: "22 Mei 2026",
      submittedTo: "Wali Kelas - Bu Sinta Rahmawati",
      timeline: [
        {
          id: "tl-1",
          label: "Pengajuan dibuat",
          timestampLabel: "21 Mei 2026, 14:25",
        },
        {
          id: "tl-2",
          label: "Menunggu persetujuan",
          timestampLabel: "21 Mei 2026, 14:26",
        },
      ],
    },
    {
      id: "lr-2",
      type: "Surat Sakit",
      reasonCategory: "Sakit",
      description: "Demam dan perlu istirahat di rumah.",
      status: "disetujui",
      submittedDateLabel: "9 Mei 2026, 08:10",
      leaveDateLabel: "9 Mei 2026",
      submittedTo: "Wali Kelas - Bu Sinta Rahmawati",
      timeline: [
        {
          id: "tl-3",
          label: "Pengajuan dibuat",
          timestampLabel: "9 Mei 2026, 08:10",
        },
        {
          id: "tl-4",
          label: "Menunggu persetujuan",
          timestampLabel: "9 Mei 2026, 08:11",
        },
        {
          id: "tl-5",
          label: "Disetujui Wali Kelas",
          timestampLabel: "9 Mei 2026, 10:45",
        },
      ],
    },
  ];
}

/**
 * Prefix key sessionStorage untuk pengajuan yang dibuat lewat form di
 * sesi berjalan (lihat createLetterRequestFromForm). Dipakai supaya
 * flow "kirim pengajuan -> lihat detail -> muncul di Riwayat" bisa
 * didemokan penuh tanpa backend sungguhan.
 */
const DYNAMIC_REQUEST_KEY_PREFIX = "sikola:letter-request:";

function saveDynamicLetterRequest(request: LetterRequest) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(
    DYNAMIC_REQUEST_KEY_PREFIX + request.id,
    JSON.stringify(request)
  );
}

function getAllDynamicLetterRequests(): LetterRequest[] {
  if (typeof window === "undefined") return [];
  const result: LetterRequest[] = [];
  for (let i = 0; i < window.sessionStorage.length; i++) {
    const key = window.sessionStorage.key(i);
    if (!key?.startsWith(DYNAMIC_REQUEST_KEY_PREFIX)) continue;
    const raw = window.sessionStorage.getItem(key);
    if (!raw) continue;
    try {
      result.push(JSON.parse(raw) as LetterRequest);
    } catch {
      // abaikan entri korup
    }
  }
  return result;
}

/**
 * Gabungan data statis + pengajuan dinamis (dibuat lewat form di sesi
 * berjalan), terbaru duluan. Dipakai tab "Riwayat" di
 * /akademik/layanan/perizinan.
 */
export function getMockLetterRequestsWithDynamic(): LetterRequest[] {
  return [...getAllDynamicLetterRequests(), ...getMockLetterRequests()];
}

export function getMockLetterRequestById(id: string): LetterRequest | null {
  const staticMatch = getMockLetterRequests().find((r) => r.id === id);
  if (staticMatch) return staticMatch;

  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(DYNAMIC_REQUEST_KEY_PREFIX + id);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LetterRequest;
  } catch {
    return null;
  }
}

/**
 * Buat LetterRequest baru dari form pengajuan (dummy — belum kirim ke
 * backend). TODO: ganti isi fungsi ini jadi panggilan
 * academicService.submitLetterRequest(values) begitu backend siap;
 * signature (terima LetterRequestFormValues, kembalikan LetterRequest)
 * dipertahankan sama supaya pemanggil (halaman form) tidak perlu
 * berubah.
 */
export function createLetterRequestFromForm(
  values: LetterRequestFormValues
): LetterRequest {
  const now = new Date();
  const submittedDateLabel = now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }) + `, ${now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`;

  const request: LetterRequest = {
    id: `lr-new-${now.getTime()}`,
    type: values.type,
    reasonCategory: values.reasonCategory,
    description: values.description,
    status: "pending",
    submittedDateLabel,
    leaveDateLabel: values.leaveDateLabel,
    submittedTo: "Wali Kelas - Bu Sinta Rahmawati",
    attachmentName: values.attachmentName,
    timeline: [
      {
        id: "tl-new-1",
        label: "Pengajuan dibuat",
        timestampLabel: submittedDateLabel,
      },
      {
        id: "tl-new-2",
        label: "Menunggu persetujuan",
        timestampLabel: submittedDateLabel,
      },
    ],
  };

  saveDynamicLetterRequest(request);
  return request;
}

/**
 * Batalkan pengajuan (tombol "Batal" di halaman detail). Untuk
 * pengajuan DINAMIS (dibuat lewat form di sesi ini), status benar-benar
 * diupdate di sessionStorage. Untuk pengajuan STATIS (data contoh
 * bawaan), perubahan cuma dikembalikan ke pemanggil untuk dipakai
 * sebagai state lokal di halaman — tidak persisten lintas refresh,
 * karena memang tidak ada "database" sungguhan di balik data statis.
 * TODO: ganti jadi academicService.cancelLetterRequest(id) begitu
 * backend siap — signature (terima id, kembalikan LetterRequest |
 * null) dipertahankan sama.
 */
export function cancelLetterRequest(id: string): LetterRequest | null {
  const current = getMockLetterRequestById(id);
  if (!current) return null;

  const updated: LetterRequest = { ...current, status: "dibatalkan" };
  const isDynamic = id.startsWith("lr-new-");
  if (isDynamic) {
    saveDynamicLetterRequest(updated);
  }
  return updated;
}
