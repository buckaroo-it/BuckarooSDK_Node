import Customer from "./Customer";
import PayAdapter from "./PayAdapter";

export default class Pay {
  customer = (data) => this.customerFormat(data);
  bic = (data) => this.payFormat("bic", data);
  iban = (data) => this.payFormat("iban", data);
  collectdate;
  mandateReference;
  mandateDate;

  customerFormat(data) {
    if (data)
      return {
        data: new Customer(data),
        groupType: "",
        groupID: "",
      };
    return "";
  }
  payFormat(key, data) {
    return {
      data: new PayAdapter({ [key]: data }),
      groupType: "",
      groupID: "",
    };
  }
}
