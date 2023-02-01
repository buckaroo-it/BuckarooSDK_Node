import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import PayPayload from "../../Models/PayPayload";

class Pay {
  countableProperties: Array<string> = ["articles"];
  billingRecipient = "";
  shippingRecipient = "";
  _articles = [];
  groupData = {
    articles: {
      groupType: "Article",
    },
  };
  billing(data?) {
    console.log("a", data);
  }
  shipping(data) {
    console.log("b", data);
  }

  articles(data) {
    console.log("c", data);
  }
}

export default class Klarna extends PaymentMethod {
  public requiredConfigFields: string[];
  constructor(api: BuckarooClient) {
    super(api);
    this.paymentName = "klarna";
    this.requiredConfigFields = this.requiredFields;
  }

  async pay(model?) {
    let data = this.formatData(model, "Pay");
    let method = "POST";
    return this.api.client.call(data, method);
  }

  payInInstallments(model?) {
    return model;
  }
  issuers(): any {
    return this;
  }
  formatData(data: {}, action) {
    const pay = new Pay();
    const newData = new PayPayload(data, this, action, pay);

    // console.log(JSON.stringify(newData));
    // return newData;
  }
}
