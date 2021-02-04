import * as THREE from 'three';
import Land from '../objects/Land';
import BasicLights from '../objects/Lights';

export default class PortolioScene extends THREE.Scene {
  constructor(_resources) {
    super();
    this.resources = _resources;
    this.type = 'PortfolioScene';
    console.log(this.type);
    this.init();
  }

  init() {
    this.clock = new THREE.Clock();

    this.land = new Land(this.resources);
    this.lights = new BasicLights();

    this.add(this.land, this.lights);
  }

  update(timeStamp) {
    this.land.rotation.y += 0.5 * this.clock.getDelta();
  }
}
