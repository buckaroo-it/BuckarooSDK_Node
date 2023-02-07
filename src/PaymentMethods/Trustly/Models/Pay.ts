import Customer from "../Service/Customer";
export default class Pay {
  customer = (data) => this.customerFormat(data);
  country = (data) => this.countryFormat(data);
  customerFormat(data) {
    return {
      data: new Customer(data),
      groupType: "Customer",
      groupID: "",
    };
  }

  countryFormat(data) {
    return {
      data: { CustomerCountryCode: data },
      groupType: "Country",
      groupID: "",
    };
  }
}
