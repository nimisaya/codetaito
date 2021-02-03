const circle = (context, color, x, y, r) => {
  // Draw circle
  context.beginPath();
  context.arc(
    x, // x (center)
    y, // y (center)
    r, // radius
    0, // startAngle
    2 * Math.PI // endAngle
  );
  context.fillStyle = color;
  context.fill();
}; // circle

export default circle;
