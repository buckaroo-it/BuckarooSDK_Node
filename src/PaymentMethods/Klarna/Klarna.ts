import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import PayPayload from "../../Models/PayPayload";
import Pay from "./Models/Pay";

export default class Klarna extends PaymentMethod {
  public requiredConfigFields: string[];
  constructor(api: BuckarooClient) {
    super(api);
    this.paymentName = "klarna";
    this.requiredConfigFields = this.requiredFields;
  }

  async pay(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Pay", new Pay()),
      this.api.client.getTransactionUrl()
    );
  }

  payInInstallments(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "PayInInstallments", new Pay()),
      this.api.client.getTransactionUrl()
    );
  }
  issuers(): any {
    return this;
  }
}
