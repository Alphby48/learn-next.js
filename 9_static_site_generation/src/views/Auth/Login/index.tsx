import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Login.module.scss";

const LoginView = () => {
  const router = useRouter(); // digunakan untuk routing path

  // fungsi handling login pada button login
  const handlingLogin = () => {
    router.push("/product"); // push ke halaman product
  };
  return (
    <div className={styles.login}>
      <h1 className="big">login Page</h1>
      <h2 className="text-3xl font-bold">masukan username dan password</h2>
      <button onClick={handlingLogin}>login</button>
      <p style={{ color: "red", fontSize: "20px" }}>
        belum punya akun? <Link href="/auth/register">register sekarang</Link>
      </p>
    </div>
  );
};

export default LoginView;
/*
ket:
pada div tersebut pemanggilan style class dengan styles.login yang didapatkan dari ./Login.module.css
pada h2 tersebut pemanggilan style menggunakan tailwind
pada h1 tersebut pemanggilan class big diambil dari global css
pada p tersebut styling diterapkan langsung ke javascriptnya langsung dengan cara style={{ color: "red", fontSize: "20px" }}
*/
