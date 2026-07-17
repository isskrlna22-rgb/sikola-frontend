import { Check, X, Clock } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import type { AttendanceValidationRequest } from "@/types/teacher";

export interface ValidationRequestCardProps {
  request: AttendanceValidationRequest;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isProcessing?: boolean;
}

const TYPE_LABEL: Record<AttendanceValidationRequest["type"], string> = {
  izin: "Izin",
  sakit: "Sakit",
  terlambat: "Keterlambatan",
};

/**
 * Kartu satu pengajuan (izin/sakit/keterlambatan) yang menunggu
 * validasi guru. Tombol Setujui/Tolak cuma muncul kalau status masih
 * "pending" — request yang sudah divalidasi tampil read-only dengan
 * StatusBadge saja.
 */
export function ValidationRequestCard({
  request,
  onApprove,
  onReject,
  isProcessing = false,
}: ValidationRequestCardProps) {
  const isPending = request.status === "pending";

  return (
    <GlassCard as="section" className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-heading text-body-base font-semibold text-text-primary">
            {request.studentName}
          </p>
          <p className="text-caption text-text-secondary">
            Kelas {request.className} &middot; {TYPE_LABEL[request.type]}
          </p>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <p className="mt-2 text-body-sm text-text-secondary">{request.reason}</p>

      <p className="mt-2 flex items-center gap-1 text-caption text-text-secondary">
        <Clock className="size-3" aria-hidden="true" />
        {request.dateLabel}
        {request.timeLabel && <> &middot; {request.timeLabel} WIB</>}
      </p>

      {isPending && (
        <div className="mt-3 flex gap-2">
          <Button
            variant="outline"
            disabled={isProcessing}
            leftIcon={<X className="size-4" aria-hidden="true" />}
            onClick={() => onReject(request.id)}
          >
            Tolak
          </Button>
          <Button
            disabled={isProcessing}
            leftIcon={<Check className="size-4" aria-hidden="true" />}
            onClick={() => onApprove(request.id)}
          >
            Setujui
          </Button>
        </div>
      )}
    </GlassCard>
  );
}
