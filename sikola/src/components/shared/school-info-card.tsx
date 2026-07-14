import { School, GraduationCap, CalendarRange } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { InfoRow } from "@/components/ui/info-row";
import { StatusBadge } from "@/components/ui/status-badge";
import type { SchoolInfo } from "@/types/user";

export interface SchoolInfoCardProps {
  info: SchoolInfo;
}

export function SchoolInfoCard({ info }: SchoolInfoCardProps) {
  return (
    <GlassCard as="section" className="p-5">
      <h2 className="font-heading text-body-base font-semibold text-text-primary">
        Data Sekolah
      </h2>
      <div className="mt-2">
        <InfoRow
          icon={<School className="size-4" aria-hidden="true" />}
          label="Sekolah"
          value={<span className="max-w-[60%] text-right">{info.schoolName}</span>}
        />
        <InfoRow
          icon={<GraduationCap className="size-4" aria-hidden="true" />}
          label="Wali Kelas"
          value={info.waliKelas}
        />
        <InfoRow
          icon={<CalendarRange className="size-4" aria-hidden="true" />}
          label="Tahun Ajaran"
          value={info.tahunAjaran}
        />
        <InfoRow
          label="Status Akun"
          value={<StatusBadge status={info.accountStatus} />}
        />
      </div>
    </GlassCard>
  );
}
