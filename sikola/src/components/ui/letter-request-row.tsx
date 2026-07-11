import { FileText } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import type { LetterRequest } from "@/types/academic";

export interface LetterRequestRowProps {
  request: LetterRequest;
}

export function LetterRequestRow({ request }: LetterRequestRowProps) {
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-white/50 px-3 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
        <FileText className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-heading text-body-base font-semibold text-text-primary">
          {request.type}
        </p>
        <p className="text-caption text-text-secondary">
          Diajukan {request.submittedDateLabel}
        </p>
      </div>
      <StatusBadge status={request.status} />
    </li>
  );
}
