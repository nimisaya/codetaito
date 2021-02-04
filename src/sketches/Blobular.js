import circle from "./Circle";

// CHANGE APPROACH
// Add all the points to an array (linked list style?)
// Use curve to and draw from point a to c through b
// ensure the path is closed and fill

// Relevant
//xt, yt is the point to draw through
// x0, y0, x2, y2 is the end points
// x1 = xt * 2 - (x0 - x2) / 2;
// y1 = yt * 2 - (y0 - y2) / 2;
// moveTo(x0, y0);
// curveTo(x1, y1, x2, y2);

// =========================================

const Blobular = (context, canvas, color) => {
  // // Convert to relative polar co-ordinates
  const cx = canvas.width / 2; // c * x
  const cy = canvas.height / 2; // c * y;

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.beginPath();
  const points = 630; // number of points

  const shape = (theta) => {
    return Math.cos(theta) * Math.sin(theta);
  };

  Array.from(Array(points).keys()).forEach((idx) => {
    const theta = idx * 1;
    const r = canvas.width * (1 / 4) * shape(theta);
    const randR = r + getRandomIntInclusive(0, r);
    const x = cx + randR * Math.cos(4 * theta);
    const y = cy + randR * Math.sin(4 * theta);
    context.lineTo(x, y);
  });

  context.strokeStyle = "white";
  context.lineWidth = 4;
  context.lineJoin = "round";
  context.stroke();
  context.fillStyle = "white";
  context.fill();
  context.closePath();

  context.beginPath();
  Array.from(Array(points).keys()).forEach((idx) => {
    const theta = idx * 0.01;
    const r = canvas.width * (1 / 5) * shape(theta);
    const randR = r + getRandomIntInclusive(0, r);
    const x = cx + randR * Math.cos(theta);
    const y = cy + randR * Math.sin(theta);
    context.lineTo(x, y);
  });

  context.strokeStyle = color;
  context.lineWidth = 4;
  context.lineJoin = "round";
  context.stroke();
  context.fillStyle = color;
  context.fill();
  context.closePath();
};

export default Blobular;

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}; // getRandomIntInclusive

//   const numberOfPoints = 57;
//   //   const points = new Array(numberOfPoints);

// //   const points = [...Array(numberOfPoints).keys()].map((i) => (i += 0.4));

//   console.log(points[50]);
//   //   // Start the path
//   //   context.beginPath();

//   //   // Draw random points
//   //   for (let i = 0; i <= Math.PI * 2; i += 0.4) {
//   //     // Randomise distance between origin and points by changing the length of the radius
//   //     const randR = r + getRandomIntInclusive(0, r);

//   //     // Convert relative polar coordinates to cartesian
//   //     x = Math.cos(i) * randR + cx;
//   //     y = Math.sin(i) * randR + cy;

//   //     // Construct array of points
//   //     points.push(x, y);

//   //     if (i === 0) {
//   //       // Move to the first point
//   //       context.moveTo(x, y);
//   //       // Set the last point position to equal the first so they join up
//   //       end = {
//   //         x: x,
//   //         y: y,
//   //       };
//   //       //   circle(context, "hotpink", x, y, canvas.width / 200);
//   //     } else {
//   //       //   context.bezierCurveTo(cpStart.x, cpStart.y, cpEnd.x, cpEnd.y, x, y);
//   //       context.lineTo(cpStart.x, cpStart.y, cpEnd.x, cpEnd.y, x, y);
//   //       context.fillStyle = color;
//   //       context.strokeStyle = color;
//   //       context.lineWidth = 4;
//   //       context.lineJoin = "round";
//   //       //   context.closePath();
//   //       context.stroke();
//   //       context.fill();

//   //       // draw points around the graph
//   //       //   circle(context, color, x, y, canvas.width / 200);
//   //     }
//   //   }
//   //   // Last point should join first point
//   //   //   context.bezierCurveTo(cpStart.x, cpStart.y, cpEnd.x, cpEnd.y, end.x, end.y);
//   //   context.lineTo(cpStart.x, cpStart.y, cpEnd.x, cpEnd.y, end.x, end.y);
//   //   //   context.bezierCurveTo(cpStart.x, cpStart.y, cpEnd.x, cpEnd.y, end.x, end.y);

//   //   context.fillStyle = color;
//   //   context.strokeStyle = color;
//   //   context.lineWidth = 4;
//   //   context.lineJoin = "round";
//   //   context.closePath();
//   //   context.stroke();
//   //   context.fill();
//   //   context.closePath();
//   //   circle(context, "green", end.x, end.y, canvas.width / 200);
// }; // Blobular

// export default Blobular;

// const getRandomIntInclusive = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
// }; // getRandomIntInclusive
