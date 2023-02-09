// import PhoneModel from "../../../Models/Phone";
import Model from "../../../Models/Model";
export default class Phone {
  mobile: string = '';
  constructor(data) {
    Model.setParameters(this,data)
    Model.setKeys(this,{
      mobile: "phone",
    })
  }

}
