require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import Sofort from "../PaymentMethods/Sofort/Sofort";
import { uniqid } from "../Functions/Functions";

const client = new BuckarooClient();
const method = new Sofort(client);

method.pay({
  invoice: uniqid(),
  amountDebit: 10.1,
});
