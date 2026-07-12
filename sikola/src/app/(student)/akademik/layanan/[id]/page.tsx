"use client";

import { use, useState } from "react";
import {
  FileText,
  CalendarClock,
  CalendarDays,
  MessageSquare,
  Target,
  Ban,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { InfoRow } from "@/components/ui/info-row";
import { Timeline } from "@/components/ui/timeline";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { EmptyState } from "@/components/ui/empty-state";
import { useSmartBack } from "@/hooks/use-smart-back";
import {
  getMockLetterRequestById,
  cancelLetterRequest,
} from "@/lib/mock-data/academic";

interface LetterRequestDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Detail pengajuan surat. Client Component, jadi `params` (Promise di
 * Next.js 16) di-unwrap pakai React `use()` — lihat catatan di
 * TECH_DEBT.md soal pola ini.
 */
export default function LetterRequestDetailPage({
  params,
}: LetterRequestDetailPageProps) {
  const { id } = use(params);
  const handleBack = useSmartBack("/akademik/layanan/perizinan");

  const initialRequest = getMockLetterRequestById(id);
  const [request, setRequest] = useState(initialRequest);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  if (!request) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader onBack={handleBack} title="Detail Pengajuan" />
        <EmptyState
          className="flex-1 justify-center"
          icon={<FileText className="size-6" aria-hidden="true" />}
          title="Pengajuan Tidak Ditemukan"
          description="Pengajuan ini mungkin sudah dihapus atau link-nya tidak valid."
        />
      </div>
    );
  }

  const handleConfirmCancel = async () => {
    setIsCancelling(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const updated = cancelLetterRequest(request.id);
    setIsCancelling(false);
    setShowCancelConfirm(false);
    if (updated) setRequest(updated);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <PageHeader onBack={handleBack} title="Detail Pengajuan" />

      <div className="animate-page-in flex flex-col gap-4 px-5">
        <GlassCard as="section" className="flex flex-col items-center gap-2 p-5 text-center">
          <p className="text-body-sm text-text-secondary">Status Pengajuan</p>
          <StatusBadge status={request.status} className="px-4 py-1.5 text-body-sm" />
        </GlassCard>

        <GlassCard as="section" className="p-5">
          <InfoRow
            icon={<FileText className="size-4" aria-hidden="true" />}
            label="Jenis Layanan"
            value={request.type}
          />
          <InfoRow
            icon={<CalendarClock className="size-4" aria-hidden="true" />}
            label="Tanggal Pengajuan"
            value={request.submittedDateLabel}
          />
          <InfoRow
            icon={<CalendarDays className="size-4" aria-hidden="true" />}
            label="Tanggal Izin"
            value={request.leaveDateLabel}
          />
          <InfoRow
            label="Alasan"
            value={request.reasonCategory}
          />
          <InfoRow
            icon={<MessageSquare className="size-4" aria-hidden="true" />}
            label="Keterangan"
            value={
              <span className="max-w-[60%] text-right">{request.description}</span>
            }
          />
          <InfoRow
            icon={<Target className="size-4" aria-hidden="true" />}
            label="Tujuan Pengajuan"
            value={
              <span className="max-w-[60%] text-right">{request.submittedTo}</span>
            }
          />
        </GlassCard>

        <GlassCard as="section" className="p-5">
          <p className="mb-3 font-heading text-body-base font-semibold text-text-primary">
            Riwayat Status
          </p>
          <Timeline steps={request.timeline} />
        </GlassCard>

        {request.status === "pending" && (
          <GlassCard as="section" className="p-5">
            {showCancelConfirm ? (
              <div className="flex flex-col gap-3">
                <Alert variant="warning">
                  Yakin ingin membatalkan pengajuan ini? Tindakan ini tidak
                  bisa dibatalkan.
                </Alert>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowCancelConfirm(false)}
                    disabled={isCancelling}
                  >
                    Tidak
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleConfirmCancel}
                    isLoading={isCancelling}
                  >
                    Ya, Batalkan
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="danger"
                leftIcon={<Ban className="size-4" aria-hidden="true" />}
                onClick={() => setShowCancelConfirm(true)}
              >
                Batalkan Pengajuan
              </Button>
            )}
          </GlassCard>
        )}

        {request.status === "dibatalkan" && (
          <Alert variant="info">Pengajuan ini telah dibatalkan.</Alert>
        )}
      </div>
    </div>
  );
}
