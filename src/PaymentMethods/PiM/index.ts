import PaymentMethod from "../PaymentMethod";
import { IConfig } from "../../Utils/Types";

export default class PiM extends PaymentMethod {
  _paymentName = "pim";
  _requiredFields:Array<keyof IConfig> = ["currency"];
  generate(){
    this.action = 'generate'
    return this.dataRequest()
  }
}