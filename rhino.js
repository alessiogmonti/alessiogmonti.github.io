import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import {OrbitControls} from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import {GLTFLoader} from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({antialias:true, canvas});
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 40, 0);


  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 10, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('rgb(255,255,255)');
  // scene.add( new THREE.AxesHelper(500));

  const ambient = new THREE.AmbientLight('grey', 0.2);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(new THREE.Color('#81968A'), 1);
  keyLight.position.set(-100, 0, 100);
  keyLight.target.position.set(0,5,0);
  keyLight.castShadow = true;
  // const helperK = new THREE.CameraHelper( keyLight.shadow.camera );
  // scene.add(helperK)

  const fillLight = new THREE.DirectionalLight(new THREE.Color('rgb(87, 111, 158)'), 0.75);
  fillLight.position.set(100, 0, 100);

  const backLight = new THREE.DirectionalLight(0xffffff, 1);
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
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('AID.gltf', (gltf) => {
    root = gltf.scene;
    root.DoubleSide = true;
    // root.rotation.x = -10;
    root.position.z = 8;
    root.position.x = 5;
    scene.add(root);
    console.log(dumpObject(root).join('\n'));
    // mymesh = root.getObjectByName('Node');
    // var geo = new THREE.EdgesGeometry( mymesh.geometry ); // or WireframeGeometry
    // var mat = new THREE.LineBasicMaterial( { color: 'black' } );
    // var wireframe = new THREE.LineSegments( geo, mat );
    // root.add( wireframe );

    const newmaterial = new THREE.MeshPhongMaterial({
      // color: 'rgb(129,150,138)',
      color: '#485b54',
      wireframe: true,
      wireframeLinewidth: 1,
      // emissive: 'rgb(220,229,229)',
      emissive: 'white',
      emissiveIntensity: 0.2,
      shininess : 80
    });

    root.traverse((o) => {
      if (o.isMesh) {
        o.material = newmaterial;
        o.castShadow = true;
        o.receiveShadow = true;
        o.DoubleSide = true
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

    if (root) {
      var rotato = time * Math.tan(0.07);
      root.rotation.z = rotato;
      console.log(rotato)
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
