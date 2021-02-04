import { useEffect, useRef } from "react";
import styles from "../art/Art.module.css";
import { setPixelDensity } from "./setPixelDensity";
// import circle from "./circle";

const sketch = "Mikedrop";
const DEFAULT_BKG_COLOR = "white";

const Mikedrop = () => {
  const width = 600;
  const height = 600;

  const canvasRef = useRef();
  useEffect(() => {
    // canvasRef.current holds the reference to the canvas DOM node. You can access its id using canvasRef.current.id
    const canvas = canvasRef.current;

    // Set the context to 2D graphics
    const canvasContext = canvas.getContext("2d", { alpha: false }); // turn transparency (alpha) off to improve performance (unless required)

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Set css canvas dimensions
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Set pixel density
    setPixelDensity(canvasContext, canvas);

    // Set default background for canvas (avoid transparent to improve performance)
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  }, []); // useEffect

  const saveFileBtn = () => {
    const canvasID = canvasRef.current.id;
    const image = document.getElementById(canvasID);
    const link = document.createElement("a");
    link.download = `${canvasID}`;
    link.href = image.toDataURL("image/png"); //  Convert canvas content to base64 string and set to download as png
    link.click();
  }; // saveFileBtn

  return (
    <div>
      <div className={styles.wrapper}>
        {/* CANVAS ========================== */}
        <canvas ref={canvasRef} id={sketch}></canvas>
        {/* MENU ========================== */}
        <div className={styles.canvasMenu}>
          <h1>{sketch}</h1>
          <button onClick={saveFileBtn}>Save</button>
          <br />
          <hr />
          <h2>Settings</h2>

          <p className={styles.dimensions}>
            <small>
              {width} x {height}
            </small>
          </p>
        </div>
      </div>
    </div>
  ); // return
}; // Mikedrop

export default Mikedrop;

const graphics = (ctx, canvas) => {
  return <div>Hello</div>;
};
