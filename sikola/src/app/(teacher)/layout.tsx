import { AppAmbientBackground } from "@/components/shared/app-ambient-background";
import { BottomNav } from "@/components/shared/bottom-nav";

/**
 * Shell untuk seluruh halaman Guru — SAMA PERSIS strukturnya dengan
 * (student)/layout.tsx (adaptive frame, AppAmbientBackground, BottomNav
 * nempel di dasar shell), cuma `role="teacher"` yang beda. Duplikasi
 * kecil ini sengaja (bukan satu layout generik dengan prop role) supaya
 * area siswa yang sudah stabil tidak perlu disentuh sama sekali kalau
 * nanti area guru butuh penyesuaian shell sendiri.
 */
export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 justify-center md:bg-border/50 md:py-10">
      <div className="relative flex min-h-screen w-full flex-1 flex-col overflow-hidden md:my-auto md:min-h-215 md:max-w-107.5 md:rounded-[2.5rem] md:shadow-2xl">
        <AppAmbientBackground />
        <div className="flex-1 overflow-y-auto pb-6">{children}</div>
        <BottomNav role="teacher" />
      </div>
    </div>
  );
}
