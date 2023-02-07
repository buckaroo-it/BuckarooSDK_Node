require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import Surepay from "../PaymentMethods/Surepay/Surepay";

const client = new BuckarooClient();
const method = new Surepay(client);

method.verify({
  bankAccount: {
    iban: "NL13TEST0123456789",
    accountName: "John Doe",
  },
});
