const canvasHolders = document.querySelectorAll(".canva-holder");

canvasHolders.forEach((holder, i) => {
  const canvas = document.createElement("canvas");
  canvas.classList.add(`canvas-${i + 1}`);
  holder.appendChild(canvas);
});

const canvases = document.querySelectorAll("canvas");

canvases.forEach((canvas) => {
  var sandbox = new GlslCanvas(canvas);
  sandbox.load(frag);
  sandbox.setUniform("image", "assets/image1.jpg");

  const sizer = () => {
    const w = canvas.parentNode.clientWidth;
    const h = canvas.parentNode.clientHeight;
    const dpi = window.devicePixelRatio;
    canvas.width = w * dpi;
    canvas.height = h * dpi;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
  };
  sizer();
  window.addEventListener("resize", sizer);
});
