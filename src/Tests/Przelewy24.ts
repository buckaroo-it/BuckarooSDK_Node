import { uniqid } from "../Functions/Functions";

require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import Przelewy24 from "../PaymentMethods/Przelewy24/Przelewy24";

const client = new BuckarooClient();
const method = new Przelewy24(client);

method.pay({
  amountDebit: 3.5,
  invoice: uniqid(),
  email: "test@test.nl",
  customer: {
    firstName: "John",
    lastName: "Smith",
  },
});
