// halaman detail product. penggunaan dinamic routing
import { fetcher } from "@/lib/swr/fetcher";
import ProductType from "@/types/product.type";
import DetailProduct from "@/views/DetailProduct";
import { useRouter } from "next/router"; // untuk import hook untuk routing path
import useSWR from "swr";
const DetailProductPage = ({ product }: { product: ProductType }) => {
  const { query } = useRouter(); // penggunaan bisa menggunakan distructuring

  // untuk fetch data secara client side rendering
  // const { data, error, isLoading } = useSWR(
  //   `/api/product/${query.product}`,
  //   fetcher
  // ); // menggunakan useSWR untuk fetch data API

  console.log(query.product);
  return (
    <div>
      {/* client side rendering */}
      {/* <DetailProduct p={isLoading ? {} : data.data}></DetailProduct> */}

      {/* server side rendering */}
      <DetailProduct p={product}></DetailProduct>
    </div>
  );
};

export default DetailProductPage;

// untuk fetch data secara server side rendering
// export const getServerSideProps = async ({
//   params,
// }: {
//   params: { product: string };
// }) => {
//   //pemanggilan params dilakukan secara destructuring
//   // untuk memanggil api
//   const res = await fetch(
//     `http://localhost:3000/api/product/${params.product}`
//   );
//   const response = await res.json();
//   console.log(response);
//   return {
//     props: {
//       product: response.data,
//     },
//   };
// };

// untuk memanggil data secara static

// diperlukan untuk memanggil data id yg diteruskan pada getStaticProps secara static
export async function getStaticPaths() {
  const res = await fetch("http://localhost:5500/api/product");
  const response = await res.json();
  const paths = response.data.map((p: ProductType) => ({
    params: { product: p.id },
  }));
  return { paths, fallback: false };
}

export const getStaticProps = async ({
  params,
}: {
  params: { product: string };
}) => {
  // untuk memanggil api
  const res = await fetch(
    `http://localhost:5500/api/product/${params.product}`
  );
  const response = await res.json();
  return {
    props: {
      product: response.data,
    },
  };
};

// pengambilan data dinamis di dapatkan dari slug yang ada di nama file yang dikasih kurung[]

/**
 * penggunaan client side rendering
 * untuk mengambil secara sisi client side rendering maka memakai manual pakai fetch atau SWR
 * secara client side berarti ketika halaman pertama kali di load maka akan di render secara client side
 * atau ketika halaman di refresh maka akan di render secara client side
 * kekuranganya API muncul di browser pada inspect di network
 *
 * kelebihan menggunakan getServerSideProps dan getStaticProps adalah API nya bisa disembunyikan dari inspect pada network
 * juga tidak memerlukan skeleton untuk loading ketika halaman pertama kali di load. tidak seperti client side rendering
 *
 * penggunaan getServerSideProps
 * untuk menampilkan data pada halaman product di sisi server
 * getServerSideProps wajib menggunakan async dan await karena menggunakan teknik asyncronous
 * serta wajib mereturn hasil dari getServerSideProps
 *
 * penggunaan getStaticProps
 * halaman static dimuat ketika dibuild saja
 * perlu diketahui api harus dihasil kan dari luar next.js misal pakai express.js atau hapi server
 * ketika di build maka yang terjadi di back end api tidak akan dijalankan di static. karena sifatnya static tidak dinamis
 * ketika ingin memperbarui data maka diperlukan bulid ulang lagi
 * penggunaan getStaticProps hanya untuk halaman yg ingin diakses secara static
 * untuk pengambilan data dinamis pada staticProps wajib menggunakan getStaticPaths
 * getStaticPaths untuk mengambil data id nya dan diteruskan ke getStaticProps
 */
