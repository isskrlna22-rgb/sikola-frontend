/**
 * Background ambient untuk shell Student/Teacher (beda dari
 * AuthGradientPage yang dipakai di layar auth — ini sedikit lebih
 * "hidup" sesuai arahan nuansa modern/premium/futuristic untuk area
 * setelah login). Ditaruh di belakang konten yang bisa di-scroll, jadi
 * kartu-kartu glassmorphism di atasnya punya sesuatu yang "tembus
 * pandang"-kan.
 */
export function AppAmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
      aria-hidden="true"
    >
      <div className="absolute -right-16 -top-16 size-72 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 size-64 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute -left-20 bottom-0 size-80 rounded-full bg-secondary/20 blur-3xl" />
    </div>
  );
}
