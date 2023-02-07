import Customer from "../Service/Customer";
export default class Pay {
  customer = (data) => this.customerFormat(data);

  customerFormat(data) {
    return {
      data: new Customer(data),
      groupType: "Customer",
      groupID: "",
    };
  }
}
