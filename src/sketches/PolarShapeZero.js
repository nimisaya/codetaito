const PolarShapeZero = (context, canvas, color) => {
  // const r = 5; // radius: r
  // const theta = 10;
  // const c = 1; // shift origin

  // // Convert to polar co-ordinates
  // const x = r * Math.cos(theta);
  // const y = r * Math.sin(theta);

  // // Convert to relative polar co-ordinates
  const cx = canvas.width / 2; // c * x
  const cy = canvas.height / 2; // c * y;

  const points = 630; // number of points

  context.beginPath();

  // Determine shape by setting radius

  // // Start drawing from relative center
  // context.moveTo(cx, cy);

  // context.beginPath();

  const shape = (theta) => {
    return 1 - Math.cos(theta) * Math.sin(5 * theta);
  };

  Array.from(Array(points).keys()).forEach((idx) => {
    const theta = idx * 0.01;
    const r = canvas.width * (1 / 5) * shape(theta);
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    context.lineTo(x, y);
  });

  context.strokeStyle = color;
  context.lineWidth = 4;
  context.lineJoin = "round";
  context.stroke();
};

export default PolarShapeZero;
