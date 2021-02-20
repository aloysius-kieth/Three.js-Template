/* Loaders */
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

/* GLTF / GLB Models */
import FlowerSource from '../assets/models/Flower.glb';
import EarthSource from '../assets/models/Earth.glb';
import LandSource from '../assets/models/Land.glb';
import DinerSource from '../assets/models/Diner.glb';
import HotAirBalloonSource from '../assets/models/hotairballoon.glb';

/* OBJ Models */
import FlyingSaucerSource from '../assets/models/flying/flying sacuer.obj';
import FlyingSaucerMtl from '../assets/models/flying/flying sacuer.mtl';
import TRENSource from '../assets/models/tren/TREN.obj';
import TRENMtl from '../assets/models/tren/TREN.mtl';

/* FBX Models */
import SambaDancingSource from '../assets/models/Samba Dancing.fbx';

import ObjectData from './ObjectData';
import Helper from './Helper';
import { default as Constants } from '../config/constants';

export default class Resources {
  constructor(_loadingManager, callback) {
    this.models = new Map();

    this.resourceData = [
      { name: Constants.MODELS.FLOWER, source: FlowerSource, type: 'gltf' },
      { name: Constants.MODELS.EARTH, source: EarthSource, type: 'gltf' },
      { name: Constants.MODELS.LAND, source: LandSource, type: 'gltf' },
      { name: Constants.MODELS.DINER, source: DinerSource, type: 'gltf' },
      {
        name: Constants.MODELS.HOTAIRBALLOON,
        source: HotAirBalloonSource,
        type: 'gltf',
      },
      {
        name: Constants.MODELS.FLYINGSAUCER,
        source: FlyingSaucerSource,
        material: FlyingSaucerMtl,
        type: 'obj',
      },
      {
        name: Constants.MODELS.SAMBA_DANCING_CHARACTER,
        source: SambaDancingSource,
        type: 'fbx',
      },
      {
        name: Constants.MODELS.TREN,
        source: TRENSource,
        material: TRENMtl,
        type: 'obj',
      },
    ];

    this.loadingManager = _loadingManager;
    this.Load(callback);
  }

  loadModel(data) {
    switch (data.type) {
      case 'gltf':
        return new Promise((resolve, reject) => {
          new GLTFLoader(this.loadingManager).load(
            data.source,
            resolve,
            Helper.logProgress(),
            (xhr) =>
              reject(
                new Error(
                  xhr + 'An error occurred loading while loading ' + url
                )
              )
          );
        });
        break;

      case 'obj':
        return new Promise((resolve, reject) => {
          new MTLLoader(this.loadingManager).load(
            data.material,
            (materials) => {
              materials.preload();
              new OBJLoader(this.loadingManager)
                .setMaterials(materials)
                .load(data.source, resolve, Helper.logProgress(), (xhr) =>
                  reject(
                    new Error(
                      xhr + 'An error occurred loading while loading ' + url
                    )
                  )
                );
            }
          );
        });
        break;
      case 'fbx':
        return new Promise((resolve, reject) => {
          new FBXLoader(this.loadingManager).load(
            data.source,
            resolve,
            Helper.logProgress(),
            (xhr) => {
              reject(
                new Error(
                  xhr + 'An error occurred loading while loading ' + url
                )
              );
            }
          );
        });
        break;
    }
  }

  Load(callback) {
    const p = [];
    for (let i = 0; i < this.resourceData.length; i++) {
      let res = this.resourceData[i];
      let modelName = res.name;
      let modelType = res.type;
      p.push(
        this.loadModel(res).then((result) => {
          this.models.set(new ObjectData(modelName, modelType), result);
        })
      );
    }
    if (p.length > 0) {
      Promise.all(p)
        .then((result) => {
          console.log('*** ALL RESOURCES LOADED ***');
          //console.log(this.models);
          callback();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }

  getObject(objKey) {
    // Based on what type of 3D file extension (eg. obj, fbx)
    var objData;
    var modelData;
    for (let [key, value] of this.models) {
      if (objKey === key.name) {
        objData = key;
        modelData = value;
      }
    }

    switch (objData.type) {
      case 'gltf':
        return modelData.scene;
      case 'obj':
      case 'fbx':
        return modelData;
    }
  }
}
