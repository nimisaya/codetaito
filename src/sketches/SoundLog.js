const SoundLog = (context, canvas, a) => {
  // // Convert to relative polar co-ordinates
  const cx = canvas.width / 2; // c * x
  const cy = canvas.height / 2; // c * y;

  // const points = 630;
  const points = Math.floor(630 + a);

  context.beginPath();

  const shape = (theta) => {
    // return 1 - Math.cos(a * theta) * Math.sin(a * theta);
    // return a - Math.cos(a * theta) * Math.sin(a * theta);
    return 1 - Math.cos(theta) * Math.sin(a * theta);
  };

  // Construct an array of x points
  // theta (angle) is the index of current item in the array/100
  // Keys returns a new Array Iterator object that contains the keys for each index in the array.
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
