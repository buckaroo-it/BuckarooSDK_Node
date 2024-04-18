import { IPay } from "../../src/PaymentMethods/Billink/Models/Pay";
import buckarooClientTest from "../BuckarooClient.test";
import { RecipientCategory, uniqid } from "../../src";

const method = buckarooClientTest.method("billink");

describe("Billink methods", () => {
    const invoiceId = uniqid();

    test("Pay", async () => {
        return method
            .pay(payload)
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test("Refund", async () => {
        return method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test("Authorize", async () => {
        return method
            .authorize({ ...payload, invoice: invoiceId })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test("CancelAuthorize", async () => {
        return method
            .cancelAuthorize({
                originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                amountCredit: payload.amountDebit,
                invoice: invoiceId,
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test("Capture", async () => {
        return method
            .capture({
                originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                invoice: invoiceId,
                amountDebit: payload.amountDebit,
                articles: payload.articles,
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
});

const payload: IPay = {
    amountDebit: 100,
    trackAndTrace: "XXXXXXXXXXXXX",
    vatNumber: "NLXXXXXXXXXXB01",
    billing: {
        recipient: {
            category: RecipientCategory.PERSON,
            careOf: "Test Acceptatie",
            title: "Female",
            initials: "TA",
            firstName: "Test",
            lastName: "Acceptatie",
            birthDate: "01-01-1990",
            chamberOfCommerce: "XXXXXX41",
        },
        address: {
            street: "Hoofdstraat",
            houseNumber: "80",
            houseNumberAdditional: "a",
            zipcode: "8441ER",
            city: "Heerenveen",
            country: "NL",
        },
        phone: {
            mobile: "0612345678",
            landline: "0201234567",
        },
        email: "test@buckaroo.nl",
    },
    shipping: {
        recipient: {
            category: RecipientCategory.PERSON,
            careOf: "Test Acceptatie",
            title: "Male",
            initials: "TA",
            firstName: "Test",
            lastName: "Acceptatie",
            birthDate: "1990-01-01",
        },
        address: {
            street: "Hoofdstraat",
            houseNumber: "80",
            houseNumberAdditional: "a",
            zipcode: "8441ER",
            city: "Heerenveen",
            country: "NL",
        },
    },
    articles: [
        {
            identifier: "Articlenumber1",
            description: "Blue Toy Car",
            vatPercentage: 21,
            quantity: 2,
            price: 20.1,
            priceExcl: 5,
        },
        {
            identifier: "Articlenumber2",
            description: "Red Toy Car",
            vatPercentage: 21,
            quantity: 1,
            price: 10.1,
            priceExcl: 5,
        },
    ],
};
