import styles from "../art/Art.module.css";
import "react-colorful/dist/index.css";

import { useRef, useLayoutEffect, useState } from "react";
import useDropdown from "../../customHooks/useDropdown";
import { HexColorPicker } from "react-colorful";
import { setPixelDensity } from "./setPixelDensity";

// Sketches
import Ouch from "../../sketches/Ouch";
import Dancingpoints from "../../sketches/DancingPoint";
import Wreath from "../../sketches/Wreath";
import Junkblob from "../../sketches/JunkBlob";
import SoundLog from "../../sketches/SoundLog";

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;
const DEFAULT_BKG_COLOR = "white";

const Zero = () => {
  // Dimensions options displayed in dropdown list
  const DIMENSIONS = ["Default"];

  // Excluding additional options until resizing and resolution addressed
  // const DIMENSIONS = ["Default", "Instagram", "Zoom"];

  // Select sketch from dropdown list
  const SKETCHES = ["Wreath", "Ouch", "Dancing Points", "Point Blob"];

  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [color, setColor] = useState("#000000");

  const [dimensions, DimensionsDropdown] = useDropdown(
    "Choose a size",
    DIMENSIONS[0],
    DIMENSIONS
  );
  const [sketch, SketchesDropdown] = useDropdown(
    "Pick a sketch",
    SKETCHES[0],
    SKETCHES
  );

  // canvasRef.current holds the reference to the canvas DOM node. You can access its id using canvasRef.current.id
  const canvasRef = useRef();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    // Set the context to 2D graphics
    const context = canvas.getContext("2d", { alpha: false }); // turn transparency off to improve performance (unless required)

    // Set canvas dimensions
    updateWidthHeight(dimensions, setWidth, setHeight);
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

    // Set default background for canvas (avoid transparent to improve performance)
    context.fillStyle = DEFAULT_BKG_COLOR;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const render = graphics(context, canvas, color, sketch);

    render();
  }, [width, height, color, dimensions, sketch]); // useEffect

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
          <SketchesDropdown />
          <DimensionsDropdown />
          <br />
          {/* TODO: Only show colour picker when relevant to current sketch if isColorControlled = true */}
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

///////////////////////////////////////////////////////////////////
// GRAPHICS =======================================================
///////////////////////////////////////////////////////////////////

const graphics = (context, canvas, color, sketch) => {
  return () => {
    switch (sketch) {
      case "Wreath":
        Wreath(context, canvas, color);
        break;
      case "Ouch":
        Ouch(context, canvas, color);
        // Junkblob(context, canvas, color);
        break;
      case "Dancing Points":
        Dancingpoints(context, canvas, color);
        break;
      case "Sound Log":
        SoundLog(context, canvas, 2, 5);
        break;
      default:
        // spikeAudio(context, 300, 300, 200, color);
        Junkblob(context, canvas, color);
        break;
    }
  };
};

///////////////////////////////////////////////////////////////////
// DISPLAY ========================================================
///////////////////////////////////////////////////////////////////

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
