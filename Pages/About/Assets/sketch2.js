const height = 100;
const width = 100;

const w = 10;
let h;

let angle = 0;

function setup() {
  let canvas = createCanvas(windowWidth, 700, WEBGL);
  pixelDensity(3.0);
  canvas.position(0,0, 'fixed');
  canvas.style('z-index', '-1');
  createEasyCam();
  frameRate(30);
  background(255);
}

function draw() {
  // background(255);

  ortho(-width - 100, width + 100, -height - 100, height + 100, 0, 1000);
  directionalLight(255, 255, 255, 40, 50, -50);
  directionalLight(250, 0, 20, 0, 10, -50);

  rotateX(-PI / 6);
  rotateY(-PI / 4);
    // rotateY((frameCount * PI) / 300);
  //   stroke(0);
  for (let x = -height / w; x < height / w; x++) {
    for (let y = -width / w; y < width / w; y++) {
      push();
      let d = dist(0, 0, x * w, y * w) * 2;
      let a = (0.5 - d / dist(0, 0, height, width)) * PI * 4;

      translate(x * w, 100, y * w);
      //   normalMaterial();
      h = Math.sin(angle + a) * 50 + 100;
      fill(220,230,255);
      stroke(205);
      box(w, h/5, w);
      // cylinder(w,h);
      pop();
    }
  }

  angle += 0.09;
}
