import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        fullname: { label: "Full Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password, fullname } = credentials as {
          email: string;
          password: string;
          fullname: string;
        };
        const user: any = {
          id: 1,
          email: email,
          fullname: fullname,
          password: password,
        };
        if (user) {
          console.log(user);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user?.email;
        token.fullname = user?.fullname;
      }
      console.log({ token, account, user });
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      console.log({ session, token });
      return session;
    },
  },
};

export default NextAuth(authOptions);

/**
 * Alur Proses Autentikasi:
 
1. Konfigurasi NextAuth:

 * NextAuthOptions dikonfigurasi dengan beberapa opsi penting:
 * session: Mengatur strategi sesi, dalam hal ini menggunakan JSON Web Token (JWT).
 * secret: Kunci rahasia yang digunakan untuk menandatangani JWT, diambil dari variabel lingkungan process.env.NEXTAUTH_SECRET.
 * providers: Daftar penyedia autentikasi, dalam hal ini menggunakan CredentialsProvider untuk autentikasi berbasis kredensial (email dan password).

2. Definisi Provider Kredensial:

 * CredentialsProvider digunakan untuk menangani login dengan email dan password.
 * Opsi credentials mendefinisikan label dan tipe input untuk email, full name, dan password.
 * Fungsi authorize digunakan untuk memverifikasi kredensial yang diberikan oleh pengguna.
 * Jika kredensial valid, fungsi ini mengembalikan objek pengguna (user).
 * Jika tidak valid, fungsi ini mengembalikan null.

3. Callback JWT:

Callback jwt menangani token JWT saat autentikasi berhasil.
 * Jika metode autentikasi adalah credentials, token diperbarui dengan email dan full name pengguna.
 * Log detail token, akun, dan pengguna untuk debugging.

4. Callback Session:

 * Callback session digunakan untuk menambahkan informasi tambahan ke sesi pengguna.
 * Menambahkan email dan full name dari token ke objek sesi.
 * Log detail sesi dan token untuk debugging.
 */
