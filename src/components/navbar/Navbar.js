import { Link } from "react-router-dom";
import logo from "../../images/logo192.png";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav>
      {/* <div className={styles.branding}> */}
      <Link to="/">
        <header className={styles.navbar}>
          <img src={logo} alt="codetaito" />
          <p className={styles.logo}>codetaito</p>
        </header>
      </Link>
      {/* </div> */}
    </nav>
  ); // return
}; // Navbar

export default Navbar;
