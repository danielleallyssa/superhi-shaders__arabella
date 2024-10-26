const canvasHolders = document.querySelectorAll(".canva-holder");

canvasHolders.forEach((holder, i) => {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("data-image", `image${i + 1}.jpg`);
  holder.appendChild(canvas);

  const sandbox = new GlslCanvas(canvas);
  sandbox.load(fragment);

  const image = canvas.getAttribute("data-image");
  sandbox.setUniform("image", `assets/${image}`);
  sandbox.setUniform("seed", Math.random());

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

const canvases = document.querySelectorAll("canvas");

// canvases.forEach((canvas, i) => {

// });
