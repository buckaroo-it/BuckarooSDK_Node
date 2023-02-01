require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import ApplePay from "../PaymentMethods/ApplePay/ApplePay";

const client = new BuckarooClient();
const method = new ApplePay(client);

function uniqid(prefix = "", random = false) {
  const sec = Date.now() * 1000 + Math.random() * 1000;
  const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
  return `${prefix}${id}${
    random ? `.${Math.trunc(Math.random() * 100000000)}` : ""
  }`;
}

method.pay({
  amountDebit: 10,
  invoice: uniqid(),
  paymentData: "XXXXXXXXXXXXX",
  customerCardName: "Buck Aroo",
});
