import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// halaman product. pembuatan halaman bisa menggunakan arrow function
const ProductPage = () => {
  const [isLogin, setIsLogin] = useState(true); // getter dan setter untuk login
  const { push } = useRouter(); // menggunakan destructuring dari useRouter
  const [product, setProduct] = useState([]); // getter dan setter untuk product

  type Product = {
    id: number;
    name: string;
    price: number;
    size: string;
  };

  // untuk mengecek login
  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, []);

  // untuk memanggil api
  useEffect(() => {
    fetch("http://localhost:3000/api/product")
      .then((res) => res.json())
      .then((data) => setProduct(data.data));
  }, []);

  return (
    <div>
      <h1>Product Page</h1>
      {product.map((p: Product) => (
        <p key={p.id}>{p.name}</p>
      ))}
    </div>
  );
};

export default ProductPage;

/*
type Product adalah typenya untuk memanggil didalam state product.
ketika di map maka kita harus memasukan typenya kalau tidak bakal eror
*/
