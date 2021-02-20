import './style/main.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Land from './objects/Land';
import BasicLights from './objects/Lights';
import Flower from './objects/Flower';
import Earth from './objects/Earth';
import GameScene from './scenes/GameScene';
import PortfolioScene from './scenes/PortfolioScene';
import Resources from './utils/Resources';
import Helper from './utils/Helper';

var camera, scene, renderer, loadingManager, controls, resources;
var clock;
var keyboard = require('./utils/KeyboardState');

/**
 * Window sizes
 */
const sizes = {};
sizes.width = window.innerWidth;
sizes.height = window.innerHeight;

init();

function init() {
  // Loading Manager
  loadingManager = new THREE.LoadingManager(
    () => {},
    function onProgress(item, loaded, total) {
      //console.log(item, loaded, total);
      var loaderText = document.getElementById('loaderText');
      loaderText.innerHTML =
        'Loading: ' + Helper.round(loaded / total, 2) * 100 + '%';
      console.log(loaderText.innerHTML);
    },
    function onError(error) {
      console.log(error);
    }
  );

  loadingManager.onLoad = function () {
    console.log('*** ALL RESOURCES LOADED ***');
  };

  resources = new Resources(loadingManager, () => {
    setTimeout(function () {
      const loadingScreen = document.getElementById('loading-screen');
      loadingScreen.classList.add('fade-out');

      loadingScreen.addEventListener('transitionend', onTransitionEnd);
      scene = new GameScene(resources);
      animate();
    }, 1500);
  });

  keyboard = new KeyboardState();
  clock = new THREE.Clock();

  // Resize
  window.addEventListener('resize', () => {
    // Save sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
  });

  // Camera
  camera = new THREE.PerspectiveCamera(
    70,
    sizes.width / sizes.height,
    0.1,
    2000
  );

  camera.position.z = 1500;
  console.log(camera.position);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl'),
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor('#ffffff');
  renderer.setSize(sizes.width, sizes.height);

  //controls = new OrbitControls(camera, renderer.domElement);
}

// Loop func
function animate(timeStamp) {
  window.requestAnimationFrame(animate);
  render(timeStamp);
  update();
}

function update() {
  //controls.update();
  keyboard.update();

  // testing keyboard inputs
  if (keyboard.down('left')) {
    scene = new PortfolioScene(resources);
  }
  if (keyboard.down('right')) {
    scene = new GameScene(resources);
  }
}

function render(timeStamp) {
  // Update
  if (scene != null) {
    scene.update(timeStamp, camera);
  }

  // Render
  renderer.render(scene, camera);
}

function onTransitionEnd(event) {
  event.target.remove();
}
