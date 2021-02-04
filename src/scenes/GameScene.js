import * as THREE from 'three';
import BasicLights from '../objects/Lights';

export default class GameScene extends THREE.Scene {
  constructor(_resources) {
    super();
    this.resources = _resources;
    this.type = 'GameScene';
    console.log(this.type);
    this.init();
  }

  init() {
    this.clock = new THREE.Clock();

    // this.cube = new THREE.Mesh(
    //   new THREE.BoxBufferGeometry(1, 1, 1),
    //   new THREE.MeshNormalMaterial()
    // );
    this.background = new THREE.Color(0xbfe3dd);
    this.character = this.resources.getObject('samba');
    this.character.scale.x = this.character.scale.y = this.character.scale.z = 0.01;
    //console.log(this.character);
    this.mixer = new THREE.AnimationMixer(this.character);
    const action = this.mixer.clipAction(this.character.animations[0]);
    action.play();
    this.lights = new BasicLights();

    this.add(this.character, this.lights);
  }

  update(timeStamp) {
    const delta = this.clock.getDelta();
    if (this.mixer) {
      this.mixer.update(delta);
    }
    //this.land.rotation.y += 0.5 * this.clock.getDelta();
  }
}
