import Link from "next/link";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter(); // digunakan untuk routing path

  // fungsi handling login pada button login
  const handlingLogin = () => {
    router.push("/product"); // push ke halaman product
  };
  return (
    <div>
      <h1>halaman login</h1>
      <button onClick={handlingLogin}>login</button>
      <p>
        belum punya akun? <Link href="/auth/register">register sekarang</Link>
      </p>
    </div>
  );
};

export default LoginPage;
