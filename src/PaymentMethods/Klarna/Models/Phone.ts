import PhoneModel from "../../../Models/Phone";

export default class Phone extends PhoneModel {
  constructor(data) {
    super(data);
    this.setKeys();
  }

  setKeys() {
    const keys: any = {
      mobile: "Phone",
    };

    for (let dataKey in this) {
      if (keys[dataKey]) {
        this[keys[dataKey]] = this[dataKey];
        delete this[dataKey];
      }
      if (!this[dataKey]) {
        delete this[dataKey];
      }
    }
  }
}
