import PhoneModel from "../../../Models/Phone";
export default class Phone implements PhoneModel {
  landline?: string;
  mobile?: string;
  fax?: string;
  constructor(data) {
    this.mobile = data.mobile;
    this.landline = data.landline;
    this.fax = data.fax;
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
