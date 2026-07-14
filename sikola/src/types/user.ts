export interface StudentProfile {
  name: string;
  className: string;
  nis: string;
  avatarUrl?: string;
  isOnline: boolean;
  // Field di bawah ditambahkan untuk halaman Profil — semua ADDITIVE,
  // tidak mengubah field yang sudah ada, jadi pemakai lama (mis.
  // DashboardHeader yang cuma pakai name/className/isOnline) tetap jalan
  // tanpa perubahan.
  nisn: string;
  jurusan: string;
  email: string;
  phone: string;
  address: string;
}

/** Field yang bisa diedit lewat /profil/edit — subset dari StudentProfile. */
export interface StudentProfileFormValues {
  name: string;
  phone: string;
  address: string;
  avatarUrl?: string;
}

export type AccountStatus = "aktif" | "nonaktif";

export interface SchoolInfo {
  schoolName: string;
  waliKelas: string;
  tahunAjaran: string;
  accountStatus: AccountStatus;
}
