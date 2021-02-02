import { useRef, useLayoutEffect, useState } from "react";
import styles from "../art/Art.module.css";
import useDropdown from "../../customHooks/useDropdown";

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const Zero = () => {
  // Colour options displayed in dropdown list
  const COLORS = ["Black", "Blue", "Hotpink", "Red", "Green"];

  // Dimensions options displayed in dropdown list
  const DIMENSIONS = ["Default"];
  // const DIMENSIONS = ["Default", "Instagram", "Zoom"];

  // canvasRef.current holds the canvas DOM node.
  const canvasRef = useRef();

  const title = "zero";
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);

  // const [color, setColour] = useState("black");
  const [color, ColorDropdown] = useDropdown("Colour", COLORS[0], COLORS);
  const [dimensions, DimensionsDropdown] = useDropdown(
    "Dimensions",
    DIMENSIONS[0],
    DIMENSIONS
  );

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    // Set the context to 2D graphics
    const context = canvas.getContext("2d");

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

    // Draw a circle --------------------
    const render = () => {
      context.beginPath();
      // x (center), y (center), r, startAngle, endAngle
      context.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 4,
        0,
        2 * Math.PI
      );
      context.fillStyle = color;
      context.fill();
    };

    // render graphics
    render();
  }, [width, height, color, dimensions]); // useEffect

  const saveFileBtn = () => {
    // console.log(canvasRef);
    const canvasID = canvasRef.current.id;
    const image = document.getElementById(canvasID);
    const link = document.createElement("a");
    link.download = `${canvasID}`;
    link.href = image.toDataURL("image/png"); //  Convert canvas content to base64 string
    link.click();
    // console.log(link);
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
          <ColorDropdown />
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
      setWidth(1920);
      setHeight(1080);
      break;
    default:
      setWidth(DEFAULT_WIDTH);
      setHeight(DEFAULT_HEIGHT);
      break;
  }
};

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
