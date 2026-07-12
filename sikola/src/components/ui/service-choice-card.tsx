import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export interface ServiceChoiceCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
}

/**
 * Kartu pilihan layanan berukuran besar (beda dari <MenuCard> yang
 * lebih ringkas/horizontal) — dipakai di /akademik/layanan untuk
 * "Surat Izin" & "Surat Sakit". Ikon besar di atas, judul + deskripsi,
 * lalu tombol panah di kanan bawah.
 */
export function ServiceChoiceCard({
  href,
  icon,
  title,
  description,
}: ServiceChoiceCardProps) {
  return (
    <Link href={href} className="block">
      <GlassCard
        as="section"
        className="flex items-center gap-4 p-5 transition-transform active:scale-[0.98]"
      >
        <span className="flex size-16 shrink-0 items-center justify-center rounded-3xl bg-primary text-white shadow-md shadow-primary/30">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-heading text-body-lg font-bold text-text-primary">
            {title}
          </p>
          <p className="mt-0.5 text-body-sm text-text-secondary">
            {description}
          </p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </GlassCard>
    </Link>
  );
}
