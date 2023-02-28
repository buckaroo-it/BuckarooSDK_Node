import { initializeBuckarooClient } from "../src/BuckarooClient";
import { subscription } from "../src/PaymentMethods/Subscriptions/Subscriptions";
import { ideal } from "../src/PaymentMethods/Ideal/Ideal";

initializeBuckarooClient()

const combinedPayment = subscription().createCombined({
    includeTransaction: false,
    transactionVatPercentage: 5,
    configurationCode: "gfyh9fe4",
    email: "test@buckaroo.nl",
    rate_plans: {
        add: {
            startDate: "2033-01-01",
            ratePlanCode: "9863hdcj"
        }
    },
    phone: {
        mobile: "0612345678"
    },
    debtor: {
        code: "johnsmith4"
    },
    company: {
        culture: "nl-NL",
        companyName: "My Company Coporation",
        vatApplicable: true,
        chamberOfCommerce: "20091741"
    },
    address: {
        street: "Hoofdstraat",
        houseNumber: "90",
        zipcode: "8441ER",
        city: "Heerenveen",
        country: "NL"
    }
})



ideal.combine(combinedPayment)
    .pay({
        issuer: "ABNANL2A",
        amountDebit: 10,
    })
    .then()
