// layout untuk membuat navbar
import styles from "./Navbar.module.css"; //pemanggilan css
const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <h1 className="big">Navbar</h1>
    </div>
  );
};

export default Navbar;

/*
pemanggilan navbar css mengunakan styles.navbar
className H1 tersebut menggunakan className big dari global css
*/
