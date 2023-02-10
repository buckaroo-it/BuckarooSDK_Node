import BuckarooClient from "../../BuckarooClient";
import PaymentMethod from "../PaymentMethod";
import Transaction from "../../Models/Transaction";
import Pay from "./Models/Pay";

export default class Przelewy24 extends PaymentMethod {
  protected requiredConfigFields: Array<string> = [];
  constructor(api: BuckarooClient) {
    super(api);
    this.paymentName = "Przelewy24";
    this.requiredConfigFields = this.requiredConfigFields.concat(
      this.requiredFields
    );
  }
  async pay(model?) {
    return this.api.client.post(
      new Transaction(model, this, "Pay", new Pay()),
      this.api.client.getTransactionUrl()
    );
  }
}
