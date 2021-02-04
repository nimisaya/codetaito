import styles from "./Home.module.css";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Generate unique art</h1>
      <ul>
        <li>
          <Link to="/art" className={styles.sketchlink}>
            Get started
          </Link>
          <Link to="/art/mikedrop" className={styles.sketchlink}>
            mikedrop
          </Link>
        </li>
      </ul>
    </>
  ); // return
}; // Home

export default Home;
