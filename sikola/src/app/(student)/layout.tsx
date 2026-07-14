import { AppAmbientBackground } from "@/components/shared/app-ambient-background";
import { BottomNav } from "@/components/shared/bottom-nav";

/**
 * Shell untuk seluruh halaman Siswa. Pola "adaptive frame" sama seperti
 * (auth)/layout.tsx (mobile = full screen, desktop = kartu ~430px
 * center), ditambah:
 * - AppAmbientBackground di lapisan paling belakang (supaya kartu
 *   glassmorphism di atasnya benar-benar "tembus pandang"-kan sesuatu).
 * - Area konten yang bisa di-scroll + BottomNav yang selalu nempel di
 *   dasar frame (bukan `position:fixed` ke viewport — supaya tetap benar
 *   di dalam kartu 430px saat dilihat dari desktop).
 */
export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 justify-center md:bg-border/50 md:py-10">
      <div className="relative flex min-h-screen w-full flex-1 flex-col overflow-hidden md:my-auto md:min-h-215 md:max-w-107.5 md:rounded-[2.5rem] md:shadow-2xl">
        <AppAmbientBackground />
        <div className="flex-1 overflow-y-auto pb-6">{children}</div>
        <BottomNav role="student" />
      </div>
    </div>
  );
}
