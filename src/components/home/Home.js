import styles from "./Home.module.css";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Generate unique art</h1>
      <ul>
        <li>
          <Link to="/art" className={styles.sketchlink}>
            Zero
          </Link>
        </li>
      </ul>
    </>
  ); // return
}; // Home

export default Home;
