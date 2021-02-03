const triangle = (context, color) => {
  // Draw triangle
  context.beginPath();
  context.beginPath();
  context.moveTo(75, 50);
  context.lineTo(100, 75);
  context.lineTo(100, 25);
  context.fillStyle = color;
  context.fill();
}; // triangle

export default triangle;
