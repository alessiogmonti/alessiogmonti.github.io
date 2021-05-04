var sketch = function(p){
  p.smod1 = 0.03
  p.smod2 = 0.01
  p.smod3 = 0.005
  p.smod4 = 0.005
  p.h = 1;
  p.angle;
  p.px;
  p.py;

  p.windowResized = function(){p.resizeCanvas(p.windowWidth, p.windowHeight)}

  p.dirS = -1;
  p.alphaS = 180;
  p.dir = 1;
  p.acc = 0.5;
  p.alphaC = 75;
  p.cR = 10;
  p.diR = 1;
  p.cG = 29;
  p.diG = 1;
  p.cB = 50;
  p.diB = 1;

  p.setup = function(){
    p.canvas = p.createCanvas(p.windowWidth-150, p.windowHeight, p.WEBGL);
    p.canvas.position(150,0);
    p.canvas.style('z-index', '-1');
    p.background('rgba(233,233,233,0.1)');
    console.log('running');
  }

  p.draw = function(){
    p.colSet();
    p.h+=1;
    for (var i = 0; i < 1; i++) {
      p.rotator(p.smod1,p.smod2,p.smod3,p.smod4);
      p.ngon(3, 0, 0, 400);
    }
  }

  p.colSet = function(){
    if(p.cR > 193 || p.cR < 5) {
      p.diR *= -1;
    }
    if(p.cG > 230 || p.cG < 30) {
      p.diG *= -1;
    }
    if(p.cB > 230 || p.cB < 90) {
      p.diB *= -1;
    }
    p.cR = p.cR + (p.diR*p.acc);
    p.cG = p.cG + (p.diG*p.acc);
    p.cB = p.cB + (p.diB*p.acc);

    p.colorSet = p.color(p.cR,p.cG,p.cB,);
    p.strokeSet = p.color(100,100,100);

    p.alphaC = p.alphaC + (p.dir*p.acc);
    if(p.alphaC > 200 || p.alphaC < 60) {
      p.dir *= -1;
    }

    p.alphaS = p.alphaS + (p.dirS*p.acc);
    if(p.alphaS > 200 || p.alphaS < 90) {
      p.dirS *= -1;
    }

    p.colorSet.setAlpha(p.alphaC);
    p.strokeSet.setAlpha(p.alphaS);
    p.fill(p.colorSet);
    p.stroke(p.strokeSet);
  }

  p.rotator = function(s1,s2,s3,s4) {
    p.rotate(p.PI/3 * (s1 * p.h), [1,1,1]);
    p.rotate(p.PI/4 * (s2 * p.h), [1,0,0]);
    p.rotate(p.PI/5 * (s3 * p.h), [1,1,0]);
    p.rotate(p.PI/2 * (s4 * p.h), [0,0,1]);
  }

  p.ngon = function(n, x, y, d) {
    p.beginShape();
    for (let i = 0; i < n + 1; i++) {
      p.angle = p.TWO_PI / n * i;
      p.px = x + p.sin(p.angle) * d / 2;
      p.py = y - p.cos(p.angle) * d / 2;
      p.curveVertex(p.px, p.py);
    }
    for (let i = 0; i < n + 1; i++) {
      p.angle = p.TWO_PI / n * i;
      p.px = x + p.sin(p.angle) * d / 4;
      p.py = y - p.cos(p.angle) * d / 4;
      p.curveVertex(p.px, p.py);
    }
    for (let i = 0; i < n; i++) {
      p.angle = p.TWO_PI / n * i;
      p.px = x + p.sin(p.angle) * d / 6;
      p.py = y - p.cos(p.angle) * d / 6;
      p.curveVertex(p.px, p.py);
    }
    p.endShape(p.CLOSE);
  }
}
var myp5 = new p5(sketch);
