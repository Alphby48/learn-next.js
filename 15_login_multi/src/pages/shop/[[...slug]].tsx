// halaman detail product. penggunaan dinamic routing
import { useRouter } from "next/router"; // untuk import hook untuk routing path
const ShopPage = () => {
  const { query } = useRouter(); // penggunaan bisa menggunakan distructuring
  console.log(query);
  return (
    <div>
      <h1>Detail Product Page</h1>
      <p>Product : {`${query.slug && query.slug[0] + "/" + query.slug[1]}`} </p>
    </div>
  );
};

export default ShopPage;

// pengambilan data dinamis di dapatkan dari slug yang ada di nama file yang dikasih kurung dan titik tiga sebagai sedtructuring [...slug].tsx
// juga terdapat cara lagi jika pengen akses shopnya saja pakai [[...slug]].tsx artinya slugnya opsioal
