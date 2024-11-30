import { useRouter } from "next/router";
import Navbar from "../navbar";
import { Poppins } from "next/font/google";

type AppShellProps = {
  children: React.ReactNode;
}; // type untuk props

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const disablePath = ["/auth/login", "/auth/register", "/404"];
const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const { pathname } = useRouter();
  return (
    <main className={poppins.className}>
      {!disablePath.includes(pathname) && <Navbar />}
      {children}
    </main>
  );
};

export default AppShell;

/*
pembuatan appshell untuk merapikan layout di _app.tsx 
*/
