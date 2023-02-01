export default class Parameters {
  public parameterList: {}[] = [];
  constructor(pay, data) {
    this.setUp(pay, data);
  }
  // method_exists(obj, method) {
  //   if (typeof obj === "string") {
  //     return window[obj] && typeof window[obj][method] === "function";
  //   }
  //   return typeof obj[method] === "function";
  // }
  setUp(pay, data) {
    let param;
    for (const payKey in pay) {
      param = {
        name: payKey,
        value: data[payKey],
        groupType: "",
        groupID: "",
      };
      this.parameterList.push(param);
    }
  }
}
