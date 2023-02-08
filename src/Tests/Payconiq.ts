require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import Payconiq from "../PaymentMethods/Payconiq/Payconiq";
import { uniqid } from "../Functions/Functions";

const client = new BuckarooClient();
const method = new Payconiq(client);

method.pay({
  amountDebit: 10,
  description: "Payment for testinvoice123",
  invoice: uniqid(),
});
