import Customer from "./Customer";
import Email from "./Email";

export default class Pay {
  customer = (data) => this.customerFormat(data);
  email = (data) => this.emailFormat("email", data);

  customerFormat(data) {
    return {
      data: new Customer(data),
      groupType: "",
      groupID: "",
    };
  }
  emailFormat(key, data) {
    return {
      data: new Email({ [key]: data }),
      groupType: "Customer",
      groupID: "",
    };
  }
}
