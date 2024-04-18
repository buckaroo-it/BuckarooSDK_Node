import buckarooClientTest from "../BuckarooClient.test";
import { uniqid } from "../../src";

const method = buckarooClientTest.method("BuckarooWalletCollecting");

describe("BuckarooWallet methods", () => {
    test("Pay", async () => {
        return method
            .pay({
                invoice: uniqid(),
                amountDebit: 100,
                walletId: "XXXXXXXXXXXXXXXXXXXXX",
            })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
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
                expect(data.isFailed()).toBeTruthy();
            });
    });
    test("CancelReservation", async () => {
        return method
            .cancel({
                invoice: uniqid(),
                originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                amountDebit: 100,
                walletMutationGuid: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test("deposit", async () => {
        return method
            .deposit({
                invoice: uniqid(),
                walletId: "XXXXXXXXXXXXXXXXXXXXX",
                amountCredit: 100,
                originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test("Update", async () => {
        return method
            .update({
                walletId: "XXXXXXXXXXXXXXXXXXXXX",
                status: "Disabled",
                email: "test@buckaroo.nl",
                customer: {
                    firstName: "Test",
                    lastName: "Acceptatie",
                },
                bankAccount: {
                    iban: "NLXXTESTXXXXXXXXXX",
                },
            })
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test("Withdrawal", async () => {
        return method
            .withdrawal({
                invoice: uniqid(),
                walletId: "XXXXXXXXXXXXXXXXXXXXX",
                amountDebit: 100,
                originalTransactionKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            })
            .request()
            .then((data) => {
                expect(data.isValidationFailure()).toBeTruthy();
            });
    });
    test("Create Wallet", async () => {
        return method
            .create({
                walletId: "XXXXXXXXXXXXXXXXXXXXX",
                email: "test@buckaroo.nl",
                customer: {
                    firstName: "Test",
                    lastName: "Acceptatie",
                },
                bankAccount: {
                    iban: "NLXXTESTXXXXXXXXXX",
                },
            })
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test("GetInfo", async () => {
        return method
            .getInfo({
                walletId: "XXXXXXXXXXXXXXXXXXXXX",
            })
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
});
