const SoundLog = (context, canvas, a) => {
  // // Convert to relative polar co-ordinates
  const cx = canvas.width / 2; // c * x
  const cy = canvas.height / 2; // c * y;

  const points = 630; // number of points

  context.beginPath();

  const shape = (theta) => {
    return 1 - Math.cos(theta) * Math.sin(a * theta);
  };

  Array.from(Array(points).keys()).forEach((idx) => {
    const theta = idx * 0.01;
    const r = canvas.width * (1 / 5) * shape(theta);
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    context.lineTo(x, y);
  });

  context.strokeStyle = "black";
  context.lineWidth = 4;
  context.lineJoin = "round";
  context.stroke();
  context.fillStyle = "black";
  context.fill();
};

export default SoundLog;
