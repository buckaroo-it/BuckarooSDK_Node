import Gender from "../Constants/Gender";

require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import Tinka from "../PaymentMethods/Tinka/Tinka";
import { uniqid } from "../Functions/Functions";

const client = new BuckarooClient();
const method = new Tinka(client);

let getPaymentPayload = {
  amountDebit: 50.3,
  order: uniqid(),
  invoice: uniqid(),
  description: "This is a test order",
  paymentMethod: "Credit",
  deliveryMethod: "Locker",
  deliveryDate: "2030-01-01",
  articles: [
    {
      type: 1,
      description: "Blue Toy Car",
      brand: "Ford Focus",
      manufacturer: "Ford",
      color: "Red",
      size: "Small",
      quantity: "1",
      price: "3.5",
      unitCode: "test",
    },
  ],
  customer: {
    gender: Gender.MALE,
    firstName: "Buck",
    lastName: "Aroo",
    initials: "BA",
    birthDate: "1990-01-01",
  },
  billing: {
    recipient: {
      lastNamePrefix: "the",
    },
    email: "billingcustomer@buckaroo.nl",
    phone: {
      mobile: "0698765433",
    },
    address: {
      street: "Hoofdstraat",
      houseNumber: "80",
      houseNumberAdditional: "A",
      zipcode: "8441EE",
      city: "Heerenveen",
      country: "NL",
    },
  },
  shipping: {
    recipient: {
      lastNamePrefix: "the",
    },
    email: "billingcustomer@buckaroo.nl",
    phone: {
      mobile: "0698765433",
    },
    address: {
      street: "Hoofdstraat",
      houseNumber: "80",
      houseNumberAdditional: "A",
      zipcode: "8441EE",
      city: "Heerenveen",
      country: "NL",
    },
  },
};

method.pay(getPaymentPayload);
// method.payInInstallments(getPaymentPayload);
