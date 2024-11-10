// halaman product yang dimuat secara statik
import ProductView from "@/views/Product/Main";
import ProductType from "../../types/product.type";
const ProductPage = (props: { product: ProductType[] }) => {
  const { product } = props;
  return <ProductView product={product}></ProductView>;
};

export default ProductPage;

// untuk memanggil data secara static
export const getStaticProps = async () => {
  // untuk memanggil api
  const res = await fetch("http://localhost:5500/api/product");
  const response = await res.json();
  return {
    props: {
      product: response.data,
    },
  };
};

/**
 * halaman static dimuat ketika dibuild saja
 * perlu diketahui api harus dihasil kan dari luar nex.js misal pakai express.js atau hapi server
 * ketika di build maka yang terjadi di back end api tidak akan dijalankan di static. karena sifatnya static tidak dinamis
 * ketika ingin memperbarui data maka diperlukan bulid ulang lagi
 * penggunaan getStaticProps hanya untuk halaman yg ingin diakses secara static
 */
