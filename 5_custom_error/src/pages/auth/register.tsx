import Link from "next/link";

const RegisterPage = () => {
  return (
    <div>
      <h1>halaman Register</h1>
      <p>
        sudah punya akun? <Link href="/auth/login">login sekarang</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
