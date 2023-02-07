import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import PayPayload from "../../Models/PayPayload";
// import Pay from "./Pay";

class Pay {
  issuer: string = "";
}

export default class Ideal extends PaymentMethod {
  protected requiredConfigFields: Array<string> = [
    "currency",
    "returnURL",
    "returnURLCancel",
    "pushURL",
  ];

  constructor(api: BuckarooClient) {
    super(api);
    this.paymentName = "ideal";
    this.requiredConfigFields = this.requiredFields.concat(
      this.requiredConfigFields
    );
  }

  async pay(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Pay", new Pay()),
      this.api.client.getTransactionUrl()
    );
  }

  payRemainder(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Pay", new Pay()),
      this.api.client.getTransactionUrl()
    );
  }
  issuers(): any {
    let issuerList: { id: any; name: any }[] = [];
    try {
      this.api.client
        .specification({}, this.paymentName, 2)
        .then((response) => {
          if (
            response["Actions"] &&
            response["Actions"]["0"] &&
            response["Actions"]["0"]["RequestParameters"] &&
            response["Actions"]["0"]["RequestParameters"][0] &&
            response["Actions"]["0"]["RequestParameters"][0][
              "ListItemDescriptions"
            ]
          ) {
            let issuersData =
              response["Actions"]["0"]["RequestParameters"][0][
                "ListItemDescriptions"
              ];
            if (issuersData.length > 0) {
              for (let issuer of issuersData) {
                issuerList.push({
                  id: issuer["Value"],
                  name: issuer["Description"],
                });
              }
            }
            return issuerList;
          }
        });
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
