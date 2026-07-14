"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QrCode, Square, History as HistoryIcon } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { PillFilterTabs } from "@/components/ui/pill-filter-tabs";
import { QrCodePlaceholder } from "@/components/ui/qr-code-placeholder";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { QrSessionRow } from "@/components/ui/qr-session-row";
import { EmptyState } from "@/components/ui/empty-state";
import { getMockTeacherClasses } from "@/lib/mock-data/teacher-dashboard";
import {
  getMockClassAttendanceRecap,
  getMockQrSessionHistory,
} from "@/lib/mock-data/teacher-attendance";
import type { QrSession } from "@/types/teacher";

const CLASSES = getMockTeacherClasses();

interface RecapStatProps {
  label: string;
  value: number;
  colorClass: string;
}

function RecapStat({ label, value, colorClass }: RecapStatProps) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className={`font-heading text-body-lg font-bold ${colorClass}`}>
        {value}
      </span>
      <span className="text-caption text-text-secondary">{label}</span>
    </div>
  );
}

/**
 * Kehadiran Guru — kelola sesi QR absensi per kelas + rekap + riwayat.
 * Client Component penuh karena state QR aktif/nonaktif murni interaksi
 * lokal di halaman ini (BEDA dari flow Pengajuan Surat siswa yang butuh
 * sessionStorage — di sini semuanya terjadi di satu halaman, jadi
 * cukup useState biasa, tidak perlu navigasi lintas halaman).
 *
 * TIDAK ada scanner/generator QR sungguhan (lihat TECH_DEBT.md) — QR
 * yang tampil murni dekoratif dari <QrCodePlaceholder>.
 */
export default function KehadiranGuruPage() {
  const router = useRouter();
  const [selectedClassId, setSelectedClassId] = useState(CLASSES[0].id);
  const [activeSession, setActiveSession] = useState<QrSession | null>(null);
  const [qrHistory, setQrHistory] = useState<QrSession[]>(
    getMockQrSessionHistory()
  );

  const selectedClass = CLASSES.find((c) => c.id === selectedClassId) ?? CLASSES[0];
  const recap = getMockClassAttendanceRecap(selectedClassId);
  const isSessionActiveForSelectedClass =
    activeSession?.classId === selectedClassId;

  const handleCreateSession = () => {
    const now = new Date();
    const timeLabel = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateLabel = now.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setActiveSession({
      id: `qr-${now.getTime()}`,
      classId: selectedClass.id,
      className: selectedClass.className,
      dateLabel,
      startTime: timeLabel,
      endTime: "-",
      status: "aktif",
    });
  };

  const handleStopSession = () => {
    if (!activeSession) return;
    const now = new Date();
    const endTimeLabel = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const ended: QrSession = {
      ...activeSession,
      status: "nonaktif",
      endTime: endTimeLabel,
    };
    setQrHistory((prev) => [ended, ...prev]);
    setActiveSession(null);
  };

  return (
    <div className="animate-page-in flex flex-1 flex-col gap-4 pb-4">
      <PageHeader
        onBack={() => router.push("/guru/dashboard")}
        title="Kehadiran"
      />

      <div className="px-5">
        <PillFilterTabs
          options={CLASSES.map((c) => ({ value: c.id, label: c.className }))}
          selected={selectedClassId}
          onSelect={setSelectedClassId}
        />
      </div>

      <div className="flex flex-col gap-4 px-5">
        <GlassCard as="section" className="flex flex-col items-center gap-4 p-5 text-center">
          <div className="flex items-center gap-2">
            <p className="text-body-sm text-text-secondary">
              Sesi Absensi Kelas {selectedClass.className}
            </p>
            <StatusBadge
              status={isSessionActiveForSelectedClass ? "aktif" : "nonaktif"}
            />
          </div>

          {isSessionActiveForSelectedClass && activeSession ? (
            <>
              <QrCodePlaceholder seed={activeSession.id} size={200} />
              <p className="text-body-sm text-text-secondary">
                QR aktif sejak {activeSession.startTime} WIB
              </p>
              <Button
                variant="danger"
                leftIcon={<Square className="size-4" aria-hidden="true" />}
                onClick={handleStopSession}
              >
                Hentikan Sesi
              </Button>
            </>
          ) : (
            <Button
              size="lg"
              leftIcon={<QrCode className="size-4" aria-hidden="true" />}
              onClick={handleCreateSession}
            >
              Buat QR Kehadiran
            </Button>
          )}
        </GlassCard>

        <GlassCard as="section" className="p-5">
          <p className="font-heading text-body-base font-semibold text-text-primary">
            Rekap Kehadiran Kelas {selectedClass.className}
          </p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            <RecapStat label="Hadir" value={recap.hadir} colorClass="text-success" />
            <RecapStat label="Izin" value={recap.izin} colorClass="text-warning" />
            <RecapStat label="Sakit" value={recap.sakit} colorClass="text-info" />
            <RecapStat label="Alpa" value={recap.alpa} colorClass="text-danger" />
          </div>
          <p className="mt-3 text-center text-caption text-text-secondary">
            dari {recap.totalStudents} siswa terdaftar
          </p>
        </GlassCard>

        <GlassCard as="section" className="p-4">
          <div className="flex items-center gap-2 px-1">
            <HistoryIcon className="size-4 text-text-secondary" aria-hidden="true" />
            <h2 className="font-heading text-body-base font-semibold text-text-primary">
              Riwayat QR
            </h2>
          </div>

          {qrHistory.length === 0 ? (
            <EmptyState
              icon={<QrCode className="size-6" aria-hidden="true" />}
              title="Belum Ada Riwayat"
              description="QR Code yang pernah dibuat akan muncul di sini."
            />
          ) : (
            <ul className="mt-2 flex flex-col gap-2">
              {qrHistory.map((session) => (
                <QrSessionRow key={session.id} session={session} />
              ))}
            </ul>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
