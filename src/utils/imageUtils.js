import ImageMethods from "image-manipulation";

export const loadImageIntoGameObject = (gameObject, image) => {
  //alert("image loaded");
  let assetId = parseInt(Math.random() * 12321354);
  let textureKey = "face" + assetId;
  let texture = gameObject.scene.textures.createCanvas(textureKey, 15, 25);
  let ctx = texture.context;
  //generateFaceCanvas(ctx, assetId, true);
  convertBlankNFTImageToSpriteTexture(image, ctx);

  // Draw shadow underneath
  drawEllipseByCenter(ctx, 7.5, 20, 10, 4, "rgba(0,0,0,.25)");

  //document.getElementById("display-image").src = image.src;
  //document.getElementById("display-canvas").getContext("2d").drawImage(image,0,0);

  // texture.drawFrame("rock");
  texture.drawFrame(textureKey);
  gameObject.setTexture(textureKey);

  //this.scene.add.image(textureKey, 60, 60);
};

export async function loadImageSync(path, callback) {
  let image = new Image();
  image.onload = () => {
    callback(image);
  };
  image.onerror = () => {
    alert("Couldn't load image");
  };
  image.setAttribute("crossOrigin", "");
  image.src = path;
}

export async function loadImage(path, callback) {
  return new Promise(async function (resolve, reject) {
    let image = new Image();
    image.onload = () => {
      callback(image);
    };
    image.onerror = () => {
      alert("Couldn't load image");
    };
    image.setAttribute("crossOrigin", "");
    image.src = path;
  });
}

export async function convertBlankNFTImageToSpriteTexture(
  image,
  textureContext
) {
  //let bitizenImage = await loadImage(path);
  let bitizenImage = image;
  //let displayCanvas = document.getElementById("display-canvas");
  //let ctx = displayCanvas.getContext("2d");

  let offscreenCanvas = new OffscreenCanvas(
    bitizenImage.width,
    bitizenImage.height
  );
  let offscreenCtx = offscreenCanvas.getContext("2d");
  offscreenCtx.imageSmoothingEnabled = false;
  offscreenCtx.filter = "contrast(100) grayscale(100)";
  offscreenCtx.drawImage(bitizenImage, 0, 0);
  offscreenCanvas = ImageMethods.resize(offscreenCanvas, 29, 29);
  offscreenCanvas = ImageMethods.crop(offscreenCanvas, 7, 7, 15, 15);
  offscreenCanvas = colorToAlpha(offscreenCanvas, 255, 255, 255);

  //displayCanvas.width = offscreenCanvas.width;
  //displayCanvas.height = offscreenCanvas.height;

  textureContext.drawImage(offscreenCanvas, 0, 0);
  //textureContext.fillStyle = "rgb(255,0,0)";
  //textureContext.fillRect(0, 0, 29, 29);

  // displayCanvas.width = offscreenCanvas.width;
  // displayCanvas.height = offscreenCanvas.height;
  // ctx.drawImage(offscreenCanvas, 0, 0);

  return offscreenCanvas;
}

export function colorToAlpha(canvas, colorR, colorG, colorB) {
  const context = canvas.getContext("2d");
  const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;

  // enumerate all pixels
  // each pixel's r,g,b,a datum are stored in separate sequential array elements
  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];
    const alpha = data[i + 3];

    console.log(red);

    //if (red == colorR && green == colorG && blue == colorB) {
    if (red > 200 && green > 200 && blue > 200) {
      data[i + 3] = 0;
    }
  }
  context.putImageData(imgData, 0, 0);

  return canvas;
}

export function drawEllipseByCenter(ctx, cx, cy, w, h, color) {
  drawEllipse(ctx, cx - w / 2.0, cy - h / 2.0, w, h, color);
}

export function drawEllipse(ctx, x, y, w, h, color) {
  var kappa = 0.5522848,
    ox = (w / 2) * kappa, // control point offset horizontal
    oy = (h / 2) * kappa, // control point offset vertical
    xe = x + w, // x-end
    ye = y + h, // y-end
    xm = x + w / 2, // x-middle
    ym = y + h / 2; // y-middle

  ctx.beginPath();
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  //ctx.closePath(); // not used correctly, see comments (use to close off open path)
  ctx.fillStyle = color;
  ctx.fill();
}