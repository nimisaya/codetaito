import { useRef, useLayoutEffect, useState } from "react";

import styles from "./Art.module.css";

import Navbar from "../navbar/Navbar";

const Zero = () => {
  // canvasRef.current holds the canvas DOM node.
  const canvasRef = useRef();

  const title = "zero";
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(400);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    // Set the context to 2D graphics
    const context = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Set css canvas dimensions
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Set pixel density
    setPixelDensity(context, canvas);

    // Draw a circle --------------------
    const render = () => {
      context.beginPath();
      context.arc(
        canvas.width / 4,
        canvas.height / 4,
        canvas.width / 4,
        0,
        2 * Math.PI
      );
      context.fill();
    };

    // render graphics
    render();
  }, [width, height]); // useEffect

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
      <Navbar />
      <div className={styles.wrapper}>
        <ul className={styles.canvasMenu}>
          <li>
            <h1>{title}</h1>
          </li>
          <li>
            <button onClick={saveFileBtn}>Save</button>
          </li>
        </ul>

        <label htmlFor="width">
          Width
          <input
            id="width"
            value={width}
            placeholder="Width"
            onChange={(e) => setWidth(e.target.value)}
          />
        </label>
        <label htmlFor="height">
          Height
          <input
            id="height"
            value={height}
            placeholder="height"
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>

        <canvas ref={canvasRef} id={title} onClick={saveFile()}></canvas>
      </div>
    </div>
  ); // return
}; // Zero

export default Zero;

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

const saveFile = () => {
  return (e) => {
    const link = document.createElement("a");
    link.download = "filename.png";
    link.href = e.target.toDataURL();
    link.click();
    console.log(link);
  };
}; // saveFile
