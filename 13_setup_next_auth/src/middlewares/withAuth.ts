import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token) {
        const url = new URL("/", req.url);
        return NextResponse.redirect(url);
      }
    }
  };
}

/**
Alur Proses Kode:

1. Impor Modul yang Diperlukan:

 * getToken dari next-auth/jwt digunakan untuk mendapatkan token JWT dari permintaan.
 * NextFetchEvent, NextMiddleware, NextRequest, dan NextResponse dari next/server digunakan untuk menangani middleware Next.js.
 
2. Definisi Fungsi withAuth:

 * Fungsi withAuth adalah middleware yang memeriksa apakah halaman tertentu memerlukan autentikasi dan memverifikasi token JWT jika halaman tersebut memerlukan autentikasi.

3. Definisi Parameter:

 * middleware: Middleware berikutnya yang akan dijalankan setelah autentikasi.
 * requireAuth: Daftar path yang memerlukan autentikasi.
 * Pemeriksaan Path yang Memerlukan Autentikasi:
 * pathname diambil dari URL permintaan.
 * Fungsi memeriksa apakah requireAuth mengandung pathname saat ini.
 * Jika path termasuk dalam requireAuth, proses autentikasi dilanjutkan.

4. Pengambilan Token JWT:

 * getToken dipanggil dengan permintaan (req) dan kunci rahasia (secret) untuk mendapatkan token JWT.
 * secret diambil dari variabel lingkungan process.env.NEXTAUTH_SECRET.

5. Verifikasi Token:

 * Jika token tidak ada (!token), permintaan akan dialihkan ke halaman login ("/auth/login").
 * Jika token valid, middleware berikutnya akan dijalankan dengan NextResponse.next().
 */
