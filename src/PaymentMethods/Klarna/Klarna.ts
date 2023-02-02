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
    return this.api.client.call(
      new PayPayload(model, this, "Pay", new Pay()),
      "POST"
    );
  }

  payInInstallments(model?) {
    return model;
  }
  issuers(): any {
    return this;
  }
}
