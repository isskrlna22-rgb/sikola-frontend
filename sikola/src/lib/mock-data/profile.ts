import type { SchoolInfo } from "@/types/user";

/**
 * Data sekolah untuk halaman Profil. Dipisah dari
 * lib/mock-data/student-dashboard.ts karena beda domain (profil siswa
 * vs data sekolah) meski sama-sama tampil di halaman Profil.
 */
export function getMockSchoolInfo(): SchoolInfo {
  return {
    schoolName: "SMK Budi Bakti Ciwidey",
    waliKelas: "Bu Sinta Rahmawati",
    tahunAjaran: "2025/2026",
    accountStatus: "aktif",
  };
}
