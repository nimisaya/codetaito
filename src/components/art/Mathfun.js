import * as p5 from "p5";
import useDOMControl from "../../customHooks/useDOMControl";

const Mathfun = () => {
  const p5Fn = (p5Ref) => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(400, 400);
        p.background(0);
      };

      p.draw = () => {
        p.fill(255);
        p.ellipse(p.width / 2, p.height / 2, 400);
      };
    };

    new p5(sketch, p5Ref);
  };

  return (
    <div className="App">
      <h1>Mathfun</h1>
      {useDOMControl(p5Fn)}
    </div>
  ); // return
}; // Mathfun

export default Mathfun;
