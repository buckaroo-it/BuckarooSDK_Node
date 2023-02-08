require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import SEPA from "../PaymentMethods/SEPA/SEPA";
import { uniqid } from "../Functions/Functions";

const client = new BuckarooClient();
const method = new SEPA(client);

// method.pay({
//   invoice: uniqid(),
//   amountDebit: 10.1,
//   iban: "NL13TEST0123456789",
//   bic: "TESTNL2A",
//   collectdate: "2022-12-01",
//   mandateReference: "1DCtestreference",
//   mandateDate: "2022-07-03",
//   customer: {
//     name: "John Smith",
//   },
// });
//
// method.refund({
//   amountCredit: 10,
//   invoice: "testinvoice 123",
//   originalTransactionKey: "3D175524FCF94C94A23B67E8DCXXXXXX",
// });

method.payRecurrent({
  amountDebit: 10,
  originalTransactionKey: "FDA9EEEEA53C42BF875C35C6C2B7xxxx",
  invoice: "testinvoice 123",
  collectdate: "2030-07-03",
});
