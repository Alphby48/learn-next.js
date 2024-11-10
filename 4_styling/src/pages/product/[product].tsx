// halaman detail product. penggunaan dinamic routing
import { useRouter } from "next/router"; // untuk import hook untuk routing path
const DetailProductPage = () => {
  const { query } = useRouter(); // penggunaan bisa menggunakan distructuring
  console.log(query.id);
  return (
    <div>
      <h1>Detail Product Page</h1>
      <p>Product : {query.product} </p>
    </div>
  );
};

export default DetailProductPage;

// pengambilan data dinamis di dapatkan dari slug yang ada di nama file yang dikasih kurung[]
