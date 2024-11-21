import Image from "next/image";
import styles from "../styles/404.module.scss";
const CustomError = () => {
  return (
    <div className={styles.not_found}>
      <div className={styles.box_not_found}>
        <Image
          src={"/not_found.svg"}
          alt="not_found"
          width={300}
          height={300}
        ></Image>
        <p>Page Not Found</p>
      </div>
    </div>
  );
};

export default CustomError;

/*
halaman not found
pembuatan image sebaiknya pakai Image dari next.js nya
*/
