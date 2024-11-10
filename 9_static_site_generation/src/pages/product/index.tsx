import ProductView from "@/views/Product/Main";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetcher } from "@/lib/swr/fetcher";
import useSWR from "swr";

// halaman product. pembuatan halaman bisa menggunakan arrow function
const ProductPage = () => {
  const [isLogin, setIsLogin] = useState(true); // getter dan setter untuk login
  const { push } = useRouter(); // menggunakan destructuring dari useRouter
  // const [product, setProduct] = useState([]); // getter dan setter untuk product

  // untuk mengecek login
  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, []);

  // untuk memanggil api

  const { data, error, isLoading } = useSWR("/api/product", fetcher); // menggunakan useSWR untuk fetch data API

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/product")
  //     .then((res) => res.json())
  //     .then((data) => setProduct(data.data));
  // }, []);

  return (
    <div>
      <ProductView product={isLoading ? [] : data.data} />
    </div>
  );
};

export default ProductPage;

/*
type Product adalah typenya untuk memanggil didalam state product.
ketika di map maka kita harus memasukan typenya kalau tidak bakal eror
<ProductView product={product} /> ini memanggil yang ada di fol view. karna ui disendirikan
*/
