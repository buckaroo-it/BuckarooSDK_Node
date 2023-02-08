import Gender from "../Constants/Gender";

require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import PayPerEmail from "../PaymentMethods/PayPerEmail/PayPerEmail";

const client = new BuckarooClient();
const method = new PayPerEmail(client);

// method.paymentInvitation({
//   amountDebit: 10,
//   invoice: "testinvoice 123",
//   merchantSendsEmail: false,
//   email: "johnsmith@gmail.com",
//   expirationDate: "2030-01-01",
//   paymentMethodsAllowed: "ideal,mastercard,paypal",
//   attachment: "",
//   customer: {
//     gender: Gender.FEMALE,
//     firstName: "John",
//     lastName: "Smith",
//   },
// });

method.paymentInvitation({
  amountDebit: 10,
  invoice: "testinvoice 123",
  merchantSendsEmail: false,
  email: "johnsmith@gmail.com",
  expirationDate: "2030-01-01",
  paymentMethodsAllowed: "ideal,mastercard,paypal",
  attachment: "",
  customer: {
    gender: Gender.FEMALE,
    firstName: "John",
    lastName: "Smith",
  },
  attachments: [
    {
      name: "bijlage1.pdf",
    },
    {
      name: "bijlage2.pdf",
    },
  ],
});
