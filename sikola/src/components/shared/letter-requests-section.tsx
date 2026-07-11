import Link from "next/link";
import { FilePlus, FileClock } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { LetterRequestRow } from "@/components/ui/letter-request-row";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import type { LetterRequest } from "@/types/academic";

export interface LetterRequestsSectionProps {
  requests: LetterRequest[];
}

/**
 * Kartu pengajuan surat/perizinan (dummy — belum ada form/halaman
 * pengajuan sungguhan, link "Ajukan Surat Baru" mengarah ke
 * /akademik/perizinan yang belum dibangun, sengaja 404 dulu sesuai pola
 * pengembangan bertahap project ini).
 */
export function LetterRequestsSection({ requests }: LetterRequestsSectionProps) {
  return (
    <GlassCard as="section" className="p-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-heading text-body-base font-semibold text-text-primary">
          Pengajuan Surat
        </h2>
      </div>

      {requests.length === 0 ? (
        <EmptyState
          icon={<FileClock className="size-6" aria-hidden="true" />}
          title="Belum Ada Pengajuan"
          description="Ajukan surat izin, sakit, atau keterangan lewat tombol di bawah."
        />
      ) : (
        <ul className="mt-2 flex flex-col gap-2">
          {requests.map((request) => (
            <LetterRequestRow key={request.id} request={request} />
          ))}
        </ul>
      )}

      <Link href="/akademik/perizinan" className="mt-3 block">
        <Button
          variant="outline"
          leftIcon={<FilePlus className="size-4" aria-hidden="true" />}
        >
          Ajukan Surat Baru
        </Button>
      </Link>
    </GlassCard>
  );
}
