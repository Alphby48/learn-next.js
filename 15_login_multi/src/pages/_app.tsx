import AppShell from "@/components/layout/AppShell";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </SessionProvider>
  );
}
/*
Tag AppShell tersebut di import dari components/layout/AppShell. digunakan untuk merapikan layout di _app.tsx
*/
/**
1. Penyedia Sesi (SessionProvider):

 * SessionProvider digunakan untuk membungkus aplikasi dan menyediakan konteks sesi ke seluruh aplikasi.
 * Sesi (session) dari pageProps diteruskan ke SessionProvider.
 */
