"use client";

import { useRouter } from "next/navigation";
import { Users, Code2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Logo } from "@/components/ui/logo";

const TECH_STACK = [
  "Next.js (App Router)",
  "TypeScript",
  "Tailwind CSS",
  "Laravel (Backend)",
];

/**
 * Tentang Aplikasi — cuma diakses dari /profil (satu jalur masuk), back
 * pakai router.push biasa. Konten statis (tidak ada dummy data terpisah
 * karena memang murni informasi, bukan sesuatu yang perlu backend).
 */
export default function TentangAplikasiPage() {
  const router = useRouter();

  return (
    <div className="animate-page-in flex flex-1 flex-col gap-4 pb-4">
      <PageHeader onBack={() => router.push("/profil")} title="Tentang Aplikasi" />

      <div className="flex flex-col gap-4 px-5">
        <GlassCard as="section" className="flex flex-col items-center gap-2 p-6 text-center">
          <Logo size="lg" />
          <p className="text-body-sm font-semibold text-primary">Versi 1.0.0</p>
          <p className="mt-2 text-body-sm text-text-secondary">
            SIKOLA adalah Sistem Informasi Kehadiran & Layanan Akademik yang
            membantu siswa dan guru mengelola absensi, jadwal, nilai, dan
            layanan akademik dalam satu aplikasi — cepat, aman, dan mudah
            digunakan.
          </p>
        </GlassCard>

        <GlassCard as="section" className="p-5">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-primary" aria-hidden="true" />
            <h2 className="font-heading text-body-base font-semibold text-text-primary">
              Dikembangkan oleh
            </h2>
          </div>
          <p className="mt-2 text-body-sm text-text-secondary">
            Tim <span className="font-semibold text-text-primary">XENTRA</span>{" "}
            — kelas XI RPL 3, SMK Budi Bakti Ciwidey, sebagai bagian dari
            proyek capstone program Rekayasa Perangkat Lunak.
          </p>
        </GlassCard>

        <GlassCard as="section" className="p-5">
          <div className="flex items-center gap-2">
            <Code2 className="size-5 text-primary" aria-hidden="true" />
            <h2 className="font-heading text-body-base font-semibold text-text-primary">
              Teknologi yang Digunakan
            </h2>
          </div>
          <ul className="mt-2 flex flex-col gap-1.5">
            {TECH_STACK.map((tech) => (
              <li
                key={tech}
                className="flex items-center gap-2 text-body-sm text-text-secondary"
              >
                <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                {tech}
              </li>
            ))}
          </ul>
        </GlassCard>

        <p className="pb-2 text-center text-caption text-text-secondary">
          &copy; 2026 XENTRA Team. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </div>
  );
}
