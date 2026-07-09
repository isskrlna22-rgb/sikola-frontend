import { Logo } from "@/components/ui/logo";
import { MascotIllustration } from "@/components/shared/mascot-illustration";

/**
 * Titik-titik "bintang" dekoratif di background gradient. Posisi & ukuran
 * ditulis manual (bukan random di render) supaya hasilnya konsisten antara
 * server render dan client render (menghindari hydration mismatch).
 */
const SPARKLES = [
  { top: "8%", left: "18%", size: 6, opacity: 0.9 },
  { top: "14%", left: "78%", size: 4, opacity: 0.7 },
  { top: "22%", left: "10%", size: 3, opacity: 0.5 },
  { top: "6%", left: "55%", size: 3, opacity: 0.6 },
  { top: "28%", left: "85%", size: 5, opacity: 0.8 },
  { top: "34%", left: "62%", size: 3, opacity: 0.5 },
];

/**
 * Splash Screen — halaman pertama yang dilihat pengguna saat membuka SIKOLA.
 * Murni presentational (tidak ada logic navigasi/timer di sini) supaya
 * mudah dites secara visual dan dipakai ulang; logic "pindah ke halaman
 * berikutnya setelah N detik" ditaruh di page.tsx (lihat catatan di sana).
 */
export function SplashScreen() {
  return (
    <div className="relative flex flex-1 flex-col items-center overflow-hidden bg-gradient-to-b from-primary-dark via-primary to-primary-hover">
      {/* Sparkle ambient — dekorasi tipis, tidak mengalihkan perhatian dari logo & maskot */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      {/* Status "memuat" untuk pengguna pembaca layar */}
      <p role="status" className="sr-only">
        Memuat aplikasi SIKOLA…
      </p>

      <div className="relative z-10 flex flex-col items-center px-8 pt-20 text-center">
        <Logo variant="reversed" size="lg" showTagline />
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center px-10">
        <MascotIllustration
          pose="wave"
          alt="Maskot SIKO melambaikan tangan menyambut pengguna"
          priority
          className="w-52 drop-shadow-2xl sm:w-60"
        />
      </div>

      {/* Gelombang dekoratif di dasar layar */}
      <svg
        className="absolute bottom-16 left-0 w-full text-white/10"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 C100,110 300,10 400,60 L400,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
      <svg
        className="absolute bottom-16 left-0 w-full text-white/15"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,80 C120,30 280,120 400,70 L400,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>

      <div className="relative z-10 flex flex-col items-center gap-3 pb-10">
        <div className="h-1 w-24 overflow-hidden rounded-full bg-white/25">
          <div className="h-full w-0 animate-[splash-progress_2.2s_ease-in-out_forwards] rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}
