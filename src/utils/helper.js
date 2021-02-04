export default class Helper {
  static logProgress() {
    return function (xhr) {
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;

        console.log(
          'Loading: ' + Math.round(percentComplete, 2) + '% downloaded'
        );
      }
    };
  }
  static logError() {
    return function (xhr) {
      console.error(xhr);
    };
  }
}
