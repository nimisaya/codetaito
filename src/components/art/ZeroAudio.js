import styles from "../art/Art.module.css";
import "react-colorful/dist/index.css";
import useDropdown from "../../customHooks/useDropdown";

import { useRef, useLayoutEffect, useState } from "react";
import circle from "../../sketches/Circle";

// Sketches

const sketch = "Audio";
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;
const DEFAULT_BKG_COLOR = "white";

let context;

const ZeroAudio = () => {
  // Dimensions options displayed in dropdown list
  const DIMENSIONS = ["Default"];

  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);

  const [dimensions, DimensionsDropdown] = useDropdown(
    "Choose a size",
    DIMENSIONS[0],
    DIMENSIONS
  );

  // canvasRef.current holds the reference to the canvas DOM node. You can access its id using canvasRef.current.id
  const canvasRef = useRef();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    // Set the context to 2D graphics
    context = canvas.getContext("2d", { alpha: false }); // turn transparency off to improve performance (unless required)

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

    const render = graphics(context, canvas);

    render();
  }, [width, height, dimensions]); // useEffect

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
          <button onClick={startRec}>Mic</button>
          <DimensionsDropdown />
          <p className={styles.dimensions}>
            <small>
              {width} x {height}
            </small>
          </p>
        </div>
      </div>
    </div>
  ); // return
}; // ZeroAudio

export default ZeroAudio;

///////////////////////////////////////////////////////////////////
// GRAPHICS =======================================================
///////////////////////////////////////////////////////////////////

const graphics = (ctx, canvas) => {
  return () => {
    let volumeMeter;
    let scale;

    function VolumeMeter(context) {
      this.context = context;
      this.volume = 0.0;
      this.script = context.createScriptProcessor(2048, 1, 1);
      this.script.onaudioprocess = (event) => {
        const input = event.inputBuffer.getChannelData(0);
        var sum = 0.0;
        for (var i = 0; i < input.length; ++i) {
          sum += input[i] * input[i];
        }
        this.volume = Math.sqrt(sum / input.length);
      };
    }

    VolumeMeter.prototype.connectToSource = function (stream, callback) {
      try {
        this.mic = this.context.createMediaStreamSource(stream);
        this.mic.connect(this.script);
        this.script.connect(this.context.destination);
        if (typeof callback !== "undefined") {
          callback(null);
        }
      } catch (e) {
        console.warn(e);
      }
    };
    VolumeMeter.prototype.stop = function () {
      this.mic.disconnect();
      this.script.disconnect();
    };

    const startRec = function () {
      // const volumeValue = document.querySelector('#volume');
      try {
        window.audioContext = new AudioContext();
      } catch (e) {
        alert("Web Audio API not supported.");
      }
      const constraints = {
        audio: true,
        video: false,
      };
      function handleSuccess(stream) {
        volumeMeter = new VolumeMeter(window.audioContext);
        volumeMeter.connectToSource(stream, function () {
          //   setInterval(() => {
          //     const val = volumeMeter.volume.toFixed(3);
          //     console.log(val);
          //   }, 1000);

          function repeatOften() {
            const r = volumeMeter.volume.toFixed(3);
            circle(ctx, 400, 400, r, "black");

            // if (x < 900) {
            //   x += 2;
            // }

            requestAnimationFrame(repeatOften);
          }
          requestAnimationFrame(repeatOften);
        });
        // setInterval(() => {

        //   scale = parseInt( $scale.val() );
        //   const val = (volumeMeter.volume * scale).toFixed(3);
        //   // volumeValue.value = val;//volumeMeter.volume.toFixed(2);

        //   imgNumber = Math.floor(IMAGE_COUNT * val);
        //   // console.log({imgNumber, xNorm});
        //   if(imgNumber < 0){
        //     imgNumber = 0;
        //   } else if(imgNumber > IMAGE_COUNT-1){
        //     imgNumber = IMAGE_COUNT-1;
        //   }
        //   $img.attr('src', `img/${IMAGE_NAME}${imgNumber}.png`);

        // }, UPDATE_INTERVAL);
      }
      function handleError(error) {
        // what to do on error?
      }
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(handleSuccess)
        .catch(handleError);
    };
    const stopRec = function () {
      VolumeMeter.prototype.stop();
    };
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
