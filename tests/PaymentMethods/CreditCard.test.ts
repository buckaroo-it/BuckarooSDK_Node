import buckarooClientTest from "../BuckarooClient.test";
import { uniqid } from "../../src";

const method = buckarooClientTest.method("visa");

describe("testing methods", () => {
    test("Pay", async () => {
        return method
            .pay({
                amountDebit: 100,
            })
            .request()
            .then((data) => {
                expect(data.isWaitingOnUserInput()).toBeTruthy();
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
                expect(data).toBeDefined();
            });
    });
    test("Authorize", async () => {
        return method
            .authorize({
                amountDebit: 100,
            })
            .request()
            .then((data) => {
                expect(data.isWaitingOnUserInput()).toBeTruthy();
            });
    });
    test("PayEncrypted", async () => {
        return method
            .payEncrypted({
                amountDebit: 100,
                name: "Visa",
                encryptedCardData: "XXXXXXXXXXXXXXXXXXXXXXXX",
            })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test("PayWithSecurityCode", async () => {
        return method
            .payWithSecurityCode({
                amountDebit: 100,
                encryptedSecurityCode: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                name: "Visa",
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test("AuthorizeWithSecurityCode", async () => {
        return method
            .authorizeWithSecurityCode({
                amountDebit: 100,
                encryptedSecurityCode: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                name: "Visa",
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test("AuthorizeEncrypted", async () => {
        return method
            .authorizeEncrypted({
                amountDebit: 100,
                encryptedCardData: "XXXXXXXXXXXXXXXXXXXXXXXX",
                name: "Visa",
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test("CancelAuthorize", async () => {
        return method
            .cancelAuthorize({
                originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                amountCredit: 100,
                name: "Visa",
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test("Capture", async () => {
        return method
            .capture({
                originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                amountDebit: 100,
                name: "Visa",
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test("PayRecurrent", async () => {
        return method
            .payRecurrent({
                originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                amountDebit: 100,
                name: "Visa",
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
});
