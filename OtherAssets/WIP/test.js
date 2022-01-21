let input, output, hidden;

// let nodeY = 200;
// let hiddenX = [250, 500, 750];

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0, 'fixed');

  input = new Node(1, 5);
  hidden = new Node(4, 10);
  output = new Node(1, 3);

  background(50, 89, 100);

  input.display(0)
  input.createInput();

  hidden.display(100)
  hidden.createHidden();

  output.display(255)
  output.createOutput();

  line(hidden.xpos[0], hidden.ypos, hidden.xpos[1], hidden.ypos);
}

function draw(){
}

class Node {
  constructor(nLayers, amt, type) {
    this.radius = 20;
    this.xpos = [150];
    this.ypos = 100;
    this.nLayers = nLayers;
    this.amt = amt;
    this.type = type;
  }

  createInput(){
    for (var i = 0; i < this.amt; i++) {
      circle(50, this.ypos+(i*30), this.radius);
    }
  }
  createHidden(){
    for (var i = 0; i < this.amt; i++) {
      for (var j = 0; j < this.nLayers; j++) {
        this.xpos.push(this.xpos[j]+90);
        var yp = [100];
        yp.push(yp[i]+90);
        circle(this.xpos[j], this.ypos+(i*10), this.radius);
        line(this.xpos[j], yp[i], this.xpos[j+1], yp[i]);
      }
    }
  }
  createOutput(){
    for (var i = 0; i < this.amt; i++) {
      circle(500, this.ypos+(i*30), this.radius);
    }
  }

  display(col){
    let c = color(50, 100, col);
    fill(c);
  }
}
