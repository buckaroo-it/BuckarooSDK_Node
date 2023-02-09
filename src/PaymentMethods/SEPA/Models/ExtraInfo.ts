import Address from "./Address";
import PayAdapter from "./PayAdapter";
import Customer from "./Customer";
import Pay from "./Pay";

export default class ExtraInfo extends Pay {
  customer = (data) => this.customerFormat(data);
  address = (data) => this.addressFormat(data);
  bic = (data) => this.payFormat("bic", data);
  iban = (data) => this.payFormat("iban", data);
  customerReferencePartyName;
  customerReferencePartyCode;
  customercode;
  contractID;

  customerFormat(data) {
    if (data)
      return {
        data: new Customer(data),
        groupType: "",
        groupID: "",
      };
    return "";
  }

  addressFormat(data) {
    return data ? new Address(data) : "";
  }
  payFormat(key, data) {

    return {
      data: new PayAdapter({ [key]: data }),
      groupType: "",
      groupID: "",
    };
  }
}
