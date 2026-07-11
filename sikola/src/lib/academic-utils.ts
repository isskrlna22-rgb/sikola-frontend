/**
 * Konversi skor 0-100 jadi predikat huruf. Pure function, gampang
 * ditest dan gampang diganti kalau skema penilaian sekolah beda (mis.
 * pakai skala berbeda per mapel).
 */
export function getGradePredicate(score: number): string {
  if (score >= 90) return "A";
  if (score >= 85) return "A-";
  if (score >= 80) return "B+";
  if (score >= 75) return "B";
  if (score >= 70) return "B-";
  if (score >= 65) return "C+";
  if (score >= 60) return "C";
  return "D";
}

export function getGradeColorClass(score: number): string {
  if (score >= 85) return "text-success";
  if (score >= 75) return "text-primary";
  if (score >= 65) return "text-warning";
  return "text-danger";
}
