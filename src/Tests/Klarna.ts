require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import Klarna from "../PaymentMethods/Klarna/Klarna";

const client = new BuckarooClient();
const method = new Klarna(client);

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
      StreetNumber: "13",
      StreetNumberAdditional: "a",
      PostalCode: "1234AB",
      city: "Heerenveen",
      country: "NL",
    },
    phone: {
      Phone: "0698765433",
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
      StreetNumber: "13",
      StreetNumberAdditional: "b",
      PostalCode: "4321EB",
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
      fdsgfdsfg: "mmm,sds/",
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
