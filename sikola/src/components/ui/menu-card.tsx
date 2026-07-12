import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export interface MenuCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
}

/**
 * Kartu menu navigasi (ikon + judul + deskripsi + chevron) — dipakai di
 * halaman-halaman hub seperti Akademik. Reusable untuk hub serupa nanti
 * (mis. Pengaturan Aplikasi, Bantuan & FAQ).
 */
export function MenuCard({ href, icon, title, description }: MenuCardProps) {
  return (
    <Link href={href} className="block">
      <GlassCard
        as="section"
        className="flex items-center gap-3 p-4 transition-transform active:scale-[0.98]"
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-heading text-body-base font-semibold text-text-primary">
            {title}
          </p>
          <p className="truncate text-caption text-text-secondary">
            {description}
          </p>
        </div>
        <ChevronRight
          className="size-5 shrink-0 text-text-secondary"
          aria-hidden="true"
        />
      </GlassCard>
    </Link>
  );
}
