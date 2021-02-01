import * as p5 from "p5";
import useDOMControl from "../../customHooks/useDOMControl";
import styles from "./Art.module.css";

const Mathfun = () => {
  // Construct canvas node
  const p5Fn = (p5Ref) => {
    const sketch = (p) => {
      let x, y;

      p.setup = () => {
        p.createCanvas(400, 400);
        p.background(0);

        x = p.width / 2;
        y = p.height;
      };

      p.draw = () => {
        p.background(200);

        // Draw a circle
        p.stroke(50);
        p.fill(100);
        p.ellipse(x, y, 24, 24);

        // Jiggling randomly on the horizontal axis
        x = x + p.random(-1, 1);
        // Moving up at a constant speed
        y = y - 1;

        // Reset to the bottom
        if (y < 0) {
          y = p.height;
        }
      };
    };

    new p5(sketch, p5Ref);
  };

  return (
    <div>
      <h1>Math asd</h1>
      {/* Note: to style canvas use 'canvas' in css */}
      <div className={styles.artboard}>{useDOMControl(p5Fn)}</div>
    </div>
  ); // return
}; // Mathfun

export default Mathfun;
