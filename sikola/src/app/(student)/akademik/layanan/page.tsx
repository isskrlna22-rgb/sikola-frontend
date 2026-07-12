"use client";

import { useRouter } from "next/navigation";
import { FileText, Stethoscope } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { MascotIllustration } from "@/components/shared/mascot-illustration";
import { ServiceChoiceCard } from "@/components/ui/service-choice-card";

/**
 * Layanan Akademik — sekarang jadi halaman PEMILIHAN layanan (bukan
 * langsung form), sesuai wireframe terbaru: pilih jenis surat dulu,
 * baru diarahkan ke form pengajuan di /akademik/layanan/perizinan.
 */
export default function LayananAkademikPage() {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <PageHeader onBack={() => router.push("/akademik")} title="Layanan Akademik" />

      <div className="flex flex-col items-center px-5 pt-2 text-center">
        <MascotIllustration
          pose="wave"
          alt="Maskot SIKO"
          className="w-24"
        />
        <p className="mt-2 text-body-sm text-text-secondary">
          Pilih jenis surat yang ingin kamu ajukan
        </p>
      </div>

      <div className="animate-page-in flex flex-col gap-3 px-5">
        <ServiceChoiceCard
          href="/akademik/layanan/perizinan?type=Surat%20Izin"
          icon={<FileText className="size-7" aria-hidden="true" />}
          title="Surat Izin"
          description="Ajukan surat izin kegiatan atau keperluan"
        />
        <ServiceChoiceCard
          href="/akademik/layanan/perizinan?type=Surat%20Sakit"
          icon={<Stethoscope className="size-7" aria-hidden="true" />}
          title="Surat Sakit"
          description="Ajukan surat keterangan sakit"
        />
      </div>
    </div>
  );
}
