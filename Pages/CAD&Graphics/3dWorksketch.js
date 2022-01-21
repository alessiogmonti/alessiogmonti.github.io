function windowResized(){resizeCanvas(windowWidth, windowHeight)}

// SINE  WAVE 3D
function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0,0, 'fixed');
  canvas.style('z-index', '-1');
}

var dirS = 1;
var alphaS = 190;

var dir = 1;
var acc = 0.5;
var alphaC = 75;

var cR = 80;
var diR = 1;
var cG = 10;
var diG = 1;
var cB = 90;
var diB = 1;

function colSet(){
  if(cR > 100 || cR < 0) {
    diR *= -1;
  }
  if(cG > 100 || cG < 0) {
    diG *= -1;
  }
  if(cB > 100 || cB < 0) {
    diB *= -1;
  }
  cR = cR + (diR*acc);
  cG = cG + (diG*acc);
  cB = cB + (diB*acc);

  colorSet = color(cR,cG,cB,);
  strokeSet = color(50,50,50);

  alphaC = alphaC + (dir*acc);
  if(alphaC > 250 || alphaC < 180) {
    dir *= -1;
  }

  alphaS = alphaS + (dirS*acc);
  if(alphaS > 200 || alphaS < 150) {
    dirS *= -1;
  }

  colorSet.setAlpha(alphaC);
  strokeSet.setAlpha(alphaS);
  fill(colorSet);
  stroke(strokeSet);
}

function draw() {
  background(250);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  colSet();
  for (let j = 0; j < 5; j++) {
    push();
    for (let i = 0; i < 80; i++) {
      translate(
        sin(frameCount * 0.001 + j) * 10,
        i * 0.1
      );
      translate(
        cos(frameCount * 0.001 + j) * 10,
        i * 0.1
      );
      rotateX(frameCount * 0.005);
      push();
      strokeWeight(0.3);
      sphere(20, 6, 4);
      pop();
    }
    pop();
  }
}
