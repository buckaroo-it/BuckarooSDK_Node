require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import Alipay from "../PaymentMethods/Alipay/Alipay";

const client = new BuckarooClient();
const method = new Alipay(client);

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
  useMobileView: true,
});
