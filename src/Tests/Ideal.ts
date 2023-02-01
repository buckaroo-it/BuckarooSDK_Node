require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import Ideal from "../PaymentMethods/Ideal/Ideal";

const client = new BuckarooClient();
const method = new Ideal(client);

function uniqid(prefix = "", random = false) {
  const sec = Date.now() * 1000 + Math.random() * 1000;
  const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
  return `${prefix}${id}${
    random ? `.${Math.trunc(Math.random() * 100000000)}` : ""
  }`;
}

method.pay({
  returnURL: "https://example.com/return",
  invoice: uniqid(),
  amountDebit: 10.1,
  issuer: "ABNANL2A",
});
