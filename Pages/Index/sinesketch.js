var sinewave = function(p){

  p.windowResized = function(){p.resizeCanvas(p.windowWidth, p.windowHeight)}

  p.setup = function(){
    p.canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.angleMode(p.DEGREES);
    p.canvas.style('z-index', '-1');
    console.log('running');
  }

  p.draw = function(){
    p.noFill()
    p.background(20);
    p.rotateX(60);
    p.rotateY(0);

    for (var i = 0; i < 25; i++) {

      var r = p.map(p.sin(p.frameCount), -1, 1, 20, 25)
      var g = p.map(i, 0, 20, 10, 105)
      var b = p.map(p.sin(p.frameCount), -1, 1, 10, 255)

      p.stroke(r,g,b)
      p.beginShape()

      // p.rotate(5)

      for (var j = 0; j < 400; j+=10) {

        var rad = i * 30
        var x = rad * p.sin(j)
        var y = rad * p.tan(j)
        var z = p.sin(p.frameCount + i *10) * 50

        p.vertex(x, y, z)

      }
      p.endShape(p.CLOSE)
    }
    p.rotateZ(p.frameCount/10)
    p.rotateX(p.frameCount/10)
    p.rotateY(p.frameCount/10)

  }
}
var myp5 = new p5(sinewave);
