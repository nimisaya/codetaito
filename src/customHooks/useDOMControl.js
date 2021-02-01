import React, { useRef, useEffect } from "react";

// Inspired by https://dev.to/christiankastner/creating-a-custom-d3-or-p5-hook-in-react-fap
// and https://dev.to/christiankastner/integrating-p5-js-with-react-i0d
const useDOMControl = (domFunc) => {
  // Create a DOM node reference
  const domRef = useRef();

  // Call the domFunc with the DOM element as an input
  // ref.current refers to the the element e.g. <canvas></canvas>
  useEffect(() => {
    domFunc(domRef.current);
  }); // useEffect

  // Return the constructed element (e.g. <canvas>) for rendering
  return (
    <div
      ref={domRef}
      onClick={(e) => {
        const link = document.createElement("a");
        link.download = "filename.png";
        link.href = e.target.toDataURL();
        link.click();
        console.log(link);
      }}
    ></div>
  );
}; // useDOMControl

export default useDOMControl;
