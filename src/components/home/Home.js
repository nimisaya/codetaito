import styles from "./Home.module.css";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Generate unique art</h1>
      <Link to="/art/mathfun" className={styles.sketchlink}>
        Get started
      </Link>
    </>
  ); // return
}; // Home

export default Home;
