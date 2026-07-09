import { redirect } from "next/navigation";

/**
 * "/" bukan halaman nyata di SIKOLA — sesuai flow di dokumentasi, titik
 * masuk aplikasi selalu Splash Screen. redirect() di sini jalan di server
 * (sebelum apa pun dikirim ke browser), jadi tidak ada flash halaman kosong.
 */
export default function RootPage() {
  redirect("/splash");
}
