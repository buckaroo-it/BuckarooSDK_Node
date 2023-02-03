require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import Alipay from "../PaymentMethods/Alipay/Alipay";
import { uniqid } from "../Functions/Functions";

const client = new BuckarooClient();
const method = new Alipay(client);

method.pay({
  amountDebit: 10,
  invoice: uniqid(),
  useMobileView: true,
});
