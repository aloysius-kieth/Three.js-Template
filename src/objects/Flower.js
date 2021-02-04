import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from '../assets/models/Flower.glb';

export default class Flower extends Group {
  constructor(loadingManager) {
    const loader = new GLTFLoader(loadingManager);

    super();

    this.name = 'flower';

    loader.load(
      MODEL,
      (gltf) => {
        this.add(gltf.scene);
      }
      // function (xhr) {
      //   console.log((xhr.loaded / xhr.total) * 100);
      // }
    );
  }
}
