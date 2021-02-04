const Ouch = (context, canvas, color) => {
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

export default Ouch;

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}; // getRandomIntInclusive
