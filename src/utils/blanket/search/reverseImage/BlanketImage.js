// NOT IMPLEMENTED YET

//import ImgHash from "imghash";
//import phash from "sharp-phash";
//import sharp from "sharp";

function createCanvas(width, height) {
    var canvas = document.createElement("canvas");
    var body = document.getElementsByTagName("body")[0];
    canvas.width = width;
    canvas.height = height;
    body.appendChild(canvas);
    canvas.style.display = "none";

    return canvas;
}

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255)
      throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}

function blanketScale(blanketImage, width, height) {
  let baseDimensions = blanketImage.getDimensions();
  let baseCanvas = createCanvas(baseDimensions.width, baseDimensions.height);
  let baseContext = baseCanvas.getContext("2d");
  blanketImage.drawToContext(baseContext);

  let scaledCanvas = createCanvas(width, height);
  let scaledContext = scaledCanvas.getContext("2d");

  console.log("baseDimensions", baseDimensions.width+", "+baseDimensions.height);
  let xInc = baseDimensions.width/parseFloat(width);
  let yInc = baseDimensions.height/parseFloat(height);
  if (!xInc) xInc = 1;
  if (!yInc) yInc = 1;
  console.log("inc", xInc+", "+yInc);
  let destX = 0;
  let destY = 0;
  for (let y=0; y<baseDimensions.height; y+=yInc) {
    for (let x=0; x<baseDimensions.width; x+=xInc) {
      var pixel = baseContext.getImageData(parseInt(x), parseInt(y), 1, 1).data; 
      var color = "#" + ("000000" + rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6);
      
      scaledContext.fillStyle = color;
      scaledContext.fillRect(destX, destY, 1, 1);

      destX += 1;
    }
    destX = 0;
    destY += 1;
  }

  let dataURI = scaledCanvas.toDataURL();

  baseCanvas.remove();
  scaledCanvas.remove();

  return new BlanketImage(dataURI);
}

class BlanketImage {
  constructor(imageDataUri) {
    this.imageData = imageDataUri; // imageData is data URI image data (not quite the same as base64. Get from canvas.toDataURL()) 
  }

  toDataUri() {
    return this.imageData;
  }
  toBase64() {
    return this.toDataUri().replace(/^data:image\/(png|jpg|webp);base64,/, ""); // correct base64
  }
  toBuffer() {
    return Buffer.from(this.toBase64(), "base64");
  }

  async toPerceptualHash(imageData) {
    const scaled = await this.scale(256, 256);
    const buffer = scaled.toBuffer();

    /*
    let imageHashData = " " + (await ImgHash.hash(buffer, 16)); // Add space - hacky way to fix IDE auto formatting hex strings (change in future!)
    */
    
    //let imageHashData = await phash(this);
    //let imageHashData = "";
    console.log("IMAGE HASH: " + imageHashData);
    return imageHashData;
  }

  getDimensions() {
    let base64 = this.toBase64();
    const header = atob(base64.slice(0, 50)).slice(16, 24);
    const uint8 = Uint8Array.from(header, (c) => c.charCodeAt(0));
    const dataView = new DataView(uint8.buffer);

    return {
      width: dataView.getInt32(0),
      height: dataView.getInt32(4),
    };
  }

  toContext() {
    var canvas = document.createElement("canvas");
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    //const canvas = document.getElementById("open-cv-working-canvas");
    let ctx = canvas.getContext("2d");
    this.drawToContext(ctx);

    canvas.remove();

    return ctx;
  }

  drawToContext(ctx) {
    const imageBase64 = this.toBase64();
    const imageDimensions = this.getDimensions();
    let canvas = ctx.canvas;
    canvas.width = imageDimensions.width;
    canvas.height = imageDimensions.height;
    //ctx.filter = "contrast(30) grayscale(100)"; // Apply filtering effect to make keypoint matching more effective
    var myImage = new Image();
    myImage.src = this.toDataUri();
    ctx.drawImage(myImage, 0, 0);

    return ctx;
  }

  toGrayscale() {
    let ctx = this.toContext();
    const imageDimensions = this.getDimensions();
    let canvas = ctx.canvas;
    canvas.width = imageDimensions.width;
    canvas.height = imageDimensions.height;
    ctx.filter = "grayscale(100)";
    var myImage = new Image();
    myImage.src = this.toDataUri();
    ctx.drawImage(myImage, 0, 0);

    return new BlanketImage(ctx.canvas.toDataURL());
  }

  rotate(angle) {
    // Todo: DOESN'T WORK!
    let ctx = this.toContext();
    const imageDimensions = this.getDimensions();
    let canvas = ctx.canvas;
    canvas.width = imageDimensions.width;
    canvas.height = imageDimensions.height;
    ctx.save();
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.rotate(angle*Math.PI/180);
    var myImage = new Image();
    myImage.src = this.toDataUri();
    ctx.drawImage(myImage,-myImage.width/2,-myImage.width/2);
    ctx.restore();

    return new BlanketImage(ctx.canvas.toDataURL());
  }
/*
  scale(width, height) {
    console.log("SCALING");
    return new Promise(async (resolve, reject) => {
      await this.loadImage();
      let scaledBlanketImage = blanketScale(this, width, height);
  
      // This is the return of the Promise
      resolve(scaledBlanketImage);
    });
  }
*/
  scale(width, height) {
    return new Promise(async (resolve, reject) => {
      // We create an image to receive the Data URI
      var img = document.createElement("img");

      // When the event "onload" is triggered we can resize the image.
      img.onload = function () {
        // We create a canvas and get its context.
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        // ctx.mozImageSmoothingEnabled = false;
        // ctx.webkitImageSmoothingEnabled = false;
        // ctx.imageSmoothingEnabled = false;
        //ctx.imageSmoothingEnabled = false;
        //ctx.patternQuality = "bilinear";
        //ctx.quality = "bilinear";

        // We set the dimensions at the wanted size.
        canvas.width = width;
        canvas.height = height;

        // We resize the image with the canvas method drawImage();
        ctx.drawImage(this, 0, 0, width, height);

        var dataURI = canvas.toDataURL();

        // This is the return of the Promise
        resolve(new BlanketImage(dataURI));
      };

      img.onerror = function () {
        reject("Could not load canvas");
      };

      // We put the Data URI in the image's src attribute
      img.src = this.toDataUri();
    });
  }


  async loadImage() {
    return new Promise((resolve, reject) => {
      var image = document.createElement("img");
      var body = document.getElementsByTagName("body")[0];

      image.onload = function () {
        image.remove();
        resolve(image);
      };
      image.onerror = function () {
        image.remove();
        reject("Image loading error");
      };

      body.appendChild(image);
      image.src = this.toDataUri();
    });
  }
}

export default BlanketImage;