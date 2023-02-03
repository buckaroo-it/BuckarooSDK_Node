require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import Klarna from "../PaymentMethods/Klarna/Klarna";
import { uniqid } from "../Functions/Functions";

const client = new BuckarooClient();
const method = new Klarna(client);

method.pay({
  amountDebit: 50.3,
  order: uniqid(),
  invoice: uniqid(),
  billing: {
    recipient: {
      Category: "B2C",
      Gender: "female",
      FirstName: "John",
      LastName: "Do",
      BirthDate: "1990-01-01",
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
      Mobile: "0698765433",
    },
    Email: "test@buckaroo.nl",
  },
  shipping: {
    recipient: {
      Category: "B2B",
      Gender: "male",
      FirstName: "John",
      LastName: "Do",
      BirthDate: "1990-01-01",
    },
    address: {
      street: "Kalverstraat",
      houseNumber: "13",
      houseNumberAdditional: "b",
      zipcode: "4321EB",
      city: "Amsterdam",
      country: "NL",
    },
    Email: "test@buckaroo.nl",
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
