import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import PayPayload from "../../Models/PayPayload";

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
    let data = this.formatData(model, "Pay");
    let method = "POST";
    return this.api.client.call(data, method);
  }

  payRemainder(model?) {
    return model;
  }
  issuers(): any {
    return this;
  }
  formatData(data: {}, action) {
    const pay = new Pay();
    const newData = new PayPayload(data, this, action, pay);

    console.log(JSON.stringify(newData));
    return newData;
  }
  getData(data) {
    // return {
    //     Order:"ORDER_NO_1",
    //     AmountDebit:11.1,
    //     Currency:"EUR",
    //     ReturnURL:"https://example.com/return",
    //     ReturnURLCancel:"",
    //     PushURL: 'https://testcheckout.buckaroo.nl/push',
    //     Invoice:"r1001",
    //     Issuer:"ABNANL2A",
    //     ClientUserAgent:"",
    //     Services: {
    //         ServiceList: [
    //             {
    //                 Name: "ideal",
    //                 Action: "Pay",
    //                 Version: 0,
    //                 Parameters: [
    //                     {
    //                         Name: "issuer",
    //                         Value: "ABNANL2A",
    //                         GroupType:"",
    //                         GroupID:""
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // }
  }
}
