function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(250,10);
  canvas.parent('sketch');
  canvas.style('z-index', '-1');
  background('rgba(233,233,233,0)');
}

var amt = 3;
var h = 0.00000006
function draw() {
  background(255);
  h+=1;
  fill(205);
  stroke(90);
  translate(300,250);
  for (let j = 0; j < 20; j++){
    rotate(PI*0.00003*j*h)
    beginShape();
    for (let i = 0; i < amt; i++) {
      angle = i;
      x = 10*angle;
      y = 50 * angle;
      curveVertex(x,y);
    }
    for (let i = 0; i < amt; i++) {
      angle = i;
      x = 20*angle;
      y = 10*angle;
      curveVertex(x,y);
    }
    for (let i = 0; i < amt; i++) {
          angle = i;

      x = 55*angle;
      y = 40*angle;
      curveVertex(x,y);
    }
    for (let i = 0; i < amt; i++) {
          angle = i;

      x = 90*angle;
      y = 10*angle;
      curveVertex(x,y);
    }
    for (let i = 0; i < amt; i++) {
          angle = i;

      x = 100*angle;
      y = 50*angle;
      curveVertex(x,y);
    }
    for (let i = 0; i < amt; i++) {
          angle = i;

      x = 85*angle;
      y = 20*angle;
      curveVertex(x,y);
    }
    for (let i = 0; i < amt; i++) {
          angle = i;

      x = 55*angle;
      y = 45*angle;
      curveVertex(x,y);
    }
    for (let i = 0; i < amt; i++) {
          angle = i;

      x = 55*angle;
      y = 45*angle;
      curveVertex(x,y);
    }
    for (let i = 0; i < amt; i++) {
          angle = i;

      x = 28*angle;
      y = 20*angle;
      curveVertex(x,y);
    }
    endShape();
  }
  col1 = color(5,90,21);
  col1.setAlpha(50);
  fill(col1);
  // circle(0,0,90);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
