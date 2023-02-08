require("dotenv").config({ path: "../../.env" });
import BuckarooClient from "../BuckarooClient";
import Subscriptions from "../PaymentMethods/Subscriptions/Subscriptions";
import { uniqid } from "../Functions/Functions";

const client = new BuckarooClient();
const method = new Subscriptions(client);

function it_creates_a_subscription() {
  method.create({
    ratePlans: {
      add: {
        startDate: "2020-01-01",
        ratePlanCode: "xxxxxx",
      },
    },
    configurationCode: "xxxxx",
    debtor: {
      code: "xxxxxx",
    },
  });
}
// it_creates_a_subscription();

function it_creates_a_combined_subscription() {
  method.createCombined({
    pushURL: "https://buckaroo.nextto.dev/push",
    includeTransaction: false,
    transactionVatPercentage: 5,
    configurationCode: "gfyh9fe4",
    email: "test@buckaroo.nl",
    ratePlans: {
      add: {
        startDate: "2033-01-01",
        ratePlanCode: "9863hdcj",
      },
    },
    phone: {
      mobile: "0698765433",
    },
    debtor: {
      code: "johnsmith4",
    },
    company: {
      culture: "nl-NL",
      companyName: "My Company Coporation",
      vatApplicable: true,
      vatNumber: "NL140619562B01",
      chamberOfCommerce: "20091741",
    },
    address: {
      street: "Hoofdstraat",
      houseNumber: "90",
      zipcode: "8441ER",
      city: "Heerenveen",
      country: "NL",
    },
  });

  method.combine({
    startRecurrent: true,
    invoice: uniqid(),
    amountDebit: 10.1,
    issuer: "ABNANL2A",
  });
}

function it_updates_subscription() {
  method.update({
    subscriptionGuid: "FC512FC9CC3A485D8CF3D1804FF6xxxx",
    configurationCode: "9wqe32ew",
    ratePlans: {
      update: {
        ratePlanGuid: "F075470B1BB24B9291943A888A2Fxxxx",
        startDate: "2022-01-01",
        endDate: "2030-01-01",
        Charge: {
          ratePlanChargeGuid: "AD375E2E188747159673440898B9xxxx",
          baseNumberOfUnits: "1",
          pricePerUnit: 10,
        },
      },
    },
  });
}

it_updates_subscription();

function it_updates_combined_subscription() {
  method.manually({
    startRecurrent: true,
    subscriptionGuid: "65EB06079D854B0C9A9ECB0E2C1Cxxxx",
  });

  method.combine({
    invoice: uniqid(),
    amountDebit: 10.1,
    issuer: "ABNANL2A",
  });
}

function it_stops_subscription() {
  method.stop({
    subscriptionGuid: "A8A3DF828F0E4706B50191D3D1C88xxx",
  });
}

function it_get_info_of_subscription() {
  method.info({
    subscriptionGuid: "6ABDB214C4944B5C8638420CE9ECxxxx",
  });
}

function it_delete_payment_config_of_subscription() {
  method.deletePaymentConfig({
    subscriptionGuid: "6ABDB214C4944B5C8638420CE9ECxxxx",
  });
}

function it_pauses_of_subscription() {
  method.pause({
    resumeDate: "2030-01-01",
    subscriptionGuid: "6ABDB214C4944B5C8638420CE9ECxxxx",
  });
}

function it_resumes_of_subscription() {
  method.resume({
    resumeDate: "2030-01-01",
    subscriptionGuid: "6ABDB214C4944B5C8638420CE9ECxxxx",
  });
}
