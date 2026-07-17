"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { PillFilterTabs } from "@/components/ui/pill-filter-tabs";
import { ValidationRequestCard } from "@/components/ui/validation-request-card";
import { EmptyState } from "@/components/ui/empty-state";
import { getMockAttendanceValidationRequests } from "@/lib/mock-data/teacher-attendance";
import type { AttendanceValidationRequest } from "@/types/teacher";

type FilterTab = "semua" | "pending" | "disetujui" | "ditolak";

const TAB_OPTIONS: { value: FilterTab; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "pending", label: "Menunggu" },
  { value: "disetujui", label: "Disetujui" },
  { value: "ditolak", label: "Ditolak" },
];

/**
 * Validasi Kehadiran — daftar pengajuan izin/sakit/keterlambatan siswa.
 * Setujui/Tolak murni state lokal (dummy, belum ada backend) —
 * simulasi delay lalu update status di memori halaman ini saja.
 */
export default function ValidasiKehadiranPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<AttendanceValidationRequest[]>(
    getMockAttendanceValidationRequests()
  );
  const [tab, setTab] = useState<FilterTab>("pending");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const filtered = requests.filter((r) => tab === "semua" || r.status === tab);

  const updateStatus = async (
    id: string,
    status: "disetujui" | "ditolak"
  ) => {
    setProcessingId(id);
    // TODO: panggil attendanceValidationService.updateStatus(id, status) begitu backend siap.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    setProcessingId(null);
  };

  return (
    <div className="animate-page-in flex flex-1 flex-col gap-4 pb-4">
      <PageHeader
        onBack={() => router.push("/guru/kehadiran")}
        title="Validasi Kehadiran"
      />

      <div className="px-5">
        <PillFilterTabs options={TAB_OPTIONS} selected={tab} onSelect={setTab} />
      </div>

      <div className="flex flex-col gap-3 px-5">
        {filtered.length === 0 ? (
          <GlassCard as="section" className="p-4">
            <EmptyState
              icon={<ShieldCheck className="size-6" aria-hidden="true" />}
              title="Tidak Ada Pengajuan"
              description="Tidak ada pengajuan dengan status ini."
            />
          </GlassCard>
        ) : (
          filtered.map((request) => (
            <ValidationRequestCard
              key={request.id}
              request={request}
              isProcessing={processingId === request.id}
              onApprove={(id) => updateStatus(id, "disetujui")}
              onReject={(id) => updateStatus(id, "ditolak")}
            />
          ))
        )}
      </div>
    </div>
  );
}
