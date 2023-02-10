import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import Transaction from "../../Models/Transaction";
import Pay from "./Models/Pay";
import PayForm from "../../Models/PayForm";

export default class Klarna extends PaymentMethod {
  public requiredConfigFields: string[];
  constructor(api: BuckarooClient) {
    super(api);
    this.paymentName = "klarna";
    this.requiredConfigFields = this.requiredFields;
  }

  async pay(model:Pay & PayForm) {

    let PayLoad = new Pay(model);
    let PayLoadTransaction = new PayForm(model);
    PayLoadTransaction.setServices?.(PayLoad,this.paymentName,this.serviceVersion,'Pay')

    return this.api.client.post(
      new Transaction(this,PayLoadTransaction),
      this.api.client.getTransactionUrl()
    );
  }

  // payInInstallments(model?) {
  //   return this.api.client.post(
  //     new PayPayload(model, this, "PayInInstallments", new Pay()),
  //     this.api.client.getTransactionUrl()
  //   );
  // }
  issuers(): any {
    return this;
  }
}
