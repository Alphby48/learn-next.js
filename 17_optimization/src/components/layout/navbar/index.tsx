// layout untuk membuat navbar
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.css"; //pemanggilan css
import Image from "next/image";
const Navbar = () => {
  const { data }: any = useSession();
  return (
    <div className={styles.navbar}>
      <h1 className="big">Navbar</h1>
      <div className={styles.right}>
        {data && data.user.image ? (
          <Image
            className="rounded-full"
            src={data && data.user.image}
            width={50}
            height={50}
            alt={data && data.user.fullname}
          ></Image>
        ) : null}
        <p>{data && data.user.fullname}</p>
        {data ? (
          <button className={styles.button} onClick={() => signOut()}>
            sign out
          </button>
        ) : (
          <button className={styles.button} onClick={() => signIn()}>
            signIn
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

/*
pemanggilan navbar css mengunakan styles.navbar
className H1 tersebut menggunakan className big dari global css
*/
/**
1. Menggunakan useSession untuk Mendapatkan Data Sesi:

 * useSession adalah hook dari next-auth/react yang digunakan untuk mendapatkan status sesi saat ini.
 * Data sesi (data) diperoleh dari hook ini.
 * Jika pengguna sudah masuk, tombol "sign out" akan ditampilkan dan mengeksekusi signOut saat diklik.
 * Jika pengguna belum masuk, tombol "signIn" akan ditampilkan dan mengeksekusi signIn saat diklik.
 */
