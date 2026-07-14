import { QrCode, Clock } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import type { QrSession } from "@/types/teacher";

export interface QrSessionRowProps {
  session: QrSession;
}

export function QrSessionRow({ session }: QrSessionRowProps) {
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-white/50 px-3 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
        <QrCode className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-heading text-body-base font-semibold text-text-primary">
          Kelas {session.className}
        </p>
        <p className="flex items-center gap-1 text-caption text-text-secondary">
          <Clock className="size-3" aria-hidden="true" />
          {session.dateLabel} &middot; {session.startTime}
          {session.endTime !== "-" && ` - ${session.endTime}`}
        </p>
      </div>
      <StatusBadge status={session.status} />
    </li>
  );
}
