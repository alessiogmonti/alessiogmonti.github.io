let flock;
let c1, c2;
let bg;
let check = 0;
function preload() {
 // apercu = loadFont('/Pages/About/Assets/apercumedium.otf');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0,0, 'fixed');
  canvas.style('z-index', '-1');
  translate(-width/2,-height/2,0); //moves our drawing origin to the top left corner
  // textFont(apercu);
  // translate(-width/2,-height/2,0); //moves our drawing origin to the top left corner

  flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < 10; i++) {
    let b = new Boid(150,height-60);
    flock.addBoid(b);
  }
  setInterval(timeIt, 500)
  // c1 = color('rgba(205,114,127,0.6)'); safari
  // c2 = color('rgba(180,250,240,0.1)'); safari
  c1 = color('rgba(85,134,140,1)');
  c2 = color('rgba(232,237,223,0.01)');
 // bg = gradient(0,0, windowWidth, windowHeight, c2, c1);
 // translate(-width/2,-height/2,0); //moves our drawing origin to the top left corner
}
var h = 1;

function rotator(s4){
  rotate(PI/3 * (s4 * h), [1,1,1]);
  rotate(PI/4 * (s4-0.001 * h), [1,0,0]);
  rotate(PI/2 * (s4 * h), [0,0,1]);
}


var timer = 60;
var counter = 0;
var shower = true;
let value = 0;

function keyPressed(){
  if (value === 'a') {
    shower = !shower;
  }
}

function draw() {
  h++;
  translate(-width/2,-height/2,0); //moves our drawing origin to the top left corner
  push();
    fill('rgba(64,78,92, 0.1)');
    rect(570,90, 600, 380);
    ui();
  pop();
  flock.run();
}

function ui(){
  fill('rgba(64,78,92, 1)');
  stroke('rgba(64,78,92, 1)');
  textSize(11);
  var a = text("Framerate: " + timer, 12, windowHeight-20);
  var b = text("Flock count: "+ counter, 12, windowHeight-35);
  var instr = text("Click and drag to create", 12, windowHeight-50);
}

function timeIt(){
  check++
  timer = int(getFrameRate());
}

// Add a new boid into the System
function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the boids

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

let frcount =0;
Flock.prototype.run = function() {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
  if (getFrameRate() < 13 & this.boids.length > 21){
    this.boids.splice(3,50);
    frcount++;
    console.log(frcount);
    if (frcount > 10) {
      clear();
      frcount = 0;
    }
  };
  counter = this.boids.length;
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
  if (counter > 300){
    this.boids.splice(3,100);
  };
}

function gradient(x, y, w, h, c1, c2){
  for (let i = y; i <= y+h; i++) {
    let inter = map(i, y+30, y+h, 0.3, 1);
    let col = lerpColor(c1, c2, inter);
    stroke(col);
    line(x, i, x+w, i);
  }
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added

function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-2, 2), random(-2, 2));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 4;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
}

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  let sep = this.separate(boids);   // Separation
  let ali = this.align(boids);      // Alignment
  let coh = this.cohesion(boids);   // Cohesion
  // Arbitrarily weight these forces
  sep.mult(2);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  let steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  let theta = this.velocity.heading() + radians(90);
  strokeWeight(1)
  // stroke('rgba(64,78,92,0.09)');
  fill('rgba(180,180,180,0.3)');
  stroke('rgba(109,147,246, 1)');
  push();
  translate(this.position.x, this.position.y);
  rotate(theta);
  rotator(0.04);
  beginShape();
  vertex(0, -this.r*2);
  vertex(-this.r, this.r*2);
  vertex(this.r, this.r*2);
  endShape();
  pop();
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width + this.r;
  if (this.position.y < -this.r)  this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  let desiredseparation = 30.0;
  let steer = createVector(0, 0);
  let count = 0;
  // For every boid in the system, check if it's too close
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  let neighbordist = 80;
  let sum = createVector(0,0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);   // Start with empty vector to accumulate all locations
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}

function windowResized(){resizeCanvas(windowWidth, windowHeight)}
