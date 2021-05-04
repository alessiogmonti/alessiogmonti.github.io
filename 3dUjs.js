import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import {OrbitControls} from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import {GLTFLoader} from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";

var loadSketch = new Boolean();

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
  p.alphaS = 91;
  p.dir = 1;
  p.acc = 0.5;
  p.alphaC = 75;
  p.cR = 151;
  p.diR = 1;
  p.cG = 165;
  p.diG = 1;
  p.cB = 207;
  p.diB = 1;
  p.counter = 0;

  p.setup = function(){
    p.canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.canvas.position(0,0);
    p.canvas.style('z-index', '100');
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
    p.counter++;
    console.log(p.counter);
    // p.clearer();
  }

  p.colSet = function(){
    if(p.cR > 193 || p.cR < 85) {
      p.diR *= -1;
    }
    if(p.cG > 255 || p.cG < 164) {
      p.diG *= -1;
    }
    if(p.cB > 255 || p.cB < 206) {
      p.diB *= -1;
    }
    p.cR = p.cR + (p.diR*p.acc);
    p.cG = p.cG + (p.diG*p.acc);
    p.cB = p.cB + (p.diB*p.acc);

    p.colorSet = p.color(p.cR,p.cG,p.cB,);
    p.strokeSet = p.color(150,150,150);

    p.alphaC = p.alphaC + (p.dir*p.acc);
    if(p.alphaC > 200 || p.alphaC < 60) {
      p.dir *= -1;
    }

    p.alphaS = p.alphaS + (p.dirS*p.acc);
    if(p.alphaS > 230 || p.alphaS < 90) {
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
  p.clearer = function(){
    if(p.counter > 10){
      p.remove()
      console.log('cleared')
    }
  }
  p.remove = function(){
    p.remove();
  }

}
var myp5 = new p5(sketch);

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({antialias:true, canvas});

  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(120, 0, 30);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('rgb(220,229,229)');

  const manager = new THREE.LoadingManager();
  manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
  	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  };
  manager.onLoad = function ( ) {
  	console.log( 'Loading complete!');
    loadSketch = !loadSketch;
  };
  manager.onProgress = function (itemsLoaded, itemsTotal ) {
  	console.log( 'Loading file: ' + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  };
  manager.onError = function ( url ) {
  	console.log( 'There was an error loading ' + url );
  };

  const ambient = new THREE.AmbientLight('black', 0.2);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(new THREE.Color('rgb(96,110,108)'), 1);
  keyLight.position.set(-100, 0, 100);

  const fillLight = new THREE.DirectionalLight(new THREE.Color('rgb(87, 111, 158)'), 0.75);
  fillLight.position.set(100, 0, 100);

  const backLight = new THREE.DirectionalLight(new THREE.Color('rgb(70,181, 85)'), 1);
  backLight.position.set(100, 0, -100).normalize();

  scene.add(keyLight);
  scene.add(fillLight);
  scene.add(backLight);

  function dumpObject(obj, lines = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
  }

let root;
  {
    const gltfLoader = new GLTFLoader(manager);
    gltfLoader.load('ultra.gltf', (gltf) => {
    root = gltf.scene;
    root.DoubleSide = true;
    root.rotation.x = (Math.PI / 6);
    root.rotation.y = (Math.PI / 6);
    root.rotation.z = -1*(Math.PI / 5.5);
    console.log(dumpObject(root).join('\n'));
    scene.add(root);

    const newmaterial = new THREE.MeshPhongMaterial({
      // color: 'rgb(129,150,138)',
      color: 'white',
      wireframe: false,
      wireframeLinewidth: 5,
      // emissive: 'rgb(220,229,229)',
      emissive: 'white',
      emissiveIntensity: 0.1,
      shininess : 80
    });

    root.traverse((o) => {
      if (o.isMesh) {
        o.material = newmaterial;
      }
    });
    });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

}

main();

if(loadSketch){
  console.log('thisworks');
  myp5.remove();
}
