require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import Sofort from "../PaymentMethods/Sofort/Sofort";

const client = new BuckarooClient();
const method = new Sofort(client);

function uniqid(prefix = "", random = false) {
  const sec = Date.now() * 1000 + Math.random() * 1000;
  const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
  return `${prefix}${id}${
    random ? `.${Math.trunc(Math.random() * 100000000)}` : ""
  }`;
}

method.pay({
  invoice: uniqid(),
  amountDebit: 10.1,
});
