export default abstract class Model {
  static setParameters(modelObject,data){
    for (const key in modelObject) {
      if(typeof modelObject[key] != 'undefined' && !data[key]){
        throw new Error('Missing Parameter:'+ key)
      }else if(!data[key]){
        delete modelObject[key]
      }else{
        modelObject[key] = data[key]
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
