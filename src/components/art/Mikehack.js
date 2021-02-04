import styles from "../art/Art.module.css";
import "react-colorful/dist/index.css";
import { setPixelDensity } from "./setPixelDensity";
import { useState } from "react";

import { useRef, useLayoutEffect } from "react";
import SoundLog from "../../sketches/SoundLog";

// Sketches

const sketch = "Mikehack";
const DEFAULT_BKG_COLOR = "white";

let context;

const Mikehack = () => {
  const [amplitude, setAmplitude] = useState(1);
  // canvasRef.current holds the reference to the canvas DOM node. You can access its id using canvasRef.current.id
  const canvasRef = useRef();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    const width = 600;
    const height = 600;

    // Set the context to 2D graphics
    context = canvas.getContext("2d", { alpha: false }); // turn transparency off to improve performance (unless required)

    // Set canvas dimensions
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

    const render = graphics(context, canvas, amplitude);

    render();
  }, [amplitude]); // useEffect

  const saveFileBtn = () => {
    const canvasID = canvasRef.current.id;
    const image = document.getElementById(canvasID);
    const link = document.createElement("a");
    link.download = `${canvasID}`;
    link.href = image.toDataURL("image/png"); //  Convert canvas content to base64 string and set to download as png
    link.click();
  }; // saveFileBtn

  let volumeMeter;

  function VolumeMeter(audioCtx) {
    this.audioCtx = audioCtx;
    this.volume = 0.0;
    this.script = audioCtx.createScriptProcessor(2048, 1, 1);
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
      this.mic = this.audioCtx.createMediaStreamSource(stream);
      this.mic.connect(this.script);
      this.script.connect(this.audioCtx.destination);
      if (typeof callback !== "undefined") {
        callback(null);
      }
    } catch (e) {
      // what to do on error?
    }
  };
  VolumeMeter.prototype.stop = function () {
    this.mic.disconnect();
    this.script.disconnect();
  };

  const startRec = function () {
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
        setInterval(() => {
          setAmplitude((volumeMeter.volume * 100).toFixed(3));

          // SoundLog = (context, canvas, val);

          console.log(amplitude);
        }, 100);
      });
    }
    function handleError(error) {
      console.warn(error);
    }
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(handleSuccess)
      .catch(handleError);
  };
  function stopRec() {
    VolumeMeter.prototype.stop();
  }

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
          <h2>Recording</h2>
          <button onClick={startRec}>Start</button>
          <br />
          <button onClick={stopRec} disabled>
            Stop
          </button>
          <p className={styles.dimensions}>
            <small>600 x 600</small>
          </p>
        </div>
      </div>
    </div>
  ); // return
};

export default Mikehack;

const graphics = (context, canvas, amplitude) => {
  return () => {
    SoundLog(context, canvas, amplitude);
  };
};
