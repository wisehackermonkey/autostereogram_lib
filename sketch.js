let depthBuffer = [];
let colorBuffer = [];
let canvasWidth = 600;
let canvasHeight = 600;
let interval = 40;
let depthImage;

function preload() {
  // Load your 600x1 image here
  depthImage = loadImage("depthImage.png");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noSmooth();
  // noFill();
  loadPixels();

  // Create the depth buffer
  depthImage.loadPixels();
  for (let x = 0; x < depthImage.width; x++) {
    let index = 4 * x; // Each pixel has 4 values (R, G, B, A)
    let grayscaleValue =
      (depthImage.pixels[index] +
        depthImage.pixels[index + 1] +
        depthImage.pixels[index + 2]) /
      3;
    depthBuffer.push(grayscaleValue);
  }

  // Create the color buffer with random colors
  for (let i = 0; i < canvasWidth; i++) {
    let r = int(random(256));
    let g = int(random(256));
    let b = int(random(256));
    colorBuffer.push(color(r, g, b));
  }

  // Copy the depthImage pixels to the bottom of the canvas at y = 200px
  for (let x = 0; x < canvasWidth; x++) {
    let y = canvasHeight-1; // Starting at 199 because the canvas height is 200 and indexing starts at 0
    let index = 4 * (y * width + x);
    let depthIndex = 4 * x;
    pixels[index] = depthImage.pixels[depthIndex];
    pixels[index + 1] = depthImage.pixels[depthIndex + 1];
    pixels[index + 2] = depthImage.pixels[depthIndex + 2];
    pixels[index + 3] = depthImage.pixels[depthIndex + 3];
  }

  // Generate the output based on depthBuffer
  for (let x = 0; x < canvasWidth; x++) {
    let depthValue = depthBuffer[x];
    let outputColor;
    if (interval - depthValue >= 0) {
      outputColor = colorBuffer[interval - depthValue];
    } else {
      // Assign a random color
      let r = int(random(256));
      let g = int(random(256));
      let b = int(random(256));
      outputColor = color(r, g, b);
    }

    let index = 4 * x;
    pixels[index] = red(outputColor);
    pixels[index + 1] = green(outputColor);
    pixels[index + 2] = blue(outputColor);
    pixels[index + 3] = 255; // Alpha channel
  }

  for (let y = 0; y < canvasHeight - 1; y++) {
    for (let x = 0; x < canvasWidth; x++) {
      let index = 4 * (y * width + x);
      let outputColor = colorBuffer[x];
      pixels[index] = red(outputColor);
      pixels[index + 1] = green(outputColor);
      pixels[index + 2] = blue(outputColor);
      pixels[index + 3] = 255; // Alpha channel
    }
  }
  updatePixels();
}

function draw() {
  // Your drawing code here if needed
}
