"use client";

import { useRouter } from "next/navigation";
import { HelpCircle, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { AccordionItem } from "@/components/ui/accordion-item";
import { Button } from "@/components/ui/button";
import { ADMIN_WHATSAPP_NUMBER } from "@/lib/constants";

const FAQ_ITEMS = [
  {
    question: "Bagaimana cara melakukan absensi?",
    answer:
      'Buka menu "Scan QR" di halaman Beranda, izinkan akses kamera, lalu arahkan kamera ke QR Code yang ditampilkan guru piket di kelas.',
  },
  {
    question: 'Kenapa status absensi saya "Terlambat"?',
    answer:
      "Absensi dicatat terlambat kalau kamu scan QR Code setelah batas waktu yang ditentukan sekolah. Batas waktu bisa dilihat di halaman hasil absensi.",
  },
  {
    question: "Bagaimana cara mengajukan surat izin atau sakit?",
    answer:
      'Buka menu "Akademik" > "Layanan Akademik", pilih jenis surat, lalu isi form pengajuan. Status pengajuan bisa dipantau di tab "Riwayat".',
  },
  {
    question: "Saya lupa password akun belajar.id, bagaimana solusinya?",
    answer:
      'Gunakan fitur "Forgot Password?" di halaman Login untuk reset password lewat email, atau hubungi Admin Sekolah lewat tombol di bawah.',
  },
  {
    question: "Kenapa saya tidak bisa login?",
    answer:
      "Pastikan email dan password yang dimasukkan benar. Kalau akun belum pernah dibuat, hubungi Admin Sekolah untuk pembuatan akun belajar.id.",
  },
];

const HELP_MESSAGE =
  "Halo Admin, saya butuh bantuan terkait penggunaan aplikasi SIKOLA.\n\nPertanyaan/kendala:\n";

/**
 * Bantuan & FAQ — cuma diakses dari /profil (satu jalur masuk), back
 * pakai router.push biasa. Pesan WhatsApp di sini SENGAJA tidak reuse
 * <ContactAdminLink> (yang teksnya spesifik "belum punya akun") karena
 * konteksnya beda — di sini siswa yang SUDAH login butuh bantuan umum.
 */
export default function BantuanPage() {
  const router = useRouter();
  const whatsappHref = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    HELP_MESSAGE
  )}`;

  return (
    <div className="animate-page-in flex flex-1 flex-col gap-4 pb-4">
      <PageHeader onBack={() => router.push("/profil")} title="Bantuan" />

      <div className="flex flex-col gap-4 px-5">
        <GlassCard as="section" className="p-5">
          <div className="flex items-center gap-2">
            <HelpCircle className="size-5 text-primary" aria-hidden="true" />
            <h2 className="font-heading text-body-base font-semibold text-text-primary">
              Pertanyaan Umum (FAQ)
            </h2>
          </div>
          <div className="mt-2">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </GlassCard>

        <GlassCard as="section" className="p-5 text-center">
          <p className="font-heading text-body-base font-semibold text-text-primary">
            Masih butuh bantuan?
          </p>
          <p className="mt-1 text-body-sm text-text-secondary">
            Hubungi Admin Sekolah langsung lewat WhatsApp.
          </p>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-4 block">
            <Button leftIcon={<MessageCircle className="size-4" aria-hidden="true" />}>
              Hubungi Admin Sekolah
            </Button>
          </a>
        </GlassCard>
      </div>
    </div>
  );
}
