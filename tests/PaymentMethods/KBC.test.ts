import buckarooClientTest from "../BuckarooClient.test";
import { uniqid } from "../../src";

const method = buckarooClientTest.method("KBCPaymentButton");

describe("Testing KBC methods", () => {
    test("Pay", async () => {
        return method
            .pay({
                amountDebit: 100,
            })
            .request()
            .then((response) => {
                expect(response.isPendingProcessing()).toBeTruthy();
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
            .then((response) => {
                expect(response.isFailed()).toBeTruthy();
            });
    });
});
