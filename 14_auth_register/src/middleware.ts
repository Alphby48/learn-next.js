import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(req: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, ["/profile"]);

/**
1. Fungsi mainMiddleware:

 * mainMiddleware adalah middleware utama yang saat ini hanya meneruskan permintaan tanpa melakukan pemeriksaan atau modifikasi tambahan.
 * Fungsi ini mengembalikan NextResponse.next(), yang berarti permintaan akan diteruskan ke handler berikutnya atau ke rute yang sesuai.

2. Menggunakan withAuth untuk Melindungi Rute:

 * withAuth adalah higher-order middleware (middleware tingkat tinggi) yang membungkus mainMiddleware dan menambahkan pemeriksaan autentikasi.
 * Dalam contoh ini, withAuth(mainMiddleware, ["/profile"]) menyiratkan bahwa rute /profile memerlukan autentikasi.
 * Jika pengguna mencoba mengakses /profile tanpa token yang valid, mereka akan dialihkan ke halaman login.
 */
