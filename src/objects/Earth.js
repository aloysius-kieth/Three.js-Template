import { Group, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from '../assets/models/Diner.glb';

let obj;

export default class Earth extends Group {
  constructor(loadingManager) {
    const loader = new GLTFLoader(loadingManager);

    super();

    this.name = 'earth';

    loader.load(
      MODEL,
      (gltf) => {
        this.add(gltf.scene);
        obj = gltf.scene;
        obj.scale.x = obj.scale.y = obj.scale.z = 0.5;
        obj.updateMatrix();
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100);
      },
      function (error) {
        console.log(error);
      }
    );
  }
}
