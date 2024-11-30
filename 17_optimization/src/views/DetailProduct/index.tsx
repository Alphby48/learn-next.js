//halaman view detail product yang akan diteruskan ke pages. ibarat mentahannya
import Image from "next/image";
import styles from "./Detail.module.scss";
import ProductType from "@/types/product.type";
const DetailProduct = ({ p }: { p: ProductType }) => {
  return (
    <>
      <h1 className={styles.title}>Detail Product Page</h1>
      <div className={styles.productDetail}>
        <div className={styles.productDetail__image}>
          <Image src={p.image} width={200} height={200} alt={p.name}></Image>
        </div>
        <h4 className={styles.productDetail__name}>{p.name}</h4>
        <p className={styles.productDetail__category}>{p.category}</p>
        <p className={styles.productDetail__size}>{p.size}</p>
        <p className={styles.productDetail__price}>
          {p.price &&
            p.price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
        </p>
      </div>
    </>
  );
};

export default DetailProduct;

/**
 * penggunaan product view tersebut kita memanfaatkan skeleton untuk loading ketika halaman pertama kali di load
 * dengan memanfaatkan operation ternary apabila data belum muncul dari API maka di render skeleton, jika sudah muncul maka di render product
 */
