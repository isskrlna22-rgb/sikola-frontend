"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Send, FileClock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { PillFilterTabs } from "@/components/ui/pill-filter-tabs";
import { SelectField } from "@/components/ui/select-field";
import { Input } from "@/components/ui/input";
import { TextareaField } from "@/components/ui/textarea-field";
import { FileUploadDummy } from "@/components/ui/file-upload-dummy";
import { Button } from "@/components/ui/button";
import { LetterRequestRow } from "@/components/ui/letter-request-row";
import { EmptyState } from "@/components/ui/empty-state";
import { useSmartBack } from "@/hooks/use-smart-back";
import {
  createLetterRequestFromForm,
  getMockLetterRequestsWithDynamic,
} from "@/lib/mock-data/academic";
import { formatDateLabel } from "@/lib/academic-utils";
import type {
  LeaveReasonCategory,
  LetterRequestType,
} from "@/types/academic";

type PageTab = "ajukan" | "riwayat";

const TAB_OPTIONS: { value: PageTab; label: string }[] = [
  { value: "ajukan", label: "Ajukan Izin" },
  { value: "riwayat", label: "Riwayat" },
];

const REASON_OPTIONS: LeaveReasonCategory[] = [
  "Sakit",
  "Keperluan Keluarga",
  "Kegiatan Sekolah",
  "Lainnya",
];

/**
 * Konten /akademik/layanan/perizinan. Dipisah dari page.tsx karena
 * pakai useSearchParams (baca "?type=Surat Izin" dari kartu pilihan di
 * halaman sebelumnya) — perlu dibungkus <Suspense> di page.tsx, lihat
 * pola yang sama di OTP Verification & New Password.
 */
export function PerizinanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleBack = useSmartBack("/akademik/layanan");

  const type = (searchParams.get("type") as LetterRequestType) ?? "Surat Izin";

  const [tab, setTab] = useState<PageTab>("ajukan");
  const [reasonCategory, setReasonCategory] = useState<LeaveReasonCategory>(
    "Sakit"
  );
  const [leaveDate, setLeaveDate] = useState("");
  const [description, setDescription] = useState("");
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = getMockLetterRequestsWithDynamic();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!leaveDate) {
      setError("Tanggal izin wajib diisi.");
      return;
    }
    if (!description.trim()) {
      setError("Alasan izin wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    // Simulasi delay kirim ke backend (dummy — lihat TODO di
    // createLetterRequestFromForm untuk titik penggantian API asli).
    await new Promise((resolve) => setTimeout(resolve, 800));

    const created = createLetterRequestFromForm({
      type,
      reasonCategory,
      leaveDateLabel: formatDateLabel(leaveDate),
      description: description.trim(),
      attachmentName: attachmentName ?? undefined,
    });

    setIsSubmitting(false);
    router.push(`/akademik/layanan/${created.id}`);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <PageHeader onBack={handleBack} title="Perizinan" />

      <div className="px-5">
        <PillFilterTabs options={TAB_OPTIONS} selected={tab} onSelect={setTab} />
      </div>

      {tab === "ajukan" ? (
        <div className="animate-page-in px-5">
          <GlassCard as="section" className="p-5">
            <p className="text-body-sm text-text-secondary">Mengajukan</p>
            <p className="font-heading text-body-lg font-bold text-primary-dark">
              {type}
            </p>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
              <SelectField
                id="reason-category"
                label="Jenis Izin"
                value={reasonCategory}
                onChange={(e) =>
                  setReasonCategory(e.target.value as LeaveReasonCategory)
                }
              >
                {REASON_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </SelectField>

              <Input
                id="leave-date"
                type="date"
                label="Tanggal Izin"
                value={leaveDate}
                onChange={(e) => setLeaveDate(e.target.value)}
                required
              />

              <TextareaField
                id="description"
                label="Alasan Izin"
                placeholder="Contoh: Sakit, Keperluan Keluarga, Mengikuti Lomba, dll"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
              />

              <FileUploadDummy
                label="Upload dokumen pendukung"
                onFileSelected={setAttachmentName}
              />

              {error && <p className="text-body-sm text-danger">{error}</p>}

              <Button
                type="submit"
                size="lg"
                isLoading={isSubmitting}
                leftIcon={<Send className="size-4" aria-hidden="true" />}
              >
                Ajukan Izin
              </Button>
            </form>
          </GlassCard>
        </div>
      ) : (
        <div className="animate-page-in px-5">
          <GlassCard as="section" className="p-4">
            {history.length === 0 ? (
              <EmptyState
                icon={<FileClock className="size-6" aria-hidden="true" />}
                title="Belum Ada Riwayat"
                description="Pengajuan yang kamu kirim akan muncul di sini."
              />
            ) : (
              <ul className="flex flex-col gap-2">
                {history.map((request) => (
                  <LetterRequestRow key={request.id} request={request} />
                ))}
              </ul>
            )}
          </GlassCard>
        </div>
      )}
    </div>
  );
}
