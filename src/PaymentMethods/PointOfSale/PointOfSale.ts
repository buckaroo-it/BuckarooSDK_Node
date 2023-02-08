import PaymentMethod from "../PaymentMethod";
import PayPayload from "../../Models/PayPayload";
import Pay from "./Models/Pay";

export default class PointOfSale extends PaymentMethod {
  protected requiredConfigFields: Array<string> = [];
  public serviceVersion = 1;
  constructor(api) {
    super(api);
    this.paymentName = "pospayment";
    this.requiredConfigFields = this.requiredConfigFields.concat(
      this.requiredFields
    );
  }
  async pay(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Pay", new Pay()),
      this.api.client.getTransactionUrl()
    );
  }
}