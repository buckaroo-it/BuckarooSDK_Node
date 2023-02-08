require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import Paypal from "../PaymentMethods/Paypal/Paypal";
import { uniqid } from "../Functions/Functions";

const client = new BuckarooClient();
const method = new Paypal(client);

// method.pay({
//   amountDebit: 10,
//   invoice: uniqid(),
// });

method.payRecurrent({
  amountDebit: 10,
  originalTransactionKey: "C32C0B52E1FE4A37835FFB1716XXXXXX",
  invoice: uniqid(),
});

// method.extraInfo({
//   amountDebit: 10,
//   invoice: uniqid(),
//   customer: {
//     name: "John Smith",
//   },
//   address: {
//     street: "Hoofstraat 90",
//     street2: "Street 2",
//     city: "Heerenveen",
//     state: "Friesland",
//     zipcode: "8441AB",
//     country: "NL",
//   },
//   phone: {
//     mobile: "0612345678",
//   },
// });
