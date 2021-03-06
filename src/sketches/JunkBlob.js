// import circle from "./Circle";

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

const Junkblob = (context, canvas, color) => {
  const r = canvas.width / 8; // radius will be max 1/4(canvasWidth)
  const cx = canvas.width / 2; // c * x
  const cy = canvas.height / 2; // c * y;
  let x;
  let y;
  let end = {};
  let cpStart = {};
  let cpEnd = {};

  // Start the path
  context.beginPath();

  // Draw random points
  for (let i = 0; i <= Math.PI * 2; i += 0.4) {
    //   for (let i = 0; i < Math.PI * 2 - 0.4; i += 0.4) {
    // Randomise distance between origin and points by changing the length of the radius
    const randR = r + getRandomIntInclusive(0, r);

    // Convert relative polar coordinates to cartesian
    x = Math.cos(i) * randR + cx;
    y = Math.sin(i) * randR + cy;

    // The control points need to be based on the position of the point within the grid
    //                         3PI/2
    //                (-x, y)    |    (x, y)
    //            Pi --------------------------- 0, 2Pi
    //                (-x, -y)   |    (x, -y)
    //                         PI/2

    // Distance between the two points
    // Note need to add positions of points to an array or list
    // Actually only need prior so could just save to start.x and start.y
    // then this new point is end.x and end.y
    // so that the next position can refer to the prior position
    // const dx = end.x - start.x;
    // const dy = end.y - end.x;
    // const distance = Math.sqrt(dx ** dx + dy ** dy);

    cpStart = {
      x: x,
      y: y,
    };
    cpEnd = {
      x: x,
      y: y,
    };

    if (i === 0) {
      // Move to the first point
      context.moveTo(x, y);
      // Set the last point position to equal the first so they join up
      end = {
        x: x,
        y: y,
      };
      //   circle(context, "hotpink", x, y, canvas.width / 200);
    } else {
      context.bezierCurveTo(cpStart.x, cpStart.y, cpEnd.x, cpEnd.y, x, y);
      context.fillStyle = color;
      context.strokeStyle = color;
      context.lineWidth = 4;
      context.lineJoin = "round";
      //   context.closePath();
      context.stroke();
      context.fill();

      // draw points around the graph
      //   circle(context, color, x, y, canvas.width / 200);
    }
  }
  // Last point should join first point
  //   context.bezierCurveTo(cpStart.x, cpStart.y, cpEnd.x, cpEnd.y, end.x, end.y);
  context.bezierCurveTo(cpStart.x, cpStart.y, cpEnd.x, cpEnd.y, end.x, end.y);

  context.fillStyle = color;
  context.strokeStyle = color;
  context.lineWidth = 4;
  context.lineJoin = "round";
  context.closePath();
  context.stroke();
  context.fill();
  //   context.closePath();
  //   circle(context, "green", end.x, end.y, canvas.width / 200);
}; // Junkblob

export default Junkblob;

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}; // getRandomIntInclusive
