import Navbar from "../navbar";

type AppShellProps = {
  children: React.ReactNode;
}; // type untuk props

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default AppShell;

/*
pembuatan appshell untuk merapikan layout di _app.tsx 
*/
