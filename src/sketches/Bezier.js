const Blobular = (context, canvas, color) => {
  // Construct a bezier curve
  /*
      cp1x : x-axis coordinate of the first control point.
      cp1y : y-axis coordinate of the first control point.
      cp2x : x-axis coordinate of the second control point.
      cp2y : y-axis coordinate of the second control point.
      x : x-axis coordinate of the end point.
      y : y-axis coordinate of the end point. 
  */

  const start = { x: 50, y: 20 };
  const cpStart = { x: 230, y: 30 };
  const cpEnd = { x: 150, y: 80 };
  const end = { x: 250, y: 100 };

  context.beginPath();
  context.moveTo(start.x, start.y);
  context.bezierCurveTo(cpStart.x, cpStart.y, cpEnd.x, cpEnd.y, end.x, end.y);
  context.stroke();
  context.moveTo(end.x, end.y);
  context.bezierCurveTo(
    cpEnd.x + 50,
    cpEnd.y,
    cpStart.x,
    cpStart.y,
    start.x,
    start.y
  );
  context.stroke();
};

export default Blobular;
