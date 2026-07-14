import type { UserRole } from "@/components/ui/role-switch";

export interface LoginPayload {
  role: UserRole;
  email: string;
  password: string;
}

export interface LoginResult {
  firstLogin: boolean;
  // Field lain (token/user profile/permission) menyusul begitu kontrak API
  // dari backend Laravel sudah fix (lihat catatan di AuthContext nanti).
}

export interface VerifyOtpResult {
  /** Token sementara untuk dipakai di step Reset Password (bukti OTP valid). */
  resetToken: string;
}

/**
 * Layer terpisah untuk semua panggilan API auth. TUJUANNYA: kalau nanti
 * backend pakai Sanctum/JWT/session cookie, yang berubah cukup isi
 * fungsi-fungsi di file ini — komponen halaman (Login, dst) tidak perlu
 * disentuh sama sekali.
 *
 * Saat ini masih stub (belum ada endpoint nyata dari backend), jadi
 * disimulasikan dengan delay. Ganti isi try-block dengan panggilan
 * fetch/axios ke endpoint asli begitu backend siap.
 */
export const authService = {
  async login(payload: LoginPayload): Promise<LoginResult> {
    // TODO: ganti dengan panggilan nyata, contoh:
    // const res = await httpClient.post("/api/auth/login", payload);
    // if (!res.ok) throw new Error(await res.text());
    // return res.json();
    await new Promise((resolve) => setTimeout(resolve, 900));

    if (!payload.email || !payload.password) {
      throw new Error("Email dan password wajib diisi.");
    }

    return { firstLogin: false };
  },

  /**
   * Step 1 - Forgot Password: minta backend mengirim kode OTP ke email
   * terdaftar. Tidak mengembalikan apa pun selain sukses/gagal — backend
   * sengaja tidak boleh bocorkan apakah email terdaftar atau tidak (demi
   * keamanan), jadi UI selalu lanjut ke halaman OTP apa pun hasilnya.
   */
  async requestPasswordReset(email: string): Promise<void> {
    // TODO: const res = await httpClient.post("/api/auth/forgot-password", { email });
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (!email) throw new Error("Email wajib diisi.");
  },

  /**
   * Step 2 - OTP Verification: kirim kode ke backend, dapat resetToken
   * kalau valid. resetToken ini dipakai step berikutnya supaya endpoint
   * reset-password tidak perlu terima OTP mentah lagi.
   */
  async verifyOtp({
    email,
    code,
  }: {
    email: string;
    code: string;
  }): Promise<VerifyOtpResult> {
    // TODO: const res = await httpClient.post("/api/auth/verify-otp", { email, code });
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (code.length < 6) {
      throw new Error("Kode verifikasi tidak valid.");
    }
    return { resetToken: `stub-reset-token-${email}` };
  },

  /** Step 2b - kirim ulang kode OTP (tombol "Kirim ulang kode"). */
  async resendOtp(email: string): Promise<void> {
    // TODO: const res = await httpClient.post("/api/auth/resend-otp", { email });
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (!email) throw new Error("Email wajib diisi.");
  },

  /**
   * Step 3 - Create New Password (alur lupa password, pakai resetToken
   * dari step OTP). Konteks ini BEDA dari changePasswordFirstLogin di
   * bawah — di sini pengguna belum login sama sekali.
   */
  async resetPasswordWithToken({
    resetToken,
    newPassword,
  }: {
    resetToken: string;
    newPassword: string;
  }): Promise<void> {
    // TODO: const res = await httpClient.post("/api/auth/reset-password", { resetToken, newPassword });
    void resetToken; // dipakai nanti saat endpoint asli tersambung
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (newPassword.length < 8) {
      throw new Error("Password minimal 8 karakter.");
    }
  },

  /**
   * Step 3 (alternatif) - Force Change Password saat first_login=true.
   * Konteks ini pengguna SUDAH login (ada sesi aktif), jadi tidak perlu
   * resetToken — cukup password baru + sesi yang sedang aktif.
   */
  async changePasswordFirstLogin(newPassword: string): Promise<void> {
    // TODO: const res = await httpClient.post("/api/auth/change-password", { newPassword });
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (newPassword.length < 8) {
      throw new Error("Password minimal 8 karakter.");
    }
  },

  /**
   * Logout — hapus sesi. Saat ini cuma simulasi delay (belum ada
   * AuthContext/token sungguhan untuk dihapus). TODO: begitu
   * AuthContext siap, tambahkan clear token/cookie di sini, lalu
   * pemanggil (halaman Profil) tetap tidak perlu berubah.
   */
  async logout(): Promise<void> {
    // TODO: await httpClient.post("/api/auth/logout");
    await new Promise((resolve) => setTimeout(resolve, 600));
  },

  /**
   * Ubah password dari halaman /profil/ubah-password (beda konteks dari
   * changePasswordFirstLogin/resetPasswordWithToken — di sini pengguna
   * SUDAH login dan tahu password lamanya). Dummy: password lama yang
   * "benar" untuk demo adalah "password123", sisanya dianggap salah,
   * supaya state gagal bisa didemokan tanpa backend.
   */
  async changePassword({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }): Promise<void> {
    // TODO: const res = await httpClient.post("/api/auth/change-password", { oldPassword, newPassword });
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (oldPassword !== "password123") {
      throw new Error("Password lama yang kamu masukkan salah.");
    }
    if (newPassword.length < 8) {
      throw new Error("Password baru minimal 8 karakter.");
    }
  },
};
