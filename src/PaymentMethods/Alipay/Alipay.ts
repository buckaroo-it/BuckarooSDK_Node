import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import Transaction from "../../Models/Transaction";
import Pay from "./Models/Pay";


export default class Alipay extends PaymentMethod {
  protected requiredConfigFields: Array<string> = [];
  constructor(api: BuckarooClient) {
    super(api);
    this.paymentName = "alipay";
    this.requiredConfigFields = this.requiredConfigFields.concat(
      this.requiredFields
    );
  }

  async pay(model?) {
    return this.api.client.post(
      new Transaction(model, this, "Pay", new Pay(model)),
      this.api.client.getTransactionUrl()
    );
  }

  payRemainder(model?) {
    return model;
  }
  issuers(): any {
    return this;
  }
}
