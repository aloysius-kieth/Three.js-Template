import { Group } from 'three';
import { default as Constants } from '../config/constants';

export default class Land extends Group {
  constructor(_resources) {
    super();

    this.resources = _resources;
    this.land = this.resources.getObject(Constants.MODELS.LAND);

    this.add(this.land);
  }
}
