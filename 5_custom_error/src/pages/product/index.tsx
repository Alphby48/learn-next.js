import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// halaman product. pembuatan halaman bisa menggunakan arrow function
const ProductPage = () => {
  const [isLogin, setIsLogin] = useState(false); // getter dan setter untuk login
  const { push } = useRouter(); // menggunakan destructuring dari useRouter

  // untuk mengecek login
  // useEffect(() => {
  //   if (!isLogin) {
  //     push("/auth/login");
  //   }
  // }, []);
  return (
    <div>
      <h1>Product Page</h1>
    </div>
  );
};

export default ProductPage;
