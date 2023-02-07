require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import Trustly from "../PaymentMethods/Trustly/Trustly";
import { uniqid } from "../Functions/Functions";

const client = new BuckarooClient();
const method = new Trustly(client);

method.pay({
  amountDebit: 10.1,
  invoice: uniqid(),
  country: "De",
  customer: {
    firstName: "Test",
    lastName: "Aflever",
  },
});
