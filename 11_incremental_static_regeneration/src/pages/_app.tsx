import AppShell from "@/components/layout/AppShell";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  );
}
/*
Tag AppShell tersebut di import dari components/layout/AppShell. digunakan untuk merapikan layout di _app.tsx
*/
