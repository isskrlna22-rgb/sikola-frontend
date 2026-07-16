import type { UserRole } from "@/components/ui/role-switch";

export interface LoginPayload {
  role: UserRole;
  email: string;
  password: string;
}

export interface LoginResult {
  firstLogin: boolean;
  user: {
    id: number;
    nama: string;
    email: string;
    role: string;
  };
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
    const response = await fetch("http://127.0.0.1:8000/api/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: payload.email,
    password: payload.password,
  }),
});
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
localStorage.setItem("user", JSON.stringify(data.user));
  return {
  firstLogin: false,
  user: data.user,
};
},
async getStudentDashboard(email: string) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/student/dashboard?email=${email}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
},
  /**
   * Step 1 - Forgot Password: minta backend mengirim kode OTP ke email
   * terdaftar. Tidak mengembalikan apa pun selain sukses/gagal — backend
   * sengaja tidak boleh bocorkan apakah email terdaftar atau tidak (demi
   * keamanan), jadi UI selalu lanjut ke halaman OTP apa pun hasilnya.
   */
  async requestPasswordReset(email: string): Promise<void> {
    // TODO: const res = await httpClient.post("/api/auth/forgot-password", { email });
    const response = await fetch("http://127.0.0.1:8000/api/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Gagal mengirim OTP");
  }

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
    const response = await fetch("http://127.0.0.1:8000/api/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      otp: code,
    }),
  });
   const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "OTP tidak valid");
  }

  return {
    resetToken: "verified",
  };
  },

  /** Step 2b - kirim ulang kode OTP (tombol "Kirim ulang kode"). */
  async resendOtp(email: string): Promise<void> {
    // TODO: const res = await httpClient.post("/api/auth/resend-otp", { email });
  
 const response = await fetch("http://127.0.0.1:8000/api/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),

  });
   const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Gagal mengirim ulang OTP");
  }
  },

  /**
   * Step 3 - Create New Password (alur lupa password, pakai resetToken
   * dari step OTP). Konteks ini BEDA dari changePasswordFirstLogin di
   * bawah — di sini pengguna belum login sama sekali.
   */
  async resetPasswordWithToken({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}): Promise<void> {
  const response = await fetch("http://127.0.0.1:8000/api/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password: newPassword,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Gagal mengubah password.");
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
