import Image from "next/image";
import styles from "./Product.module.scss";
import ProductType from "@/types/product.type";
import Link from "next/link";
// type untuk props dan product
// type ProductType = {
//   id: number;
//   name: string;
//   price: number;
//   size: string;
//   category: string;
//   image: string;
// };

const ProductView = ({ product }: { product: ProductType[] }) => {
  return (
    <div className={styles.product}>
      <h1 className={styles.product__title}>Product</h1>

      <div className={styles.product__content}>
        {product.length > 0 ? (
          <>
            {product.map((p: ProductType) => (
              <Link
                href={`/product/${p.id}`}
                key={p.id}
                className={styles.product__content__item}
              >
                <div className={styles.product__content__item__image}>
                  <Image
                    src={p.image}
                    width={200}
                    height={200}
                    alt={p.name}
                  ></Image>
                </div>
                <h4 className={styles.product__content__item__name}>
                  {p.name}
                </h4>
                <p className={styles.product__content__item__category}>
                  {p.category}
                </p>
                <p className={styles.product__content__item__size}>{p.size}</p>
                <p className={styles.product__content__item__price}>
                  {p.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
              </Link>
            ))}
          </>
        ) : (
          <div className={styles.product__content__skeleton}>
            <div className={styles.product__content__skeleton__image}></div>
            <div className={styles.product__content__skeleton__name}></div>
            <div className={styles.product__content__skeleton__category}></div>
            <div className={styles.product__content__skeleton__size}></div>
            <div className={styles.product__content__skeleton__price}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductView;

/**
 * penggunaan product view tersebut kita memanfaatkan skeleton untuk loading ketika halaman pertama kali di load
 * dengan memanfaatkan operation ternary apabila data belum muncul dari API maka di render skeleton, jika sudah muncul maka di render product
 */
