import { uniqid } from "../Functions/Functions";

require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import Ideal from "../PaymentMethods/Ideal/Ideal";

const client = new BuckarooClient();
const method = new Ideal(client);

method.pay({
  returnURL: "https://example.com/return",
  invoice: uniqid(),
  amountDebit: 10.1,
  issuer: "ABNANL2A",
});

// method.payRemainder({
//   returnURL: "https://example.com/return",
//   invoice: uniqid(),
//   amountDebit: 10.1,
//   issuer: "ABNANL2A",
// });

// method.issuers();
