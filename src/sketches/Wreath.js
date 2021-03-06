import circle from "./Circle";

const Wreath = (context, canvas, color) => {
  const r = canvas.width / 5; // radius will be max 1/5(canvasWidth)
  const cx = canvas.width / 2; // c * x
  const cy = canvas.height / 2; // c * y;
  let x;
  let y;
  let size;

  // Start the path
  context.beginPath();

  // Draw random points
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    // Randomise distance between origin and points by changing the length of the radius
    const randR = r + getRandomIntInclusive(0, r);

    // Convert relative polar coordinates to cartesian
    x = Math.cos(i) * randR + cx;
    y = Math.sin(i) * randR + cy;
    size = getRandomIntInclusive(100, 200);

    // draw points around the graph
    circle(context, color, x, y, canvas.width / size);
  }
};

export default Wreath;

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}; // getRandomIntInclusive
