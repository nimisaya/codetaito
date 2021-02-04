const triangle = (context, color, step) => {
  // Draw triangle
  context.beginPath();
  context.moveTo(75 + step, 50 + step);
  context.lineTo(100 + step, 75 + step);
  context.lineTo(200, 25 + step);
  context.fillStyle = color;
  context.fill();
}; // triangle

export default triangle;
