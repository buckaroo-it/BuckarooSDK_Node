import BuckarooClient from "./BuckarooClient";

require("dotenv").config({ path: "../.env" });

const api = new BuckarooClient();
import Ideal from "./methods/ideal";
import Klarna from "./methods/klarna";
const method = new Klarna(api);

function uniqid(prefix = "", random = false) {
  const sec = Date.now() * 1000 + Math.random() * 1000;
  const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
  return `${prefix}${id}${
    random ? `.${Math.trunc(Math.random() * 100000000)}` : ""
  }`;
}
method.pay({
  amountDebit: 50.3,
  order: uniqid(),
  invoice: uniqid(),
  billing: {
    recipient: {
      category: "B2C",
      gender: "female",
      firstName: "John",
      lastName: "Do",
      birthDate: "1990-01-01",
    },
    address: {
      street: "Hoofdstraat",
      houseNumber: "13",
      houseNumberAdditional: "a",
      zipcode: "1234AB",
      city: "Heerenveen",
      country: "NL",
    },
    phone: {
      mobile: "0698765433",
      landline: "0109876543",
    },
    email: "test@buckaroo.nl",
  },
  shipping: {
    recipient: {
      category: "B2B",
      gender: "male",
      firstName: "John",
      lastName: "Do",
      birthDate: "1990-01-01",
    },
    address: {
      street: "Kalverstraat",
      houseNumber: "13",
      houseNumberAdditional: "b",
      zipcode: "4321EB",
      city: "Amsterdam",
      country: "NL",
    },
    email: "test@buckaroo.nl",
  },
  articles: [
    {
      identifier: "Articlenumber1",
      description: "Blue Toy Car",
      vatPercentage: "21",
      quantity: "2",
      price: "20.10",
    },
    {
      identifier: "Articlenumber2",
      description: "Red Toy Car",
      vatPercentage: "21",
      quantity: "1",
      price: "10.10",
    },
  ],
});
//
// method.pay({
//         returnURL     : 'https://example.com/return',
//         invoice       : 'R1000',
//         amountDebit   : 10.10,
//         issuer        : 'ABNANL2A'
// })
//
// method.issuers()
//
// method.payRemainder()
