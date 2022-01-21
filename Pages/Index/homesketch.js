var revolva = function(p){
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
  p.acc = 0.9;
  p.alphaC = 75;
  p.cR = 10;
  p.diR = 1;
  p.cG = 191;
  p.diG = 1;
  p.cB = 9;
  p.diB = 1;

  p.setup = function(){
    p.canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.canvas.position(250,10);
    p.canvas.style('z-index', '-1');
    p.background('rgba(233,233,233,0)');
    console.log('running');
  }

  p.draw = function(){
    p.colSet();
    p.h+=1;
    for (var i = 0; i < 1; i++) {
      p.rotator(p.smod1,p.smod2,p.smod3,p.smod4);
      p.ngon(3, 0, 0, 350);
    }
  }

  p.colSet = function(){
    if(p.cR > 10 || p.cR < 5) {
      p.diR *= -1;
    }
    if(p.cG > 215 || p.cG < 10) {
      p.diG *= -1;
    }
    if(p.cB > 255 || p.cB < 2) {
      p.diB *= -1;
    }
    p.cR = p.cR + (p.diR*p.acc);
    p.cG = p.cG + (p.diG*p.acc);
    p.cB = p.cB + (p.diB*p.acc);

    // p.colorSet = p.color(p.cR,p.cG,p.cB,);
    p.colorSet = p.color(0,p.cG,p.cB,);

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
    p.rotate(p.PI/3 * (s1 *0.55* p.h), [1,1,1]);
    p.rotate(p.PI/4 * (s2 *0.55* p.h), [1,0,0]);
    p.rotate(p.PI/5 * (s3 *0.55* p.h), [1,1,0]);
    p.rotate(p.PI/2 * (s4 *0.55* p.h), [0,0,1]);
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
var myp5 = new p5(revolva);

var star = function(j){

  j.setup = function(){
    j.canvas = j.createCanvas(500, 500);
    j.canvas.position(695,-50);
    j.canvas.style('z-index', '-1');
    j.background('rgba(50,103,233,0)');
  }

  j.amt = 3;
  j.h = 0.00000006;

  j.draw = function(){
    j.scale(0.75);
    j.h += 1;
    j.strokeWeight(1);
    j.col1 = j.color(109,147,246);
    j.col1.setAlpha(100);
    j.stroke(j.col1);
    j.fill(255);
    j.translate(331,331);

    for (let k = 0; k < 20; k++){
      j.rotate(j.PI*0.00003*k*j.h);
      j.beginShape();
      for (let i = 0; i < j.amt; i++) {
        j.angle = i;
        j.x = 10 * j.angle;
        j.y = 50 * j.angle;
        j.curveVertex(j.x,j.y);
      }
      for (let i = 0; i < j.amt; i++) {
        j.angle = i;
        j.x = 20*j.angle;
        j.y = 10*j.angle;
        j.curveVertex(j.x,j.y);
      }
      for (let i = 0; i < j.amt; i++) {
        j.angle = i;
        j.x = 55*j.angle;
        j.y = 40*j.angle;
        j.curveVertex(j.x,j.y);
      }
      for (let i = 0; i < j.amt; i++) {
        j.angle = i;
        j.x = 90*j.angle;
        j.y = 10*j.angle;
        j.curveVertex(j.x,j.y);
      }
      for (let i = 0; i < j.amt; i++) {
        j.angle = i;
        j.x = 100*j.angle;
        j.y = 50*j.angle;
        j.curveVertex(j.x,j.y);
      }
      for (let i = 0; i < j.amt; i++) {
        j.angle = i;
        j.x = 85*j.angle;
        j.y = 20*j.angle;
        j.curveVertex(j.x,j.y);
      }
      for (let i = 0; i < j.amt; i++) {
        j.angle = i;
        j.x = 55*j.angle;
        j.y = 45*j.angle;
        j.curveVertex(j.x,j.y);
      }
      for (let i = 0; i < j.amt; i++) {
        j.angle = i;
        j.x = 55*j.angle;
        j.y = 45*j.angle;
        j.curveVertex(j.x,j.y);
      }
      for (let i = 0; i < j.amt; i++) {
        j.angle = i;
        j.x = 28*j.angle;
        j.y = 20*j.angle;
        j.curveVertex(j.x,j.y);

      }
      j.endShape();
    }
  }
  j.windowResized = function(){j.resizeCanvas(j.windowWidth, j.windowHeight);}
}
let myp5_2 = new p5(star, "sketch");

let clock = function(k){

  k.setup = function(){
    k.canvas = k.createCanvas(500, 500);
    k.canvas.position(695,-50);
    k.canvas.style('z-index', '-1');
  }

  k.draw = function(){
    let m = k.map(k.minute() + k.norm(k.second(), 0, 60), 0, 60, 0, k.TWO_PI) - k.HALF_PI;
    let h = k.map(k.hour() + k.norm(k.minute(), 0, 60), 0, 24, 0, k.TWO_PI * 2) - k.HALF_PI;

    k.col1 = k.color(5,99,181);
    k.stroke(255);
    k.strokeWeight(1);
    k.push();
    // k.col2 = k.color(5,99,181);
    k.col2 = k.color(255,255,255);
    k.col3 = k.color(0,0,0);
    k.col3.setAlpha(0);
    k.fill(k.col3);
    k.stroke(k.col2);
    k.strokeWeight(30);
    k.circle(250,250,205);
    k.circle(250,250,365);
    k.pop();
    k.colHands = k.color(255,255,255);
    k.colHands.setAlpha(0);
    k.fill(k.colHands);
    k.stroke(0);
    k.triangle(240, 255, 250 + k.cos(m) * 140, 250 + k.sin(m) * 140, 255, 250);
    k.triangle(250, 240, 250 + k.cos(h) * 100, 250 + k.sin(h) * 100, 240,255);
    // k.reset();
  }
}

let myp5_3 = new p5(clock, "sketch");
