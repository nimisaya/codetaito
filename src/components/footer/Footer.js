import "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <a href="https://github.com/nimisaya" target="_blank" rel="noreferrer">
        <p>&copy; Amanda Jarvinen, 2021 </p>
      </a>
      <p>
        <Link to="/mikehack">&nbsp; 💥 </Link>
      </p>
    </footer>
  ); // return
}; // Footer

export default Footer;
