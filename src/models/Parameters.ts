export default class Parameters {
  public parameterList: {}[] = [];

  constructor(pay, data) {
    this.setUp(pay, data);
  }
  method_exists(obj, method) {
    if (typeof obj === "string") {
      return window[obj] && typeof window[obj][method] === "function";
    }
    return typeof obj[method] === "function";
  }
  setUp(pay, data) {
    for (const payKey in pay) {
      console.log(payKey);
      console.log(this.method_exists(pay, payKey));

      let param = { name: "", value: "", groupType: "", groupID: "" };
      if (typeof data[payKey] !== "object") {
        param.name = payKey;
        param.value = data[payKey];
        param.groupType = "";
        param.groupID = "";
        this.parameterList.push(param);
      } else {
        console.log("ss", pay);
        pay[payKey];
      }
    }
  }
}
