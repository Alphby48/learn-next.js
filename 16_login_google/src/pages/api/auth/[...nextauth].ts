import bcrypt from "bcrypt";
import { signIn, signInWithGoogle } from "@/lib/firebase/service";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn({ email });

        if (user) {
          const passwordConfirm = await bcrypt.compare(password, user.password);

          if (passwordConfirm) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user?.email;
        token.fullname = user?.fullname;
        token.role = user?.role;
      }
      // console.log({ token, account, user });
      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          type: "google",
          role: "member",
        };
        await signInWithGoogle(
          data,
          (call: {
            status: boolean;
            data: any;
            message: string;
            statusCode: number;
          }) => {
            if (call.status) {
              token = call.data;
            }
          }
        );
        console.log(data);
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      // console.log({ session, token });
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
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
