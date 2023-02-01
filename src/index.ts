require("dotenv").config({ path: "../.env" });
import BuckarooClient from "./BuckarooClient";
const api = new BuckarooClient();

import Alipay from "./PaymentMethods/Alipay/Alipay";

const method2 = new Alipay(api);

function uniqid(prefix = "", random = false) {
  const sec = Date.now() * 1000 + Math.random() * 1000;
  const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
  return `${prefix}${id}${
    random ? `.${Math.trunc(Math.random() * 100000000)}` : ""
  }`;
}

method2.pay({
  amountDebit: 10,
  invoice: uniqid(),
  useMobileView: true,
});
