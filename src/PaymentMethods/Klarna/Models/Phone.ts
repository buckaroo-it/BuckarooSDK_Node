import {PhoneParams} from "../../../Models/Phone";


export default class Phone  {
  constructor(data) {
    this.setKeys(data);
  }

  setKeys(data) {
    const keys: any = {
      mobile: "Phone",
    };

    for (const key in PhoneParams) {
      if(data[key]){
        if(keys[key]){
          this[keys[key]] = data[key]
        }
      }
    }
  }
}
