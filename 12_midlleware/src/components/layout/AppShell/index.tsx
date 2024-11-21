import { useRouter } from "next/router";
import Navbar from "../navbar";

type AppShellProps = {
  children: React.ReactNode;
}; // type untuk props

const disablePath = ["/auth/login", "/auth/register", "/404"];
const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const { pathname } = useRouter();
  return (
    <main>
      {!disablePath.includes(pathname) && <Navbar />}
      {children}
    </main>
  );
};

export default AppShell;

/*
pembuatan appshell untuk merapikan layout di _app.tsx 
*/
