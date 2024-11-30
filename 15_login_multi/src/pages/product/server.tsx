// halaman product yg dimuat di sisi server dulu baru di render
import ProductView from "@/views/Product/Main";
import ProductType from "../../types/product.type";
const ProductPage = (props: { product: ProductType[] }) => {
  const { product } = props;
  return <ProductView product={product}></ProductView>;
};

export default ProductPage;

// untuk memanggil data di sisi server
export const getServerSideProps = async () => {
  // untuk memanggil api
  const res = await fetch("http://localhost:3000/api/product");
  const response = await res.json();
  console.log(response);
  return {
    props: {
      product: response.data,
    },
  };
};

/**
 * penggunaan getServerSideProps
 * untuk menampilkan data pada halaman product di sisi server
 * getServerSideProps wajib menggunakan async dan await karena menggunakan teknik asyncronous
 * serta wajib mereturn hasil dari getServerSideProps
 */
