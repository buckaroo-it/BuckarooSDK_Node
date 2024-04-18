import { Gender, uniqid } from "../../src";
import buckarooClientTest from "../BuckarooClient.test";

const method = buckarooClientTest.method("payperemail");

describe("PayPerEmail methods", () => {
    test("paymentInvitation", async () => {
        return method
            .paymentInvitation({
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
            .request()
            .then((res) => {
                expect(res.httpResponse.status).toEqual(200);
            });
    });
});
