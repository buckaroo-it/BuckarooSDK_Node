import buckarooClientTest from "../BuckarooClient.test";
import { uniqid } from "../../src";

const method = buckarooClientTest.method("belfius");

describe("testing methods", () => {
    test("Pay Simple Payload", async () => {
        return method
            .pay({
                amountDebit: 100,
            })
            .request()
            .then((data) => {
                expect(data.isPendingProcessing()).toBeTruthy();
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
});
