import buckarooClient from "../buckarooClient";
import { Gender, uniqid } from "../../src";

const payperemail = buckarooClient.method("payperemail");

//Pay
payperemail
    .pay({
        currency: "EUR",
        amountDebit: 100,
        order: uniqid(),
        invoice: uniqid(),
        merchantSendsEmail: false,
        email: "test@buckaroo.nl",
        expirationDate: "2030-01-01",
        paymentMethodsAllowed: "ideal,mastercard,paypal",
        attachment: "",
        customer: {
            gender: Gender.FEMALE,
            firstName: "Test",
            lastName: "Acceptatie",
        },
    })
    .request();
