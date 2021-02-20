import * as THREE from 'three';
import { default as Constants } from '../config/constants';
import BasicLights from '../objects/Lights';

let raycaster;
const mouse = new THREE.Vector2();

let INTERSECTED = false;

export default class GameScene extends THREE.Scene {
  constructor(_resources) {
    super();
    this.resources = _resources;
    this.type = 'GameScene';
    console.log(this.type);
    this.init();
  }

  init() {
    this.isMoving = false;
    this.clock = new THREE.Clock();

    raycaster = new THREE.Raycaster();

    // this.cube = new THREE.Mesh(
    //   new THREE.BoxBufferGeometry(1, 1, 1),
    //   new THREE.MeshNormalMaterial()
    // );
    this.background = new THREE.Color(0xbfe3dd);
    this.hotairballoon = this.resources.getObject(
      Constants.MODELS.HOTAIRBALLOON
    );

    // this.hotairballoon.scale.x = this.character.scale.y = this.character.scale.z = 3.0;
    // this.mixer = new THREE.AnimationMixer(this.character);
    // const action = this.mixer.clipAction(this.character.animations[0]);
    // action.play();
    this.lights = new BasicLights();

    this.add(this.hotairballoon, this.lights);
    window.addEventListener(
      'mousemove',
      function (event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        console.log(mouse);
      },
      false
    );
  }

  update(timeStamp, camera) {
    const delta = this.clock.getDelta();
    if (this.mixer) {
      this.mixer.update(delta);
    }

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(this.children);
    for (let i = 0; i < intersects.length; i++) {
      console.log('hit');
    }
    //this.land.rotation.y += 0.5 * this.clock.getDelta();
  }
}
