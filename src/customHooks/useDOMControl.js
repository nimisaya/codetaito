import React, { useRef, useLayoutEffect } from "react";

// Inspired by https://dev.to/christiankastner/creating-a-custom-d3-or-p5-hook-in-react-fap
// and https://dev.to/christiankastner/integrating-p5-js-with-react-i0d
const useDOMControl = (domFunc) => {
  const rootEl = document.getElementById("root");
  const footEl = document.getElementById("footer");

  const domRef = useRef(null);
  if (!domRef.current) {
    domRef.current = document.createElement("div");
  }

  useLayoutEffect(() => {
    domFunc(domRef.current);
    rootEl.appendChild(domRef.current);
    return () => rootEl.removeChild(domRef.current);
  });

  // // Create a DOM node reference
  // const domRef = useRef(null);

  // if (!domRef.current) {
  //   domFunc(domRef.current);
  // }

  // // Call the domFunc with the DOM element as an input
  // // ref.current refers to the the element e.g. <canvas></canvas>
  // useLayoutEffect(() => {

  //   // return () => docRoot.removeChild(domRef.current);
  // }, []);
  // }); // useEffect

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
