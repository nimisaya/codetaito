import { useRef, useLayoutEffect, useState } from "react";
import styles from "../art/Art.module.css";
import useDropdown from "../../customHooks/useDropdown";

import { HexColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;
const DEFAULT_BKG_COLOR = "white";

const Zero = () => {
  // Dimensions options displayed in dropdown list
  const DIMENSIONS = ["Default"];
  // const DIMENSIONS = ["Default", "Instagram", "Zoom"];

  // canvasRef.current holds the canvas DOM node.
  const canvasRef = useRef();

  const title = "zero";
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);

  const [color, setColor] = useState("#000000");
  const [dimensions, DimensionsDropdown] = useDropdown(
    "Dimensions",
    DIMENSIONS[0],
    DIMENSIONS
  );

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    // Set the context to 2D graphics
    const context = canvas.getContext("2d", { alpha: false }); // turn transparency off to improve performance (unless required)

    // Set canvas dimensions
    updateWidthHeight(dimensions, setWidth, setHeight);
    // updateWidthHeight(dimensions);
    canvas.width = width;
    canvas.height = height;

    // Set css canvas dimensions
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // If the canvas ratio changes then the context has to be scaled appropriately
    // context is what is actually appearing on the screen
    // context.scale(0.5, 0.5);
    // Set pixel density
    setPixelDensity(context, canvas);

    context.fillStyle = DEFAULT_BKG_COLOR;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw a circle --------------------
    // const render = graphics(context, canvas, color);
    const render = graphics(context, canvas, color);

    // render graphics
    render();
  }, [width, height, color, dimensions]); // useEffect

  const saveFileBtn = () => {
    const canvasID = canvasRef.current.id;
    const image = document.getElementById(canvasID);
    const link = document.createElement("a");
    link.download = `${canvasID}`;
    link.href = image.toDataURL("image/png"); //  Convert canvas content to base64 string
    link.click();
  }; // saveFileBtn

  return (
    <div>
      <div className={styles.wrapper}>
        {/* CANVAS ========================== */}
        <canvas ref={canvasRef} id={title}></canvas>

        {/* MENU ========================== */}
        <div className={styles.canvasMenu}>
          <h1>{title}</h1>
          <button onClick={saveFileBtn}>Save</button>
          <br />
          <hr />
          <h2>Settings</h2>
          <DimensionsDropdown />
          <br />
          {/* <ColorDropdown /> */}
          <HexColorPicker color={color} onChange={setColor} />
          <p className={styles.dimensions}>
            <small>
              {width} x {height}
            </small>
          </p>
        </div>
      </div>
    </div>
  ); // return
}; // Zero

export default Zero;

const updateWidthHeight = (dimensions, setWidth, setHeight) => {
  switch (dimensions) {
    case "Instagram":
      setWidth(1080);
      setHeight(1080);
      break;
    case "Zoom":
      setWidth(1920 / 2);
      setHeight(1080 / 2);
      break;
    default:
      setWidth(DEFAULT_WIDTH);
      setHeight(DEFAULT_HEIGHT);
      break;
  }
};

// GRAPHICS =========================================================

const graphics = (context, canvas, color) => {
  return () => {
    // Draw circle
    context.beginPath();
    context.arc(
      canvas.width / 2, // x (center)
      canvas.height / 2, // y (center)
      canvas.width / 4, // r
      0, // startAngle
      2 * Math.PI // endAngle
    );
    context.fillStyle = color;
    context.fill();

    // Draw Rectangles that overlap
    context.fillStyle = "rgb(200, 0, 0)";
    context.fillRect(10, 10, 50, 50);

    context.fillStyle = "rgba(0, 0, 200, 0.5)";
    context.fillRect(30, 30, 50, 50);

    // Draw rectangle that cuts out shape
    context.clearRect(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 4,
      60
    );

    // Draw triangle
    context.beginPath();
    context.moveTo(75, 50);
    context.lineTo(100, 75);
    context.lineTo(100, 25);
    context.fill();

    context.beginPath();
    context.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    context.moveTo(110, 75); // Place the starting point somewhere else
    context.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
    context.moveTo(65, 65);
    context.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
    context.moveTo(95, 65);
    context.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
    context.stroke();

    context.beginPath();
    context.moveTo(canvas.width / 2, canvas.height / 2);
    context.lineTo(10, 10);
    context.lineTo(200, 200);
    context.strokeStyle = "white";
    context.stroke();
  };
};

// DISPLAY =========================================================
// Pixel ratio of the device
const getPixelRatio = (context) => {
  const backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  return (window.devicePixelRatio || 1) / backingStore;
}; // getPixelRatio

// Set pixel density of the canvas based on device pixel ratio to improve resolution on display
const setPixelDensity = (context, canvas) => {
  const ratio = getPixelRatio(context);
  // Get the width and height based on the values set based on the values set in css
  const width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
  const height = getComputedStyle(canvas)
    .getPropertyValue("height")
    .slice(0, -2);
  // Set the width and height of the canvas based on the ratio
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  //Update the css width and height
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
}; // setPixelDensity
