require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import ApplePay from "../PaymentMethods/ApplePay/ApplePay";
import { uniqid } from "../Functions/Functions";

const client = new BuckarooClient();
const method = new ApplePay(client);

method.pay({
  amountDebit: 10,
  invoice: uniqid(),
  paymentData: "XXXXXXXXXXXXX",
  customerCardName: "Buck Aroo",
});
