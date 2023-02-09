import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import PayPayload from "../../Models/PayPayload";
import Pay from "./Models/Pay";
import ExtraInfo from "./Models/ExtraInfo";
import Refund from "./Models/Refund";
import PayRecurrent from "./Models/PayRecurrent";

export default class SEPA extends PaymentMethod {
  protected requiredConfigFields: Array<string> = [];
  public serviceVersion = 1;
  constructor(api: BuckarooClient) {
    super(api);
    this.paymentName = "SepaDirectDebit";
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
  async refund(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Refund", new Refund()),
      this.api.client.getTransactionUrl()
    );
  }
  payRecurrent(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "PayRecurrent", new PayRecurrent()),
      this.api.client.getTransactionUrl()
    );
  }
  authorize(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Authorize", new Pay()),
      this.api.client.getTransactionUrl()
    );
  }
  extraInfo(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Pay,ExtraInfo", new ExtraInfo()),
      this.api.client.getTransactionUrl()
    );
  }
  payWithEmandate(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "PayWithEmandate", new Pay()),
      this.api.client.getTransactionUrl()
    );
  }
}
