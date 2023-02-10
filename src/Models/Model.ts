export default abstract class Model {
  static setParameters(modelObject,data){
    /** Go through model to check which parameter to set,
     * delete if optional with no value,
     * rewrite if new data is set
     * and throw error if missing required parameter
     */
    for (const key in modelObject) {
      if(!data[key]){
        if(typeof modelObject[key] !== 'undefined'){
          if(!modelObject[key]){
            throw new Error('Missing Parameter:'+ key +' in '+ modelObject.constructor.name)
          }
        } else {
          delete modelObject[key]
        }
      }
      else {
        modelObject[key] = modelObject[key] || data[key]
      }
    }

  }

  static setKeys(modelObject, keys: {}) {
    for (const modelObjectKey in keys) {
      if(modelObject[modelObjectKey]){
        delete Object.assign(modelObject, { [keys[modelObjectKey]]: modelObject[modelObjectKey] })[modelObjectKey];
      }
    }
  }
}
