import { Suspense } from "react";
import { PerizinanContent } from "@/components/shared/perizinan-content";

/**
 * Dibungkus <Suspense> karena komponen di dalamnya memakai useSearchParams
 * (baca query "?type=Surat Izin" dari halaman pemilihan layanan).
 */
export default function PerizinanPage() {
  return (
    <Suspense fallback={null}>
      <PerizinanContent />
    </Suspense>
  );
}
