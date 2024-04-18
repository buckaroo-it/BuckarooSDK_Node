import buckarooClientTest from "../BuckarooClient.test";
import { uniqid } from "../../src";
import { IPay } from "../../src/PaymentMethods/SEPA/Models/Pay";

const method = buckarooClientTest.method("sepadirectdebit");

const paymentPayload: IPay = {
    invoice: uniqid(),
    amountDebit: 100,
    iban: "NLXXTESTXXXXXXXXXX",
    bic: "XXXXXXXXX",
    collectdate: "2022-12-01",
    mandateReference: "XXXXXXXXXXXXXXX",
    mandateDate: "2022-07-03",
    customer: {
        name: "Test Acceptatie",
    },
};

describe("SEPA methods", () => {
    test("Pay", async () => {
        return method
            .pay(paymentPayload)
            .request()
            .then((info) => {
                expect(info.httpResponse.status).toEqual(200);
            });
    });
    test("Refund", async () => {
        return method
            .refund({
                amountCredit: 0.01,
                originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            })
            .request()
            .then((info) => {
                expect(info.httpResponse.status).toEqual(200);
            });
    });
    test("Authorize", async () => {
        return method
            .authorize(paymentPayload)
            .request()
            .then((info) => {
                expect(info.httpResponse.status).toEqual(200);
            });
    });
    test("PayRecurrent", async () => {
        return method
            .payRecurrent({
                invoice: uniqid(),
                collectDate: "2030-07-03",
                amountDebit: 100,
                originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            })
            .request()
            .then((info) => {
                expect(info.httpResponse.status).toEqual(200);
            });
    });
    test("ExtraInfo", async () => {
        return method
            .extraInfo({
                amountDebit: 100,
                invoice: uniqid(),
                iban: "NLXXTESTXXXXXXXXXX",
                bic: "XXXXXXXXX",
                contractID: "Test",
                mandateDate: "2022-07-03",
                customerReferencePartyName: "Test",
                customer: {
                    name: "Test Acceptatie",
                },
                address: {
                    street: "Hoofdstraat",
                    houseNumber: "80",
                    houseNumberAdditional: "a",
                    zipcode: "8441ER",
                    city: "Heerenveen",
                    country: "NL",
                },
            })
            .request()
            .then((info) => {
                expect(info.httpResponse.status).toEqual(200);
            });
    });
    test("Emandates", async () => {
        return method
            .payWithEmandate({
                order: uniqid(),
                invoice: uniqid(),
                mandateReference: "XXXXXXXXXXXXXXX",
                amountDebit: 100,
            })
            .request()
            .then((info) => {
                expect(info.httpResponse.status).toEqual(200);
            });
    });
});
