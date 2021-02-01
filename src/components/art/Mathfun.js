import * as p5 from "p5";
import useDOMControl from "../../customHooks/useDOMControl";
import styles from "./art.module.css";

const Mathfun = () => {
  // Construct canvas node
  const p5Fn = (p5Ref) => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(400, 400);
        p.background(0);
      };

      p.draw = () => {
        p.fill(255);
        p.ellipse(p.width / 2, p.height / 2, 200);
      };
    };

    new p5(sketch, p5Ref);
  };

  return (
    <div>
      <h1>Mathfun</h1>
      <div className={styles.artboard}>{useDOMControl(p5Fn)}</div>
    </div>
  ); // return
}; // Mathfun

export default Mathfun;
