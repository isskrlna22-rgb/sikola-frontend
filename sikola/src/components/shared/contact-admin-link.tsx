import { ADMIN_WHATSAPP_NUMBER } from "@/lib/constants";
import type { UserRole } from "@/components/ui/role-switch";

export interface ContactAdminLinkProps {
  role: UserRole;
  className?: string;
}

const MESSAGE_BY_ROLE: Record<UserRole, string> = {
  student:
    "Saya belum memiliki Akun Belajar.id untuk login ke aplikasi SIKOLA.\n\nNama :\nKelas :\n\nMohon bantu dibuatkan akun saya.\n\nTerima kasih.",
  teacher:
    "Saya belum memiliki Akun Belajar.id untuk login ke aplikasi SIKOLA.\n\nNama :\nMata Pelajaran :\n\nMohon bantu dibuatkan akun saya.\n\nTerima kasih.",
};

/**
 * Link "Hubungi Admin Sekolah" — membuka WhatsApp dengan pesan otomatis
 * terisi (siswa/guru tinggal mengisi Nama & Kelas/Mapel). Dipakai di Login
 * (Student & Teacher) dan bisa dipakai ulang di halaman lain yang butuh
 * kontak admin (mis. Bantuan & FAQ nanti).
 *
 * Nomor admin: lihat src/lib/constants.ts (ADMIN_WHATSAPP_NUMBER) —
 * saat ini masih placeholder, ganti dengan nomor asli sebelum production.
 */
export function ContactAdminLink({ role, className }: ContactAdminLinkProps) {
  const message = MESSAGE_BY_ROLE[role];
  const href = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? "font-semibold text-primary underline underline-offset-2"}
    >
      Hubungi Admin Sekolah
    </a>
  );
}
