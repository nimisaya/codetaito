const spikeAudio = (context, x, y, r, color) => {
  function repeatOften() {
    drawCircle(context, x, y, r, color);

    if (x < 900) {
      x += 2;
    }

    requestAnimationFrame(repeatOften);
  }
  requestAnimationFrame(repeatOften);
}; // circle

export default spikeAudio;

function drawCircle(context, x, y, r, color) {
  context.beginPath();
  context.arc(
    x,
    y,
    r,
    0,
    2 * Math.PI // endAngle
  );
  //   context.fillStyle = "black";
  //   context.fill();
  context.strokeStyle = color;
  context.stroke();
}
