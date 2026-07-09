/**
 * Authentication Service (sementara)
 * Nanti akan dihubungkan ke backend Laravel.
 */

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  async login(data: LoginPayload) {
    // Simulasi request
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      message: "Login berhasil",
      user: {
        email: data.email,
      },
    };
  },
};